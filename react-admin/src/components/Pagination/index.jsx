import React from 'react'
import {Link} from 'react-isomorphic-tools'

export default (Component) => class Pagination extends React.Component {
    render() {
        const pagination = this.props.entity.pagination

        const itemsPerPage = pagination && pagination.itemsPerPage ? pagination.itemsPerPage : 10
        const visible = pagination && pagination.visible ? pagination.visible : 4
        const disable = pagination && pagination.disable

        if (disable) return <Component {...this.props}/>

        const name = 'page'
        const response = this.props.data.get('response')
        const currentPage = this.props.data.getIn('response.params.page'.split('.')) || 1


        const totalItems = response.get('totalItemCount') || response.get('totalItems') || response.get('total')
        const items = response.get('items') || response.get('Items') || response.get('data')

        const query = this.props.query
        const countPages = Math.ceil(totalItems / itemsPerPage)
        let pages = []

        for (let i = 1; i <= countPages; i++) {
            if (i >= currentPage - 1 && pages.length < visible) {
                pages.push(
                    <Link to={{pathname: this.props.url, query: {...query, [name]: i}}} key={i}>
                        <p className={i == currentPage && 'active'}>{i}</p>
                    </Link>
                )
            }
        }

        return (

            <div>
                <Component {...this.props} items={items}/>
                <div className='paginator'>
                    {countPages && currentPage != 1 &&
                    <Link to={{
                        pathname: this.props.url, query: {
                            ...query, [name]: currentPage - 1 == 0 ? 1 : currentPage - 1
                        }
                    }} className='paginator__arrows'><i className='fa fa-angle-double-left'/></Link>}
                    {pages}
                    {countPages != currentPage &&
                    <Link to={{pathname: this.props.url, query: {...query, [name]: currentPage - 1 + 2}}}
                          className='paginator__arrows'><i className='fa fa-angle-double-right'/></Link>}
                </div>
                <div>Total items: {totalItems || 0}</div>
            </div>
        )
    }
}
