import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import db from '../../storage/database'
import TypeComponent from '../../mainComponents/listItems/typeComponent'
import { Block } from '../../stylesComponents/block'
// import { Input, } from '../../stylesComponents/inputs'
import checkForAvailability from '../../models/checkForAvailability'



function ManufacturerStock(props) {
    const { manufacturer } = useParams()
    const [searchInput, setSearchInput] = useState('')
    const { data } = props
    
    const [dataDB, setDataDB] = useState([])
    const [outData, setOutData] = useState([])

    const manNumber = db.getManufacturerFullData(manufacturer)

    useEffect(() => {
        const res = data.filter(x => {
            if (manNumber === 'ALL') {
                return x
            } else {
                return x.manufacturer.toString() === manNumber || x.manufacturer.toString() === undefined
            }
        })
        setDataDB(res)
        setOutData(res)
    }, [data, manNumber])

    useEffect(() => {
        let result = checkForAvailability(dataDB, searchInput)
        setOutData(result)
    }, [searchInput, dataDB])


    const searchItem = (e) => {
        e.preventDefault()
        // let result = dataDB.reduce((acc, v) => {
        //     let re = new RegExp(searchInput);
        //     if (re.test(v.sapNum)) {
        //         return acc.concat(v)
        //     }
        //     return acc
        // }, [])
        let result = checkForAvailability(dataDB, searchInput)
        console.log(result)
        setOutData(result)
    }

    return (
        < div >
            <Header>
                <div>
                    <div>THIS IS A WAREHOUSE STOCK PER MANUFACTURER PAGE</div>
                    <div>The chosen warehouse is from <b>{manufacturer || 'all'}</b></div>
                </div>

                <Form >
                    <Button type="submit" onClick={searchItem}><FontAwesomeIcon icon={faSearch} /></Button>
                    <Input type="text" placeholder="Search..." name="search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></Input>
                </Form>

            </Header>

                    <Block>
                        <TypeComponent dataDB={outData} />
                    </Block>
            
        </div >

    )
}

export default ManufacturerStock

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;

`
const Input = styled.input`
    padding: 5px;
    font-size: 14px;
    border: 1px solid grey;
    /* width: 80%; */
    background: #f1f1f1;
    
`

const Button = styled.button`
    &:hover {
        background: #0b7dda;
    }
    /* width: 20%; */
    padding: 7px;
    background: #2196F3;
    color: white;
    font-size: 17px;
    border: 1px solid grey;
    border-right: none;
    cursor: pointer;
`

const Form = styled.form`
    display: flex;

`