import type {extract} from './x';

export default class ModuleLoader {
    basepath: string;
    cache: {
        [key: string]: unknown;
    };
    tar: typeof extract;
    autoFixNotFounds: boolean;

    constructor(basepath: string, opt?: {
        autoFixNotFounds?: boolean;
    });

    download(url: string, filename: string): Promise<string>;

    geturl(module: string, version?: string): Promise<{
        url: string;
        _version: string;
    }>;

    require<T>(module: string, opt?: {
        __require_stack?: string;
        version?: string;
        debug?: boolean;
    }): Promise<T>;
}
