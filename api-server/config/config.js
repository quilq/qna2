let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    let config = require('./config.json');
    let envConfig = config[env];

    //Take object and return keys inside as an array
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    })
}