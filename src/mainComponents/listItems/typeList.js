import React, { Fragment, useState } from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import Checkbox from './checkbox'


function TypeList(props) {
    const [showContent, setShowContent] = useState(true)
    const history = useHistory();

    const { comp, type, selectedComp, checkBox } = props

    const listComp = comp.map((x, index) => {
        return (
            <Div key={x._id}>
                <Nav>
                    <Sap>{x.sapNum}</Sap>
                    <Man>{x.manNum}</Man>
                    <Desc>{x.description}</Desc>
                    <Qty>{x.qty}&nbsp;pcs.</Qty>
                    <Price>{x.price} lv</Price>
                </Nav>
                {checkBox
                    ? <Checkbox id={x.sapNum} selectedComp={selectedComp} />
                    : null
                }
                <Button onClick={() => history.push(`/Edit/${x._id}`)}>Edit</Button>
            </Div>
        )
    })
    return (
        <Fragment>
            <ButtonHeader /*style={{'text-align': 'left'}} */ onClick={() => setShowContent(!showContent)}>{type}</ButtonHeader>
            {showContent === true ? listComp : null}
        </Fragment>
    )
}


export default TypeList

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;

`
const Button = styled.button`
    &:hover {
        background-color: rgb(22,77,9);
        border: 2px solid rgb(22,77,9);
        color: white;
        cursor: pointer;
    }
    display: block;
    box-sizing: border-box;
    align-self: center;
    background-color: rgb(153,224,135, 0.9); /*where 0.5 stands for 50% opacity*/
    border: 2px solid rgb(153,224,135, 0.9);
    border-radius: 0.3rem;
    /* text-shadow: 0.5px 0.5px 0.5px #000; */
    box-shadow: inset 0 0 10px #cccccc;
    padding: 0 0.2rem;
    font: inherit;

`
const ButtonHeader = styled.button`
&:hover {
        background-color: rgb(162,162,162);

    }
    width: 100%;
    background-color: slategrey;
    color: white;
    border: 2px solid slategrey;
    border-radius: 0.3rem;
    font-weight: bold;
    font-size: 0.9rem;
    
`

const Nav = styled.div`
    /* justify-content: space-between; */
    /* border-bottom: 2px solid lightgrey;  */
    display: flex;
    /* flex-grow: 2;    */
    box-sizing: border-box;
    flex-shrink: 1;
    width: 85%;
    font: inherit;


    /* flex-wrap: wrap; */
    margin: 0.2rem 0 0 0;
    padding: 0;

`

const Li = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-grow: 1; 
    list-style-type: none;
    text-decoration: none;

    /* overflow: hidden; */
    border: solid 0 white;
    border-width: 0px 0.2rem 0 0;
    padding: 2px;
    height: auto;
    background: #e3e3e4;
    font: inherit;

    /* text-align: left; */
    /* font-size: 0.8rem; */
    /* opacity: 50%; */
    /* border-left: 2px solid lightgrey; 
    text-align: center; */
    
`
const Sap = styled(Li)`
    flex-basis: 5%;
    /* flex-shrink: 1; */
`
const Man = styled(Li)`
    flex-basis: 12%;
    flex-shrink: 0;

`
const Desc = styled(Li)`
    flex-basis: 50%;
    flex-grow: 4;
    /* flex-shrink: 4; */
    /* font-family: 'Times New Roman', Times, serif; */

`
const Qty = styled(Li)`
    flex-basis: 5%;
    justify-content: flex-end;
`
const Price = styled(Li)`
    flex-basis: 8%;
    justify-content: flex-end;
`





