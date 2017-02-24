import React from 'react'
import {Link} from 'react-router'
import {preload} from 'react-isomorphic-tools'
import Helmet from 'react-helmet'
import Test2 from './Test2'


@preload(({fetchToState})=>{
    return fetchToState('/events', {
        key: 'eventsList',
        params:{
            page: 22
        }
    })
})
export default class Test extends React.Component {
    static displayName = 'TestPage'

    componentDidMount = () =>{
        console.log('mount component')

    }
    componentWillUnmount = () => {

        console.log('unmount component')
    }
    render() {
        return (
            <div>Test component

                <Helmet title="test page"/>
                <div className='test'>test</div>

                <div>
                    <Link to="/">to asdasdasd</Link>
                </div>

                <div>
                    <Link to="/test1">test1</Link>
                </div>
                <div>
                    <Link to="/test2">test2</Link>
                    <Link to="/admin/entity/events?page=2">page 2</Link>
                </div>
                <Test2/>
            </div>
        )
    }
}