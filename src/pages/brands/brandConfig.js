import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import Aside from '../../mainComponents/aside/aside'
import { Content } from '../../stylesComponents/content'
import ServerModel from '../../mainComponents/serverModel/serverModel'
import db from '../../storage/database' 


function Brands() {
    const { brand } = useParams()

    return (
        <Fragment>
            <Aside list={db.getModels(brand)} theme={brand} />
            <Content>
                <ServerModel brand={brand}/>
                {/* <Switch>
                    <Route exact path={path} render={() => <ServerModel brand={brand} />}  />
                    <Route path={`${path}/:model`} component={ServerModel}  />
                </Switch> */}
            </Content>
        </Fragment>
    )
}

export default Brands