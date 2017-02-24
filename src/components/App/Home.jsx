import React from 'react'
import {Link} from 'react-router'

export default class Home extends React.Component {
    render() {
        return (
            <div>Home component
                <div className='test'>test</div>
                <div>
                    <Link to="/test1">to test</Link><br/>
                    <Link to="/test2?q=test">to test</Link><br/>
                    <Link to="/admin">Admin Panel</Link><br/>
                </div>

            </div>
        )
    }
}