import React from 'react'
import Snackbar from '../../components/Snackbar'
import Panel from '../../components/Panel'
import Header from '../../components/Header'
import styled from 'styled-components'
import {renderRoutes} from 'react-router-config'
import {Paper} from 'material-ui'
import {Route, Link} from 'react-router-dom'

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
const Content = styled(Paper)`
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
