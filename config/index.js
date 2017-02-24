import prod from './config_prod'
import dev from './config_dev'


const getConfig = () => {
    if (process.env.NODE_ENV == 'development') {
        return dev
    } else {
        return prod
    }
}

export default getConfig