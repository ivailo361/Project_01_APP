import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Aside from '../../mainComponents/aside/aside'
import { Content } from '../../stylesComponents/content'
import ManufacturerPage from '../../pages/manufacturerStock/manufacturerStock'
import { getData } from '../../models/fetcher'
import db from '../../storage/database'
import useNotifications from '../../models/notification'
import { ErrorMsg } from '../../mainComponents/messenger/message'
import useAuth from '../../models/auth'
import login from '../../stylesComponents/LogRegForm'
import IsLoadingHOC from '../../mainComponents/loading/loadingHOK'


function StockPage(props) {
    const [list, setList] = useState([])
    const { isLoading, setLoading } = props
    const [compData, setCompData] = useState(db.getComponentsData())
    const { error, errorMessage, closeMessage } = useNotifications()
    const { isLoggedIn } = useAuth()
    const manList = db.getManufacturerList()

    let history = useHistory()

    useEffect(() => {
        console.log('inside useEffect')
        if (manList.length <= 1) {
            isLoggedIn && setLoading(true)
            getData('/api/stock')
                .then((res) => {
                    console.log(res)
                    setLoading(false)
                    db.setManufacturerList(res[0])
                    db.setTypesComponents(res[1])
                    setList(db.getManufacturerList())
                }).catch(e => errorMessage(e.message))
        } else {
            setList(manList)
        }
    }, [])

    useEffect(() => {
        console.log('inside useEffect22')
        if (compData.length === 0) {
            isLoggedIn && setLoading(true)
            getData('/api/edit')
                .then((res) => {
                    setLoading(false)
                    db.setComponentsData(res)
                    setCompData(res)
                })
                .catch(e => errorMessage(e.message))
        }
    }, [])

    if (!isLoggedIn) {

        return (
            <login.OuterForm>
                <login.Header>You have to login first</login.Header>
                <login.Sign type='button' onClick={() => history.push('/login')} >Login</login.Sign>
            </login.OuterForm>
        )
    }

    return (
        <>
            {!isLoading
                ? <Fragment>
                    {error ? <ErrorMsg message={error} closeMessage={closeMessage} /> : null}
                    <Aside list={list} />
                    <Content>
                        <ManufacturerPage data={compData} />
                        {/* <Switch> */}
                        {/* <Route exact path={path} render={() => <ManufacturerPage data={compData} />} /> */}
                        {/* <Route exact path={path}><ManufacturerPage data={compData} /></Route> */}
                        {/* <Route path={`${path}/:manufacturer`}><ManufacturerPage data={compData} /></Route> */}
                        {/* <Route path={`${path}/:manufacturer`} render={() => <ManufacturerPage data={compData} />} /> */}
                        {/* </Switch> */}
                    </Content>
                </Fragment>
                : null
            }
        </>

    )
}

export default IsLoadingHOC(StockPage, "Loading your data...")
