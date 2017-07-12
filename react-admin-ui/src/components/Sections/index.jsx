import styled from 'styled-components'

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    min-height: 48px;
    justify-content: ${(props)=>props.end ? 'flex-end' : 'space-between'};
    padding: 0 10px;
`

const ContentWrapper = styled.div`
    padding: 10px;
`


const Controls = styled.div`
    display: flex;
    justify-content: flex-end;
    >div{
        margin-left: 10px;
    }
`


const StyledLabel = styled.div`
    padding-top: 15px;
    color: #909090;
    font-size: 14px;
`

const ItemWrapper = styled.div`
    padding-top: 5px;
`


export {
    HeaderWrapper,
    ContentWrapper,
    Controls,
    StyledLabel,
    ItemWrapper
}