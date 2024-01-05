import fs from 'fs/promises';
import path from 'path';
import type { extract } from '../tar';
import * as process from 'process';
import semver from 'semver';


export default class ModuleLoader {
    basepath: string;
    cache: {
        [key: string]: unknown;
    } = {};
    tar: typeof extract = require('../x');
    autoFixNotFounds: boolean;

    constructor(basepath: string, opt: {
        autoFixNotFounds?: boolean;
    } = {}) {
        this.autoFixNotFounds = opt.autoFixNotFounds ?? true;
        basepath = path.join(basepath, 'node_modules');
        this.basepath = basepath;
        fs.mkdir(path.join(basepath, '_RAW_'), { recursive: true });
    }

    async download(url: string, filename: string): Promise<string> {
        const filepath = path.join(this.basepath, '_RAW_', filename);
        const response = await fetch(url);
        const data = await response.blob();

        await fs.writeFile(filepath, Buffer.from(await data.arrayBuffer()));

        return filepath;
    }

    async geturl(module: string, version?: string): Promise<{
        url: string;
        _version: string;
    }> {
        const res = await fetch(`https://registry.npmjs.org/${module}`, {
            headers: {
                Accept: 'application/vnd.npm.install-v1+json'
            }
        });

        if (res.status !== 200) {
            throw new Error(`Module ${module} not found`);
        }

        const json = await res.json();

        const pversion = version
            ? semver.maxSatisfying(Object.keys(json.versions), version)
            : json['dist-tags'].latest;

        const url = json.versions[pversion].dist.tarball;

        return {
            url,
            _version: pversion
        };
    }

    async require<T>(module: string, opt: {
        __require_stack?: string;
        version?: string;
        debug?: boolean;
    } = {}): Promise<T> {
        opt.debug && console.log('require', module, opt.version ?? 'latest', opt.__require_stack ?? '');

        const { url, _version } = await this.geturl(module, opt.version);

        const version: string = opt.version || _version;

        if (!this.cache[`${module}@${version}`]) {
            const fpath = await this.download(url, `${module.split('/').join('$')}.tgz`);
            const folder = path.join(this.basepath, module);

            await fs.mkdir(folder, { recursive: true });

            await this.tar({
                C: folder,
                file: fpath,
                strip: 1
            });

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const pkg = JSON.parse((await fs.readFile(path.resolve(path.join(folder, 'package.json')))).toString());

            const entry = pkg?.main || 'index.js';
            const file = path.join(folder, entry);

            for (const key of Object.keys(pkg.dependencies || {})) {
                const vers = pkg.dependencies[key].match(/(\d+\.\d+\.\d+)/)?.[1] || undefined;

                if (key.startsWith('file:')) continue;

                if (key.startsWith('@types/')) continue;

                await this.require(key, {
                    __require_stack: opt.__require_stack ? `${opt.__require_stack} -> ${module}@${version}` : `${module}@${version}`,
                    version: vers
                });
            }

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            try {
                this.cache[`${module}@${version}`] = require(path.resolve(file));
            } catch (e) {
                if (this.autoFixNotFounds && e.code === 'MODULE_NOT_FOUND') {
                    await this.require(e.message.match(/'(.+)'/)?.[1] || '', {
                        __require_stack: opt.__require_stack ? `${opt.__require_stack} -> ${module}@${version}` : `${module}@${version}`
                    });

                    this.cache[`${module}@${version}`] = require(path.resolve(file));
                } else if (e.code === 'ERR_REQUIRE_ESM') {
                    try {
                        this.cache[`${module}@${version}`] = await eval(`import('${process.platform === 'win32' ? 'file://' : ''}' + Buffer.from('${Buffer.from(path.resolve(file).replace(/\\/g, '/')).toString('base64')}', 'base64').toString())`);
                    } catch (e) {
                        if (this.autoFixNotFounds && e.code === 'MODULE_NOT_FOUND') {
                            await this.require(e.message.match(/'(.+)'/)?.[1] || '', {
                                __require_stack: opt.__require_stack ? `${opt.__require_stack} -> ${module}@${version}` : `${module}@${version}`
                            });

                            this.cache[`${module}@${version}`] = await eval(`import('${process.platform === 'win32' ? 'file://' : ''}' + Buffer.from('${Buffer.from(path.resolve(file).replace(/\\/g, '/')).toString('base64')}', 'base64').toString())`);
                        } else {
                            throw e;
                        }
                    }
                } else {
                    throw e;
                }
            }
        }

        return this.cache[`${module}@${version}`] as T;
    }
}
