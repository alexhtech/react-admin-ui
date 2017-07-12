import React from 'react'
import Filters from '../components/Sections/Content/List/Filters'
import List from '../components/Sections/Content/List'

export default class ListView extends React.Component {
    render() {
        const {match:{params:{name}}, location} = this.props
        return (
            <div>
                <Filters location={location} entityName={name}/>
                <List entityName={name}/>
            </div>
        )
    }
}