/* eslint-disable @typescript-eslint/ban-ts-comment */
fetch('https://raw.githubusercontent.com/estraco/npm-module-loader/main/npm.js')
    .then(d => d.text())
    .then(r => {
        const exports = {};
        const module = { exports };

        eval(r);

        // @ts-ignore
        const { default: ModuleLoader } = module.exports;

        // @ts-ignore
        global.ModuleLoader = ModuleLoader;
    });
