import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Aside from '../../mainComponents/aside/aside'
import { Content } from '../../stylesComponents/content'
import ManufacturerPage from '../../pages/manufacturerStock/manufacturerStock'
import { getData } from '../../models/fetcher'
import db from '../../storage/database'
import useNotifications from '../../models/notification'
import { ErrorMsg } from '../../mainComponents/messenger/message'
import IsLoadingHOC from '../../mainComponents/loading/loadingHOK'


function StockPage(props) {
    const [list, setList] = useState([])
    const { isLoading, setLoading } = props
    const [compData, setCompData] = useState(db.getComponentsData())
    const { error, errorMessage, closeMessage } = useNotifications()
    const manList = db.getManufacturerList()
    const userData = JSON.parse(sessionStorage.getItem('user'))

    let history = useHistory()

    useEffect(() => {
        setList(manList)
        if (userData) {
            fetchData()
        }
        console.log(userData)
    }, [])

    const fetchData = async () => {
        if (manList.length <= 1 || compData.length === 0) {
            try {
                setLoading(true)
                let [ types, comp ] = await Promise.all([getData('/api/stock'), getData('/api/edit')])
                setLoading(false)
                db.setManufacturerList(types[0])
                db.setTypesComponents(types[1])
                setList(db.getManufacturerList())
                db.setComponentsData(comp)
                setCompData(comp)
            }
            catch (e) {
                setLoading(false)
                errorMessage(e.message)
                setTimeout(() => {
                    if (e.message === 'jwt expired') {
                        history.push('/logout')
                    }
                }, 2000)
            }
        }
    }


    // if (!isLoggedIn) {

    //     return (

    //         <login.OuterForm>
    //             <login.Header>You have to login first</login.Header>
    //             <login.Sign type='button' onClick={() => history.push('/login')} >Login</login.Sign>
    //         </login.OuterForm>
    //     )
    // }


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
