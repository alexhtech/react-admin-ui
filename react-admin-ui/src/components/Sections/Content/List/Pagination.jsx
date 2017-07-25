import React from 'react'
import {NavLink, Link} from 'react-isomorphic-tools'
import {withRouter} from 'react-router-dom'
import {parse} from 'query-string'
import {getEntity} from '../../../../lib'
import styled from 'styled-components'

@withRouter
export default (Component) => class Pagination extends React.Component {

    isActive = page => () => {
        const {page: currentPage = 1} = this.props.list.request.params
        return currentPage == page
    }


    render() {
        const entity = getEntity(this.props.entityName)
        const pagination = entity.pagination

        const itemsPerPage = pagination && pagination.itemsPerPage ? pagination.itemsPerPage : 10
        const visible = pagination && pagination.visible ? pagination.visible : 4
        const disable = pagination && pagination.disable

        if (disable) return <Component {...this.props}/>

        const name = 'page'
        const {response, request} = this.props.list
        const currentPage = request.params.page || 1

        const totalItems = response.totalItemCount || response.totalItems || response.total
        const items = response.items || response.Items || response.data

        const query = parse(this.props.location.search)

        const countPages = Math.ceil(totalItems / itemsPerPage)
        let pages = []

        const pathname = this.props.location.pathname

        for (let i = 1; i <= countPages; i++) {
            if (i >= currentPage - 1 && pages.length < visible) {
                pages.push(
                    <Page key={i}>
                        <NavLink isActive={this.isActive(i)}
                                 to={{pathname: pathname, query: {...query, [name]: i}}}>
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
                                    query: {...query, [name]: currentPage - 1 == 0 ? 1 : currentPage - 1}
                                }}>
                                    {'<'}
                                </Link>
                            </Page>}
                            {pages}
                            {countPages != currentPage &&
                            <Page>
                                <Link to={{pathname: pathname, query: {...query, [name]: currentPage - 1 + 2}}}>
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
    padding: 10px 0;
`