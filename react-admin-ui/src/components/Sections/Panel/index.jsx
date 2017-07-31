import React from 'react'
import {connect} from 'react-redux'
import Drawler from 'material-ui/Drawer'
import {ListItem, List, makeSelectable} from 'material-ui'
import {getEntities, getPrefix, getEntity} from '../../../lib'
import {Link, openModal, closeModal} from 'react-isomorphic-tools'
import styled from 'styled-components'
import {resolved} from 'react-isomorphic-tools/lib/loadData'
import {withRouter} from 'react-router'
import {matchRoutes} from 'react-router-config'


const DrawlerStyled = styled(Drawler)`
    color: rgba(0, 0, 0, 0.87);
    background-color: rgb(255, 255, 255);
    transition: margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    border-radius: 2px;
    flex: 0 0 256px;
    margin-left: 0px;
    order: -1;
    margin-left: ${props=>props.panel ? '0' : '-256px'};
`
const SelectableList = makeSelectable(List)


@withRouter
@connect((state=>({
    panel: state.modals.panel || false
})), {openModal, closeModal})
export default class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.entities = getEntities()
    }

    componentDidMount() {
        setTimeout(()=> {
            this.props.openModal('panel')
        }, 200)
    }

    componentWillUnmount() {
        this.props.closeModal('panel')
    }

    render() {
        const {panel} = this.props
        const style = {
            position: 'relative'
        }
        const match = matchRoutes(resolved, this.props.location.pathname)
        const entity = match[0] && match[0].match.params.name

        return (
            <DrawlerStyled open={true} panel={panel} containerStyle={style}>
                <SelectableList value={entity}>
                    {
                        this.renderList(this.entities)
                    }
                </SelectableList>
            </DrawlerStyled>
        )

    }

    isOpen = (nestedItems) => {
        const match = matchRoutes(resolved, this.props.location.pathname)
        const entity = match[0] && match[0].match.params.name
        return !!getEntity(entity, nestedItems)
    }

    renderList = (entities) => {

        return Object.values(entities).filter((item)=>!item.hidden).map((item, index)=> {
            if (item.nestedItems) {
                return <ListItem
                    primaryTogglesNestedList
                    key={index}
                    leftIcon={item.leftIcon ? <item.leftIcon/> : null}
                    initiallyOpen={this.isOpen(item.nestedItems)}
                    nestedItems={this.renderList(item.nestedItems)}
                    primaryText={item.title}
                />
            } else {
                return (
                    <ListItem
                        key={index}
                        leftIcon={item.leftIcon ? <item.leftIcon/> : null}
                        containerElement={<Link to={{pathname: `${getPrefix()}/${item.name}`}}/>}
                        primaryText={item.title || item.name}
                        value={item.name}
                    />
                )
            }
        })


    }
}
