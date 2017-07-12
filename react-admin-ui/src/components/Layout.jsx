import React from 'react'
import Snackbar from './Sections/Snackbar'
import Panel from './Sections/Panel'
import Header from './Sections/Header'
import styled from 'styled-components'
import {renderRoutes} from 'react-router-config'
import {Paper} from 'material-ui'

const Body = styled.div`
    background-color: rgb(237, 236, 236);
    display: flex;
    flex: 1 1 0%;
    overflow-y: hidden;
    overflow-x: scroll;
`

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

const ContentWrapper = styled.div`
    flex: 1 1 0%;
    padding: 1em;
`

export default class Entity extends React.Component {
    render() {
        return (
            <Layout>
                <Header/>
                <Body>
                <Panel/>
                <ContentWrapper>
                    <Paper>
                        {renderRoutes(this.props.route.routes)}
                    </Paper>
                </ContentWrapper>
                <Snackbar/>
                </Body>
            </Layout>
        )
    }
}
