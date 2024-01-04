import ModuleLoader from './index';

const loader = new ModuleLoader('module_loader');

async function main() {
    const [
        axios,
        express,
        morgan
    ] = await Promise.all([
        loader.require('axios'),
        loader.require('express'),
        loader.require('morgan')
    ]);

    console.log(axios, express, morgan);
}

main();