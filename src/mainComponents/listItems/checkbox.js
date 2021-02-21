import React, { useState } from 'react'
import styled from 'styled-components';

function Checkbox(props) {
    const { id, selectedComp } = props;
    const [checked, setChecked] = useState(selectedComp.isSelected(id));

    const action = (id) => {
        if (!checked) {
            selectedComp.addForDel(id)
        } else {
            selectedComp.removeForDel(id)
        }
        setChecked(!checked)
    }

    return (
        <Div>
            <label>
                <input type="checkbox"
                    checked={checked}
                    onChange={() => action(id)}
                />
            </label>
            <Text>Del me!</Text>
        </Div>
    );
}

export default Checkbox

const Text = styled.span`
    display: inline-block;
    width: auto;
    text-align: center;
    font-size: 0.8rem;
    padding-left: 0.3rem;
`
const Div = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    /* justify-content: space-between; */

`