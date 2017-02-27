import React from "react"
import {Link} from "react-router"
import {connect} from "react-redux"

@connect((state)=>({
    location: state.getIn(["routing", "locationBeforeTransitions"])
}))
export default ({itemsPerPage = 10, visible = 4} = {})=> {
    return (Component) => class Pagination extends React.Component {
        render() {
            const name = this.props.name || "page"
            const {location} = this.props
            const {request: {params: {[name]: currentPage = 1}}, response:{totalItems}} = this.props.data

            const {query} = location
            const countPages = Math.ceil(totalItems / itemsPerPage)
            let pages = []

            for (let i = 1; i <= countPages; i++) {
                if (i >= currentPage - 1 && pages.length < visible) {
                    pages.push(
                        <Link to={{pathname: location.pathname, query: {...query, [name]: i}}} key={i}>
                            <p className={i == currentPage && "active"}>{i}</p>
                        </Link>
                    )
                }
            }

            return (

                <div>
                    <Component {...this.props}/>
                    <div className="paginator">
                        {countPages && currentPage != 1 &&
                        <Link to={{
                            pathname: location.pathname, query: {
                                ...query, [name]: currentPage - 1 == 0 ? 1 : currentPage - 1
                            }
                        }} className="paginator__arrows"><i className="fa fa-angle-double-left"/></Link>}
                        {pages}
                        {countPages != currentPage &&
                        <Link to={{pathname: location.pathname, query: {...query, [name]: currentPage - 1 + 2}}}
                              className="paginator__arrows"><i className="fa fa-angle-double-right"/></Link>}
                    </div>
                </div>
            )
        }
    }
}
