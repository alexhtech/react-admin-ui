import React from 'react'
import {getEntity, getPrefix} from '../lib'
import qs from 'qs'
import {FlatButton, Divider, Chip} from 'material-ui'
import Back from 'material-ui/svg-icons/action/assignment-return'
import {Link} from 'react-isomorphic-tools'
import {connect} from 'react-redux'
import Show from '../components/Sections/Content/Show'
import {HeaderWrapper} from '../components/Sections'

@connect((state, props)=>({
    show: state.fetchData[`${props.match.params.name}Show`].response
}))
export default class Edit extends React.Component {
    render() {
        const entity = getEntity(this.props.match.params.name)
        const prefix = getPrefix()
        const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true})
        const {actions:{show:{component: CustomShow}}} = entity

        const props = {query, prefix, entity, id: this.props.match.params.id}
        return (
            <div>
                <HeaderWrapper>
                    <Chip style={{display: 'inline-block'}}>#{this.props.match.params.id}</Chip>
                    <FlatButton
                        icon={<Back/>}
                        label='Back to list'
                        containerElement={<Link to={{pathname: `${prefix}/${entity.name}`, query}}/>}
                    />
                </HeaderWrapper>
                <Divider/>
                {CustomShow ?
                    <CustomShow {...props}/> :
                    <Show {...props}/>
                }
            </div>
        )
    }
}

