import React from 'react'
import {Link} from 'react-isomorphic-tools'
import {renderRoutes} from 'react-router-config'

export default class Home extends React.Component {
    render() {
        return (
            <div>Home component
                <div className='test'>test</div>
                <div>
                    <Link to={{pathname: '/admin/entity/product'}}>to test1</Link><br/>
                    <Link to={{pathname: '/admin/entity/product'}}>to test2</Link><br/>
                    <Link to={{pathname: '/admin/entity/product'}}>to test3</Link><br/>
                    <Link to={{pathname: '/test4'}}>to test4</Link><br/>
                    <Link to='/admin'>Admin Panel</Link><br/>
                </div>
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}