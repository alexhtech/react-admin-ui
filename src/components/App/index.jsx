import React from 'react'
import {ImmutableLoadingBar as LoadingBar} from 'react-redux-loading-bar'
import {Helmet} from 'react-helmet'
import config from '../../../config'
import {setBaseUrl} from 'react-isomorphic-tools'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const {baseUrl} = config()
setBaseUrl(baseUrl)

const styleLoadingBar = {
    backgroundColor: '#f00',
    top: 0,
    height: '2px',
    zIndex: '10000',
    position: 'fixed',
    boxShadow: '1px 1px 4px 0px rgba(50, 50, 50, 0.75)'
}

export default class    App extends React.Component {
    constructor() {
        super();
        const isDev = process.env.NODE_ENV == 'development'
        this.links = [{
            rel: 'icon',
            type: 'image/png',
            href: require('../../../assets/favicon.png'),
            sizes: '150x150'
        }]
        if (!isDev) {
            this.links.push({
                href: '/public/style.css',
                type: 'text/css',
                rel: 'stylesheet'
            })
        }

    }

    render() {
        return (
            <div>
                <LoadingBar style={styleLoadingBar}/>
                <Helmet>
                    <title>App</title>
                    {this.links.map((item, index)=><link {...item} key={index}/>)}
                </Helmet>
                {this.props.children}
            </div>
        )
    }
}
