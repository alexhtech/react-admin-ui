import React from 'react'
import {getEntity, getPrefix} from '../lib'
import qs from 'qs'
import {FlatButton, Divider, Chip} from 'material-ui'
import Back from 'material-ui/svg-icons/action/assignment-return'
import {Link} from 'react-isomorphic-tools'
import {connect} from 'react-redux'
import Show from '../components/Sections/Content/Show'
import {HeaderWrapper} from '../components/Sections'
import {showField} from '../utils'
import {CircularProgress} from 'material-ui'

@connect((state, props)=>({
    show: showField(`fetchData.${props.match.params.name}Show.response`, state) || {isLoading: true}
}))
export default class Edit extends React.Component {
    render() {
        if (this.props.show.isLoading) return <CircularProgress/>


        const entity = getEntity(this.props.match.params.name)
        const prefix = getPrefix()
        const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true})
        const {actions:{show:{component: CustomShow}}} = entity

        const props = {query, prefix, entity, id: this.props.match.params.id, data: this.props.show}
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