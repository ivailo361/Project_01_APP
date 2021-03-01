import React, { Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { useRouteMatch, } from 'react-router-dom'
import db from '../../storage/database'
import { getData, importData } from '../../models/fetcher'
import Aside from '../../mainComponents/aside/aside'
import { Content } from '../../stylesComponents/content'
import { Part, Form, LabelInput, InputFile, AddButton } from '../../stylesComponents/inputs'
import { ErrorMsg, NotificationMsg } from '../../mainComponents/messenger/message'
import useNotifications from '../../models/notification'
import PartDetails from './partDetails'
import ModifyType from './modifyType'
import IsLoadingHOC from '../../mainComponents/loading/loadingHOK'



function EditPage(props) {
    const match = useRouteMatch("/edit/:id");
    const id = match ? match.params.id : ''
    
    const [part, setPart] = useState(null)
    const fileInput = useRef(null)
    const { error, notify, errorMessage, notifyMessage, closeMessage } = useNotifications()
    const { isLoading, setLoading } = props

    const links = db.getManufacturerList()
    const data = db.getComponentsData()

    const currentTypes = db.getTypesComponents()
    const [typesList, setTypesList] = useState(currentTypes)
    const currentManufacturers = db.getManufacturerConfigList()
    const [manufacturerList, setManufacturerList] = useState(currentManufacturers)

    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        let part = data.find(x => x._id === id)
        setPart(part)
        setLoading(false)

    }, [data, id])

    useEffect(() => {
        console.log('inside')
        getData('/api/stock')
            .then(res => {
                setTypesList(res[1])
                db.setTypesComponents(res[1])
                setManufacturerList(res[0])
                db.setManufacturerList(res[0])

            })
    }, [trigger])

    const uploadExcel = (e, fileInput) => {
        e.preventDefault();
        setLoading(true)
        const file = fileInput.current.files;
        const formData = new FormData();

        formData.append("avatar", file[0]);
        formData.append("text", 'some text');

        importData('/api/edit', formData)
            .then(res => {
                setLoading(false)
                notifyMessage(res)
                setTimeout(() => {
                    window.location.assign('/stock')
                }, 3000);
            })
            .catch(e => {
                setLoading(false)
                errorMessage(e.message)
            })
    }


    return (
        <>
            {!isLoading
                ? <Fragment>
                    {error ? <ErrorMsg message={error} closeMessage={closeMessage} /> : null}
                    {notify ? <NotificationMsg message={notify} closeMessage={closeMessage} /> : null}

                    <Aside list={links} />
                    <Content>
                        <Block>
                            {part
                                ? <PartDetails part={part} />
                                : <Fragment>
                                    <Part>
                                        <h1>Add new Excel file with database!</h1>
                                        <Form onSubmit={(e) => uploadExcel(e, fileInput)}>
                                            <div>
                                                <LabelInput htmlFor="files">Upload DB file</LabelInput>
                                                <InputFile type="file" id="files" name="files" multiple ref={fileInput} />
                                            </div>
                                            <AddButton type="submit" value="Upload Files" />
                                        </Form>
                                    </Part>
                                    <ModifyType typesList={typesList} manufacturerList={manufacturerList} setTrigger={setTrigger} />
                                </Fragment>
                            }
                        </Block>
                    </Content>
                </Fragment>
                : null
            }
        </>
    )
}


export default IsLoadingHOC(EditPage, "import your data")

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
