"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var process = __importStar(require("process"));
var semver_1 = __importDefault(require("semver"));
var ModuleLoader = /** @class */ (function () {
    function ModuleLoader(basepath, opt) {
        if (opt === void 0) { opt = {}; }
        var _a;
        this.cache = {};
        this.tar = require('../x');
        this.autoFixNotFounds = (_a = opt.autoFixNotFounds) !== null && _a !== void 0 ? _a : true;
        basepath = path_1.default.join(basepath, 'node_modules');
        this.basepath = basepath;
        promises_1.default.mkdir(path_1.default.join(basepath, '_RAW_'), { recursive: true });
    }
    ModuleLoader.prototype.download = function (url, filename) {
        return __awaiter(this, void 0, void 0, function () {
            var filepath, response, data, _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        filepath = path_1.default.join(this.basepath, '_RAW_', filename);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _f.sent();
                        return [4 /*yield*/, response.blob()];
                    case 2:
                        data = _f.sent();
                        _b = (_a = promises_1.default).writeFile;
                        _c = [filepath];
                        _e = (_d = Buffer).from;
                        return [4 /*yield*/, data.arrayBuffer()];
                    case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([_e.apply(_d, [_f.sent()])]))];
                    case 4:
                        _f.sent();
                        return [2 /*return*/, filepath];
                }
            });
        });
    };
    ModuleLoader.prototype.geturl = function (module, version) {
        return __awaiter(this, void 0, void 0, function () {
            var res, json, pversion, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://registry.npmjs.org/".concat(module), {
                            headers: {
                                Accept: 'application/vnd.npm.install-v1+json'
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        if (res.status !== 200) {
                            throw new Error("Module ".concat(module, " not found"));
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        json = _a.sent();
                        pversion = version
                            ? semver_1.default.maxSatisfying(Object.keys(json.versions), version)
                            : json['dist-tags'].latest;
                        url = json.versions[pversion].dist.tarball;
                        return [2 /*return*/, {
                                url: url,
                                _version: pversion
                            }];
                }
            });
        });
    };
    ModuleLoader.prototype.require = function (module, opt) {
        var _a, _b, _c, _d, _e;
        if (opt === void 0) { opt = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _f, url, _version, version, fpath, folder, pkg, _g, _h, entry, file, _i, _j, key, vers, e_1, _k, _l, e_2, _m, _o;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        opt.debug && console.log('require', module, (_a = opt.version) !== null && _a !== void 0 ? _a : 'latest', (_b = opt.__require_stack) !== null && _b !== void 0 ? _b : '');
                        return [4 /*yield*/, this.geturl(module, opt.version)];
                    case 1:
                        _f = _p.sent(), url = _f.url, _version = _f._version;
                        version = opt.version || _version;
                        if (!!this.cache["".concat(module, "@").concat(version)]) return [3 /*break*/, 23];
                        return [4 /*yield*/, this.download(url, "".concat(module.split('/').join('$'), ".tgz"))];
                    case 2:
                        fpath = _p.sent();
                        folder = path_1.default.join(this.basepath, module);
                        return [4 /*yield*/, promises_1.default.mkdir(folder, { recursive: true })];
                    case 3:
                        _p.sent();
                        return [4 /*yield*/, this.tar({
                                C: folder,
                                file: fpath,
                                strip: 1
                            })];
                    case 4:
                        _p.sent();
                        _h = (_g = JSON).parse;
                        return [4 /*yield*/, promises_1.default.readFile(path_1.default.resolve(path_1.default.join(folder, 'package.json')))];
                    case 5:
                        pkg = _h.apply(_g, [(_p.sent()).toString()]);
                        entry = (pkg === null || pkg === void 0 ? void 0 : pkg.main) || 'index.js';
                        file = path_1.default.join(folder, entry);
                        _i = 0, _j = Object.keys(pkg.dependencies || {});
                        _p.label = 6;
                    case 6:
                        if (!(_i < _j.length)) return [3 /*break*/, 9];
                        key = _j[_i];
                        vers = ((_c = pkg.dependencies[key].match(/(\d+\.\d+\.\d+)/)) === null || _c === void 0 ? void 0 : _c[1]) || undefined;
                        if (key.startsWith('file:'))
                            return [3 /*break*/, 8];
                        if (key.startsWith('@types/'))
                            return [3 /*break*/, 8];
                        return [4 /*yield*/, this.require(key, {
                                __require_stack: opt.__require_stack ? "".concat(opt.__require_stack, " -> ").concat(module, "@").concat(version) : "".concat(module, "@").concat(version),
                                version: vers
                            })];
                    case 7:
                        _p.sent();
                        _p.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9:
                        _p.trys.push([9, 10, , 23]);
                        this.cache["".concat(module, "@").concat(version)] = require(path_1.default.resolve(file));
                        return [3 /*break*/, 23];
                    case 10:
                        e_1 = _p.sent();
                        if (!(this.autoFixNotFounds && e_1.code === 'MODULE_NOT_FOUND')) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.require(((_d = e_1.message.match(/'(.+)'/)) === null || _d === void 0 ? void 0 : _d[1]) || '', {
                                __require_stack: opt.__require_stack ? "".concat(opt.__require_stack, " -> ").concat(module, "@").concat(version) : "".concat(module, "@").concat(version)
                            })];
                    case 11:
                        _p.sent();
                        this.cache["".concat(module, "@").concat(version)] = require(path_1.default.resolve(file));
                        return [3 /*break*/, 22];
                    case 12:
                        if (!(e_1.code === 'ERR_REQUIRE_ESM')) return [3 /*break*/, 21];
                        _p.label = 13;
                    case 13:
                        _p.trys.push([13, 15, , 20]);
                        _k = this.cache;
                        _l = "".concat(module, "@").concat(version);
                        return [4 /*yield*/, eval("import('".concat(process.platform === 'win32' ? 'file://' : '', "' + Buffer.from('").concat(Buffer.from(path_1.default.resolve(file).replace(/\\/g, '/')).toString('base64'), "', 'base64').toString())"))];
                    case 14:
                        _k[_l] = _p.sent();
                        return [3 /*break*/, 20];
                    case 15:
                        e_2 = _p.sent();
                        if (!(this.autoFixNotFounds && e_2.code === 'MODULE_NOT_FOUND')) return [3 /*break*/, 18];
                        return [4 /*yield*/, this.require(((_e = e_2.message.match(/'(.+)'/)) === null || _e === void 0 ? void 0 : _e[1]) || '', {
                                __require_stack: opt.__require_stack ? "".concat(opt.__require_stack, " -> ").concat(module, "@").concat(version) : "".concat(module, "@").concat(version)
                            })];
                    case 16:
                        _p.sent();
                        _m = this.cache;
                        _o = "".concat(module, "@").concat(version);
                        return [4 /*yield*/, eval("import('".concat(process.platform === 'win32' ? 'file://' : '', "' + Buffer.from('").concat(Buffer.from(path_1.default.resolve(file).replace(/\\/g, '/')).toString('base64'), "', 'base64').toString())"))];
                    case 17:
                        _m[_o] = _p.sent();
                        return [3 /*break*/, 19];
                    case 18: throw e_2;
                    case 19: return [3 /*break*/, 20];
                    case 20: return [3 /*break*/, 22];
                    case 21: throw e_1;
                    case 22: return [3 /*break*/, 23];
                    case 23: return [2 /*return*/, this.cache["".concat(module, "@").concat(version)]];
                }
            });
        });
    };
    return ModuleLoader;
}());
exports.default = ModuleLoader;
//# sourceMappingURL=index.js.map