import React from 'react'
import {NavLink, Link} from 'react-isomorphic-tools'
import {withRouter} from 'react-router-dom'
import {parse} from 'qs'
import {getEntity} from '../../../../lib'
import styled from 'styled-components'
import {showField, mergeDeep} from '../../../../utils'
import {CircularProgress} from 'material-ui'

@withRouter
export default (Component) => class Pagination extends React.Component {
    isActive = page => () => {
        return this.getCurrentPage(this.props.list.request) == page
    }

    getPageNumber = (i) => {
        if (this.settings.type == 'offset') {
            return (i - 1) * this.settings.itemsPerPage
        }
        if (this.settings.startFrom == '0') {
            return --i
        } else {
            return i
        }
    }

    getCurrentPage = (request) => {
        if (this.settings.type == 'offset') {
            return Math.ceil(showField(this.settings.pageLink, request.params) / this.settings.itemsPerPage) + 1 || 1
        }
        let page = showField(this.settings.pageLink, request.params) || this.settings.startFrom
        if (this.settings.startFrom == '0') {
            return ++page
        }
        return page
    }

    getQuery = (i) => {
        return mergeDeep(parse(this.props.location.search, {ignoreQueryPrefix: true}),
            parse(`${this.settings.pageName}=${i}`, {ignoreQueryPrefix: true}))
    }

    configure = ({itemsPerPage, visible, disable, totalItemsLink, itemsLink, pageName, type, pageLink, start} = {}) => {
        this.settings = {
            itemsPerPage: itemsPerPage || 10,
            visible: visible || 4,
            disable: disable || false,
            totalItemsLink: totalItemsLink || 'totalItemCount',
            itemsLink: itemsLink || 'items',
            pageName: pageName || 'page',
            pageLink: pageLink || 'page',
            type: type || 'pages',
            startFrom: typeof start != 'undefined' ? start : '1'
        }
    }


    render() {
        if (this.props.list.isLoading) return <CircularProgress/>

        const entity = getEntity(this.props.entityName)

        //configure pagination settings
        this.configure(entity.actions.list.pagination)

        //give back Component if pagination is disabled
        if (this.settings.disable) return <Component {...this.props}/>

        const {response, request} = this.props.list

        //configure base constants
        const currentPage = this.getCurrentPage(request)
        const totalItems = showField(this.settings.totalItemsLink, response)
        const items = showField(this.settings.itemsLink, response)


        const countPages = Math.ceil(totalItems / this.settings.itemsPerPage)
        const pathname = this.props.location.pathname


        let pages = []


        for (let i = 1; i <= countPages; i++) {
            if (i >= currentPage - 1 && pages.length < this.settings.visible) {
                pages.push(
                    <Page key={i}>
                        <NavLink isActive={this.isActive(i)}
                                 to={{
                                     pathname: pathname,
                                     query: this.getQuery(this.getPageNumber(i))
                                 }}>
                            {i}
                        </NavLink>
                    </Page>
                )
            }
        }

        return (
            <div>
                <Component {...this.props} items={items}
                           query={parse(this.props.location.search, {ignoreQueryPrefix: true})}/>
                {items.length > 0 ?
                    <div>
                        <Pages>
                            {countPages && currentPage != 1 &&
                            <Page>
                                <Link to={{
                                    pathname: pathname,
                                    query: this.getQuery(currentPage - 1 == 0 ?
                                        this.getPageNumber(1) :
                                        this.getPageNumber(currentPage - 1))
                                }}>
                                    {'<'}
                                </Link>
                            </Page>}
                            {pages}
                            {countPages != currentPage &&
                            <Page>
                                <Link
                                    to={{
                                        pathname: pathname,
                                        query: this.getQuery(this.getPageNumber(parseInt(currentPage) + 1))
                                    }}>
                                    {'>'}
                                </Link>
                            </Page>}
                        </Pages>
                        <div className='row'>
                            <div className='col'>
                                <Info>Total items: {totalItems || 0}</Info>
                            </div>
                        </div>
                    </div> :
                    <div className='row'>
                        <div className='col'>
                            <Info>No {entity.title || entity.name} have been found.</Info>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const Page = styled.div`
    a{
        padding: 5px 10px;
        margin: 0px 5px;
        border: 1px solid lightgrey;
        border-radius: 2px;
        color: black;
        display: block;
    }
    a.active{
        background: #37474f;
        color: white;
        border: 0;
    }
    
`

const Pages = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
`

const Info = styled.div`
    text-align: center;  
    padding: 1rem 0;
`