import React, { Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { deleteData, putComponentData } from '../../models/fetcher'
import useNotifications from '../../models/notification'
import { ErrorMsg, NotificationMsg } from '../../mainComponents/messenger/message'
import { Part, DeleteButton, AddButton, Form, Label, LabelRed, Input, Select } from '../../stylesComponents/inputs'
import db from '../../storage/database'
import { getData } from '../../models/fetcher'




function ModifyType() {
    const location = useLocation()
    const currentTypes = db.getTypesComponents()
    const [typesList, setTypesList] = useState(currentTypes)
    const currentManufacturers = db.getManufacturerConfigList()
    const [manufacturerList, setManufacturerList] = useState(currentManufacturers)

    const [SelectTypes, setSelectTypes] = useState([])
    const [manufacturerNames, setManufacturerNames] = useState([])
    const [modelsList, setModelsList] = useState([])

    
    const [trigger, setTrigger] = useState(false)
    const typeCompUrl = '/api/edit/types'
    const serverModelsUrl = '/api/edit/models'

    // const [input, setInput] = useState({})
    // const [newType, setNewType] = useState('')
    const [inputs, setInputs] = useState({manufacturer: manufacturerList[0]._id});
    const { error, notify, notifyMessage, errorMessage, closeMessage } = useNotifications()

    useEffect(() => {
        let types = typesList.map(x => {
            return (
                <option key={x._id} value={x.type}>{x.type}</option>
            )
        })
        setSelectTypes(types)
        let names = manufacturerList.map(x => {
            return (
                <option key={x._id} value={x._id}>{x.name}</option>
            )
        })
        setManufacturerNames(names)
        // let defaultMan = inputs.manufacturer ? inputs.manufacturer : manufacturerList[0]._id
        let man = manufacturerList.find(x => x._id.toString() === inputs.manufacturer.toString()) 
        let models = man.models.map((x, i) => {
            return (
                <option key={i} data-index={man._id} value={x}>{x}</option>
            )
        })
        setModelsList(models)
    }, [typesList, manufacturerList, inputs])

    useEffect(() => {
        getData('/api/stock')
            .then(res => {
                console.log(res)
                setTypesList(res[1])
                db.setTypesComponents(res[1])
                setManufacturerList(res[0])
                db.setManufacturerList(res[0])

            })
    }, [trigger])

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const handleAdd = (event, url) => {
        event.preventDefault();
        putComponentData(url, inputs)
            .then(res => {
                if (res.insertedCount >= 1) {
                    setTrigger(state => !state)
                    notifyMessage(`${res.type} was successfully added`)
                } else {
                    errorMessage('Something went wrong please try again later')
                }
                setInputs(inputs => ({...{}, manufacturer: inputs.manufacturer }))
            })
            .catch(e => {
                errorMessage(e.message)
            })
    }


    const handleDelete = (event, url) => {
        event.preventDefault();
        deleteData(url, inputs)
            .then(res => {
                if (res.deletedCount >= 1) {
                    // const deletedTypeName = typesList.find(x => (x._id).toString() === (inputs.id).toString())
                    // console.log(inputs, typesList)
                    // console.log(deletedTypeName)
                    setTrigger(state => !state)
                    // notifyMessage(`${deletedTypeName.type} was successfully deleted`)
                    notifyMessage(`${res.deletedModel} was successfully removed`)
                } else {
                    errorMessage('Something went wrong please try again later')
                }
            })
            .catch(e => {
                errorMessage(e.message)
            })
    }


    return (
        <Fragment>
            {error ? <ErrorMsg message={error} closeMessage={closeMessage} /> : null}
            {notify ? <NotificationMsg message={notify} closeMessage={() => closeMessage('notify', location)} /> : null}
            <Part>
                <Form onSubmit={(e) => handleAdd(e, typeCompUrl)}>
                    <div>
                        <Label>Add new type</Label>
                        <Input name='type' type='text' value={inputs.type || ''} onChange={handleInputChange}></Input>
                    </div>
                    <AddButton type="submit" value="Add" />
                </Form>

                <Form onSubmit={(e) => handleDelete(e, typeCompUrl)}>
                    <div>
                        <LabelRed>Danger Zone  </LabelRed>
                        <Select name='id' value={inputs.id} onChange={handleInputChange}>
                            {SelectTypes}
                        </Select>
                    </div>
                    <DeleteButton type="submit" value="Delete" />
                </Form>
            </Part>
            <Part>
                <Form >
                    <div>
                        <Label>Choose manufacturer</Label>
                        <Select name='manufacturer' value={inputs.manufacturer} onChange={handleInputChange}>
                            {manufacturerNames}
                        </Select>
                    </div>
                </Form>
                <Form onSubmit={(e) => handleAdd(e, serverModelsUrl)}>
                    <div>
                        <Label>Add new model</Label>
                        <Input name='model' type='text' value={inputs.model || ''} onChange={handleInputChange}></Input>
                    </div>
                    <AddButton type="submit" value="Add" />
                </Form>
                <Form onSubmit={(e) => handleDelete(e, serverModelsUrl)}>
                    <div>
                        <LabelRed>Danger Zone  </LabelRed>
                        <Select name='name' value={inputs.name} onChange={handleInputChange}>
                            {modelsList}
                        </Select>
                    </div>
                    <DeleteButton type="submit" value="Delete" />
                </Form>
            </Part>
        </Fragment >
    )
}

export default ModifyType