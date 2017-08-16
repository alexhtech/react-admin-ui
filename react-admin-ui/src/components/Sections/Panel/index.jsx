import React from 'react'
import {connect} from 'react-redux'
import Drawler from 'material-ui/Drawer'
import {ListItem, List, makeSelectable} from 'material-ui'
import {getEntities, getPrefix, getEntity} from '../../../lib'
import {Link, openModal, closeModal} from 'react-isomorphic-tools'
import styled from 'styled-components'
import {withRouter} from 'react-router'
import {matchRoutes} from 'react-router-config'
import {routes} from 'react-isomorphic-tools/lib/resolveRoutes'

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
    > div {
        box-shadow: none !important;
    }
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
        this.entityName = this.getEntityNameByPathname(props.location.pathname)
    }

    componentDidMount() {
        setTimeout(()=> {
            this.props.openModal('panel')
        }, 200)
    }

    componentWillUnmount() {
        this.props.closeModal('panel')
    }

    componentWillReceiveProps = (nextProps) => {
        this.entityName = this.getEntityNameByPathname(nextProps.location.pathname)
    }

    getEntityNameByPathname = (pathname) => {
        const result = matchRoutes(routes, pathname).slice(-1)[0]
        if (typeof result == 'object') {
            return result.match.params.name
        }
        return null
    }

    render() {
        const {panel} = this.props
        const style = {
            position: 'relative'
        }

        return (
            <DrawlerStyled open={true} panel={panel} containerStyle={style}>
                <SelectableList value={this.entityName}>
                    {
                        this.renderList(this.entities)
                    }
                </SelectableList>
            </DrawlerStyled>
        )

    }

    isOpen = (nestedItems) => {
        return !!getEntity(this.entityName, nestedItems)
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
                    value='group'
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
