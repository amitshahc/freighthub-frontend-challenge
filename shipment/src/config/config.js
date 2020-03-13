// 'use strict';

let Config;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {    
    Config = require('./config.dev.json');
} else {    
    Config = require('./config.prod.json');
}

export default Config;
