import React from 'react'
import {getEntity, getPrefix} from '../lib'
import queryString from 'query-string'
import {FlatButton, Divider} from 'material-ui'
import Back from 'material-ui/svg-icons/action/assignment-return'
import {Link} from 'react-isomorphic-tools'
import {connect} from 'react-redux'
import Show from '../components/Sections/Content/Show'
import {HeaderWrapper, ContentWrapper} from '../components/Sections'

@connect((state, props)=>({
    show: state.fetchData[`${props.match.params.name}Show`].response
}))
export default class Edit extends React.Component {
    render() {
        const entity = getEntity(this.props.match.params.name)
        const prefix = getPrefix()
        const query = queryString.parse(this.props.location.search)
        return (
            <div>
                <HeaderWrapper>
                    <span>Show item #{this.props.match.params.id} of {entity.title || entity.name}</span>
                    <FlatButton
                        icon={<Back/>}
                        label='Back to list'
                        containerElement={<Link to={{pathname: `${prefix}/${entity.name}`, query}}/>}
                    />
                </HeaderWrapper>
                <Divider/>
                <Show data={this.props.show} query={query} prefix={prefix} entity={entity}
                      id={this.props.match.params.id}/>
            </div>
        )
    }
}

