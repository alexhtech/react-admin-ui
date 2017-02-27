import React from "react"
import {ImmutableLoadingBar as LoadingBar} from "react-redux-loading-bar"
import {connect} from "react-redux"
import Helmet from "react-helmet"

@connect(state=>({
    preload: state.preload
}))
class App extends React.Component {
    render() {
        return (
            <div>
                <LoadingBar style={{
                    backgroundColor: "#f00",
                    top: 0,
                    height: "2px",
                    zIndex: "10000",
                    position: "fixed",
                    boxShadow: "1px 1px 4px 0px rgba(50, 50, 50, 0.75)"
                }}/>
                <Helmet
                    title="App"

                    link={[
                        {rel: "icon", type: "image/png", href: require("../../../assets/favicon.png"), sizes: "150x150"}
                    ]}

                />
                {this.props.children}
            </div>
        )
    }
}
export default App