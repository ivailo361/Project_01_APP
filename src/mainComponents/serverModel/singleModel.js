
import React from 'react'
import styled from 'styled-components';
import Checkbox from '../listItems/checkbox'

function SingleModel(props) {
    const { servers, selectedComp } = props


    const list = servers.map(x => {
        return (

            <Server key={x._id}>
                <Property>
                    <Span>ManNum: </Span>
                    <Data>{x.manNum}</Data>
                </Property>
                <Property>
                    <Span>Description: </Span>
                    <Data>{x.description}</Data>
                </Property>
                <Property>
                    <Span>Quantity: </Span>
                    <Data>{x.qty}</Data>
                </Property>
                <Property>
                    <Span>Price: </Span>
                    <Data>{x.price}</Data>
                </Property>
                <Property>
                    <Span>Select</Span>
                    <Data>
                        <Checkbox id={x.sapNum} selectedComp={selectedComp} checkBox={false} />
                    </Data>
                </Property>
            </Server>
        )
    })


    return (
        list
    )
}

const Server = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* width: 30%; */
    border: 2px solid lightgrey; 
    border-radius: 0.3rem;
    margin: 1rem 0 0 0;
    padding: 0.5rem 0.1rem 0.5rem 0.1rem;
    overflow: auto; 
`
const Property = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    min-width: 100%;
    justify-content: flex-start;
    margin-bottom: 0.3rem;
    

`
const Data = styled.div`
    flex-grow: 2; 
    font-size: 0.9rem; 
    align-self: center;
`

const Span = styled.div`
    min-width: 120px;
    margin-right: 0.5rem;
    text-align: right;
    font-style: italic;
    font-size: medium;
    color: grey;
`


export default SingleModel