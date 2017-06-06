const https = process.env.HTTPS

//
const domain = '127.0.0.1:3002'
const defaultLocale = 'en'
const nodeLocales = [
    'ru-RU'
]


const origin = `${https ? 'https' : 'http'}://${domain}`
export default {
    domain,
    origin,
    baseUrl: origin + '/api',
    defaultLocale,
    nodeLocales
}