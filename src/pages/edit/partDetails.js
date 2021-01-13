import React, { Fragment, useState } from 'react'
import db from '../../storage/database'
import { putComponentData } from '../../models/fetcher'
import { Part, AddButton, Div, FormComponent, Label, Select } from '../../stylesComponents/inputs'
import useNotifications from '../../models/notification'


import { ErrorMsg, NotificationMsg } from '../../mainComponents/messenger/message'

function PartDetails(props) {
    const { part } = props
    const [inputs, setInputs] = useState({ ...part });
    const { error, notify, notifyMessage, errorMessage, closeMessage } = useNotifications()

    const types = db.getTypesComponents()
    const models = db.getModels(part.manufacturer)
    const serverModels = models.slice(0, models.length - 1)


    let selectTypes = types.map(x => {
        return (
            <option key={x._id} value={x.type}>{x.type}</option>
        )
    })

    let listModels = serverModels.map((x, i) => {
        return (
            <option key={i} value={x}>{x}</option>
        )
    })

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const handleSelectModels = (event) => {
        const target = event.target
        const name = target.name
        const value = Array.from(target.selectedOptions, option => option.value);
        setInputs(inputs => ({ ...inputs, [name]: value }));
        // setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
            putComponentData('/api/edit/component', inputs)
                .then(res => {
                    if (res >= 1) {
                        db.updateComponent(inputs)
                    }
                    notifyMessage(`modified component: ${res}\n`)
                })
                .catch(e => {
                    console.log(e)
                    errorMessage(e.message)
                })
        }
    }

    return (
        <Fragment>
            {error ? <ErrorMsg message={error} closeMessage={closeMessage} /> : null}
            {notify ? <NotificationMsg message={notify} link={part.manufacturer} closeMessage={closeMessage} /> : null}
            <h1>Edit the chosen component</h1>
            <p>-------------------------</p>
            <Part>
                <FormComponent onSubmit={handleSubmit}>

                    <Div>
                        <Label>Pick up the compatible servers  </Label>
                        <Label>Multiple selections are possible  </Label>
                        <Select multiple={true} size={serverModels.length} name='compatibleSrv' value={inputs.compatibleSrv} onChange={handleSelectModels}>
                            {listModels}
                        </Select>
                    </Div>

                    <Div>
                        <Label>Pick your the correct type:  </Label>
                        <Select name='type' value={inputs.type || 'undefined'} onChange={handleInputChange}>
                            {selectTypes}
                        </Select>
                    </Div>
                    <Div>
                        <AddButton type="submit" value="Submit" />
                    </Div>
                </FormComponent>
            </Part>
        </Fragment>
    )
}

export default PartDetails


