import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import PrevIcon from 'material-ui/svg-icons/image/navigate-before'
import NextIcon from 'material-ui/svg-icons/image/navigate-next'
import styled from 'styled-components'

const pageLimit = 5

const Wrapper = styled.div`
    background: white;
    box-shadow: 0 0 10px -3px black;
`

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
`

const PaginationArrow = styled(Link)`
`

const PaginationItem = styled.p`
    margin: 0 5px;
    padding: 6px 15px;
    display: inline-block;
    border-radius: 2px;
    color: black;
    font-weight: ${props => props.active ? 'bold': 'normal'};
    &:hover {
        background-color: #ebebeb;
    }

`

const PaginationSpace = styled.p`
    margin: 0 5px;
    display: inline-block;
    border-radius: 2px;
    color: black;
`

@connect((state, ownProps)=>({
    location: ownProps.location
}))
export default (Component) => class Pagination extends React.Component {
    render() {
        const pagination = this.props.entity.pagination

        const itemsPerPage = pagination && pagination.itemsPerPage ? pagination.itemsPerPage : pageLimit
        const visible = pagination && pagination.visible ? pagination.visible : 4
        const disable = pagination && pagination.disable

        if (disable) return <Component {...this.props}/>

        const name = this.props.name || 'page'
        const location = this.props.location || {}
        const {request: {params: {[name]: currentPage = 1}}, response} = this.props.data

        const totalItems = response.totalItemCount || response.totalItems || response.total

        const {query} = location
        const countPages = Math.ceil(totalItems / itemsPerPage)
        let pages = []

        pages.push(
            <Link to={{pathname: location.pathname, query: {...query, [name]: 1}}} key={1}>
                <PaginationItem active={1 == currentPage}>{1}</PaginationItem>
            </Link>
        )

        for (let i = 2; i < countPages; i++) {
            if (i >= currentPage - 1 && pages.length < visible) {
                pages.push(
                    <Link to={{pathname: location.pathname, query: {...query, [name]: i}}} key={i}>
                        <PaginationItem active={i == currentPage}>{i}</PaginationItem>
                    </Link>
                )
            }
        }

        pages.push(
            <Link to={{pathname: location.pathname, query: {...query, [name]: countPages}}} key={countPages}>
                <PaginationItem active={countPages == currentPage}>{countPages}</PaginationItem>
            </Link>
        )

        if (countPages > 5 && (currentPage < (countPages - visible + 2))) {
            pages.splice(4, 0, <PaginationSpace key={countPages + 1}>...</PaginationSpace>)
        }

        if (countPages > 4 && currentPage >= visible) {
            pages.splice(1, 0, <PaginationSpace key={countPages + 2}>...</PaginationSpace>)
        }

        return (
            <Wrapper>
                <Component {...this.props}/>
                <PaginationWrapper>
                    <p>{(currentPage - 1)*pageLimit + 1}-{currentPage != countPages ? currentPage*pageLimit:totalItems} of {totalItems}</p>
                    <div>
                        {countPages && currentPage != 1 &&
                        <PaginationArrow
                             to={{
                                pathname: location.pathname, query: {
                                    ...query, [name]: currentPage - 1 == 0 ? 1 : currentPage - 1
                                }
                            }}
                        >
                            <FlatButton
                              label='Prev'
                              primary={true}
                              icon={<PrevIcon />}
                            />
                        </PaginationArrow>}
                        {pages}
                        {countPages != currentPage &&
                            <PaginationArrow
                                to={{pathname: location.pathname, query: {...query, [name]: currentPage - 1 + 2}}}
                            >
                                <FlatButton
                                  label='Next'
                                  labelPosition='before'
                                  primary={true}
                                  icon={<NextIcon />}
                                />
                            </PaginationArrow>
                        }
                    </div>
                </PaginationWrapper>
            </Wrapper>
        )
    }
}
