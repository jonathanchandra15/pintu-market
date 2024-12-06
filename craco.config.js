const CracoAlias = require('craco-alias')

const alias = {
    '@configs':'./configs',
    '@contexts':'./contexts',
    '@hooks':'./hooks',
    '@styles':'./styles',
    '@tests':'./tests',
    '@utils':'./utils',
    '@views':'./views'
}

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source:'options',
                baseUrl: 'src',
                aliases: alias,
            },
        }
    ]
}