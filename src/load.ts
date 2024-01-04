/* eslint-disable @typescript-eslint/ban-ts-comment */
fetch('https://raw.githubusercontent.com/estraco/npm-module-loader/main/index.js')
    .then(d => d.text())
    .then(r => {
        const exports = {};
        const module = { exports };

        eval(r);

        // @ts-ignore
        const { default: npm } = module.exports;

        // @ts-ignore
        window.npm = npm;
    });
