import React from 'react'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const Loader = styled.div`
    display: flex;
    border: 4px solid #e6e4e4;
    border-top: 4px solid white;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    animation: spin 0.7s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const LoaderComponent = () => (
    <LoaderWrapper>
        <Loader>
        </Loader>
    </LoaderWrapper>
)

export default LoaderComponent
