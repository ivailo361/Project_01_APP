import React, { Fragment, useState } from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'


function TypeList(props) {
    const [showContent, setShowContent] = useState(true)
    const history = useHistory();

    const { comp, type } = props

    const listComp = comp.map((x, index) => {
        return (
            <Div key={x._id}>
                <Nav>
                    <Sap>{x.sapNum}</Sap>
                    <Man>{x.manNum}</Man>
                    <Desc>{x.description}</Desc>
                    <Qty><strong>{x.qty}</strong>&nbsp;pcs.</Qty>
                    <Price>{x.price} eur</Price>
                </Nav>

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
    
`

const Nav = styled.div`
    /* justify-content: space-between; */
    /* border-bottom: 2px solid lightgrey;  */
    display: flex;
    /* flex-grow: 2;    */
    box-sizing: border-box;
    flex-shrink: 1;
    width: 80%;

    /* flex-wrap: wrap; */
    margin: 0.3em 0 0 0;
    padding: 0;

`

const Li = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-grow: 1; 
    list-style-type: none;
    text-decoration: none;

    overflow: hidden;
    border: solid 3px white;
    background: #e3e3e4;
    /* opacity: 50%; */
    /* border-left: 2px solid lightgrey; 
    text-align: center; */
    
`
const Sap = styled(Li)`
    width: 7%;
`
const Man = styled(Li)`
    width: 15%;

`
const Desc = styled(Li)`
    width: 40%;
`
const Qty = styled(Li)`
    width: 8%;
    justify-content: flex-end;
`
const Price = styled(Li)`
    width: 10%;
    justify-content: flex-end;
`





