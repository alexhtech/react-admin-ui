import React from 'react'
import {NavLink, Link} from 'react-isomorphic-tools'
import {withRouter} from 'react-router-dom'
import {parse} from 'query-string'
import {getEntity} from '../../../../lib'
import styled from 'styled-components'
import {showField} from '../../../../utils'

@withRouter
export default (Component) => class Pagination extends React.Component {
    isActive = page => () => {
        const {page: currentPage = 1} = this.props.list.request.params
        return currentPage == page
    }

    getPageNumber = (i) => {
        if (this.settings.type == 'offset') {
            return (i - 1) * this.settings.itemsPerPage
        }
        return i
    }

    getCurrentPage = (request) => {
        if (this.settings.type == 'offset') {
            return Math.round(request.params[this.settings.pageName] / this.settings.itemsPerPage) || 1
        }
        return request.params[this.settings.pageName] || 1
    }

    configure = ({itemsPerPage, visible, disable, totalItemsLink, itemsLink, pageName, type} = {}) => {
        this.settings = {
            itemsPerPage: itemsPerPage || 10,
            visible: visible || 4,
            disable: disable || false,
            totalItemsLink: totalItemsLink || 'totalItemCount',
            itemsLink: itemsLink || 'items',
            pageName: pageName || 'page',
            type: type || 'pages'
        }
    }


    render() {
        const entity = getEntity(this.props.entityName)
        //configure pagination settings
        this.configure(entity.pagination)

        //give back Component if pagination is disabled
        if (this.settings.disable) return <Component {...this.props}/>

        const {response, request} = this.props.list

        //configure base constants
        const currentPage = this.getCurrentPage(request)
        const totalItems = showField(this.settings.totalItemsLink, response)
        const items = showField(this.settings.itemsLink, response)
        const query = parse(this.props.location.search)
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
                                     query: {...query, [this.settings.pageName]: this.getPageNumber(i)}
                                 }}>
                            {i}
                        </NavLink>
                    </Page>
                )
            }
        }

        return (
            <div>
                <Component {...this.props} items={items} query={query}/>
                {items.length > 0 ?
                    <div>
                        <Pages>
                            {countPages && currentPage != 1 &&
                            <Page>
                                <Link to={{
                                    pathname: pathname,
                                    query: {
                                        ...query, [this.settings.pageName]: currentPage - 1 == 0 ?
                                            this.getPageNumber(1) :
                                            this.getPageNumber(currentPage - 1)
                                    }
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
                                        query: {
                                            ...query,
                                            [this.settings.pageName]: this.getPageNumber(parseInt(currentPage) + 1)
                                        }
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