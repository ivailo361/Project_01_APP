import React from "react";
import ReactExport from "react-export-excel";
import InputButton from '../../stylesComponents/button'
import styled from 'styled-components';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function Download(props) {
    const { filtered } = props
    console.log(filtered)


    return (
        <ExcelFile filename='ExportedCompo' element={<Input theme='export' type='button' value='Export'></Input>}>
            <ExcelSheet data={filtered} name="serverConfig">
                <ExcelColumn label="sapNum" value="sapNum" />
                <ExcelColumn label="manNum" value="manNum" />
                <ExcelColumn label="description" value="description" />
                <ExcelColumn label="quantity" value="qty" />
                <ExcelColumn label="price" value='price' />
                <ExcelColumn label="type" value='type' />
                <ExcelColumn label="compatibleSrv"value={col => col.compatibleSrv.join(", ")} />

            </ExcelSheet>
        </ExcelFile>
    );
}

export default Download

const Input = styled(InputButton)`
    margin: 0.5rem 0;
    /* align-self: flex-end; */
`