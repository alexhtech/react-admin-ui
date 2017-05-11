import React from 'react'
import {ImmutableLoadingBar as LoadingBar} from 'react-redux-loading-bar'
import {Helmet} from 'react-helmet'
import {Link} from 'react-router'
import config from '../../../config'
import {setBaseUrl} from 'react-isomorphic-tools'

const {baseUrl} = config()
setBaseUrl(baseUrl)

class App extends React.Component {
    constructor() {
        super();
        const isDev = process.env.NODE_ENV == 'development'
        this.link = [{
            rel: 'icon',
            type: 'image/png',
            href: require('../../../assets/favicon.png'),
            sizes: '150x150'
        }]
        if (!isDev) {
            this.link.push({
                href: '/public/style.css',
                type: 'text/css',
                rel: 'stylesheet'
            })
        }

    }

    render() {
        return (
            <div>
                <LoadingBar style={{
                    backgroundColor: '#f00',
                    top: 0,
                    height: '2px',
                    zIndex: '10000',
                    position: 'fixed',
                    boxShadow: '1px 1px 4px 0px rgba(50, 50, 50, 0.75)'
                }}/>
                <Helmet>
                    <title>App</title>
                    {this.link.map((item, index)=>(
                        <link {...item} key={index}/>
                    ))}
                </Helmet>
                {this.props.children}
            </div>
        )
    }
}
export default App