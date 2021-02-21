import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import db from '../../storage/database'
import { deleteData } from '../../models/fetcher'
import TypeComponent from '../../mainComponents/listItems/typeComponent'
import { Block } from '../../stylesComponents/block'
import checkForAvailability from '../../models/checkForAvailability'
import useNotifications from '../../models/notification'
import { ErrorMsg, NotificationMsg } from '../../mainComponents/messenger/message'
import { DeleteButton, } from '../../stylesComponents/inputs'
import ConfirmRequest from '../../mainComponents/confirmation/confirmation'
import useAuth from '../../models/auth'
import InputButton from '../../stylesComponents/button'



function ManufacturerStock(props) {
    const match = useRouteMatch("/stock/:man");
    const [searchInput, setSearchInput] = useState('')
    const [markedForDel, setMarkedForDel] = useState([])
    const [confirmDel, setConfirmDel] = useState(false)
    const { data } = props
    const { userData } = useAuth()
    const { error, notify, notifyMessage, errorMessage, closeMessage } = useNotifications()

    const [dataDB, setDataDB] = useState([])
    const [outData, setOutData] = useState([])
    const [showZero, setShowZero] = useState(false)

    const manufacturer = match ? match.params.man : ''
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
    }, [data, manNumber])

    useEffect(() => {
        let result = checkForAvailability(dataDB, searchInput)
        let _dataDB = result
        if (showZero) {
            _dataDB = result.filter(x => Number(x.qty) > 0)
        }
        setOutData(_dataDB)
    }, [searchInput, dataDB, showZero])


    const selectedComp = {
        add: (id) => {
            setMarkedForDel(state => [...state, id])
        },
        remove: (id) => {
            let cleared = markedForDel.filter(x => x !== id)
            setMarkedForDel(cleared)
        },
        isSelected: (id) => {
            return markedForDel.indexOf(id) > -1;

        }
    }

    const deleteSelectedComp = () => {
        deleteData('/api/stock/delete', markedForDel)
            .then(res => {
                notifyMessage(`${res.deletedComponents} components was deleted`)
                setTimeout(() => {
                    window.location.assign('/stock')
                }, 2000);
            })
            .catch(e => errorMessage(e.message))
    }

    const searchItem = (e) => {
        e.preventDefault()
        let result = checkForAvailability(dataDB, searchInput)
        setOutData(result)
    }

    const confirmation = () => {
        setConfirmDel(state => !state)
    }

    const removeZeroComp = (e) => {
        setShowZero(state => !state)
        // console.log(dataDB)
    }

    return (
        <>
            {error ? <ErrorMsg message={error} closeMessage={closeMessage} /> : null}
            {notify ? <NotificationMsg message={notify} closeMessage={closeMessage} /> : null}
            <Header>
                <div>
                    <div>THIS IS A WAREHOUSE STOCK PER MANUFACTURER PAGE</div>
                    <div>The chosen warehouse is from <b>{manufacturer|| 'ALL'}</b></div>
                </div>
                <InputButton type='button' theme={showZero ? 'show' : 'hide'} onClick={removeZeroComp} value={showZero ? 'Show 0' : 'Hide 0'}></InputButton>
                {/* <button type='button' onClick={removeZeroComp}>Hide</button> */}

                <Form >
                    <Button type="submit" onClick={searchItem}><FontAwesomeIcon icon={faSearch} /></Button>
                    <Input type="text" placeholder="Search..." name="search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></Input>
                </Form>

            </Header>

            <Block>
                <TypeComponent dataDB={outData} selectedComp={selectedComp} checkBoxName='Del me' />
            </Block>
            {
                confirmDel
                ? <ConfirmRequest confirm={deleteSelectedComp} cancel={confirmation} message={'Are you sure you want to delete?'}/>
                : null
            }
            {userData.type === 'admin' && <DeleteButton type='button' onClick={confirmation} value="Delete components" />}
        </>

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
    width: 15rem;
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
    margin-left: 0.2rem;

`