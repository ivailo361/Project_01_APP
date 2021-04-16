import React from "react";
import ReactExport from "react-export-excel";
import InputButton from '../../stylesComponents/button'
import styled from 'styled-components';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function Download(props) {
    const { filtered } = props


    return (
        <ExcelFile filename='ExportedCompo' element={<Input theme='export' type='button' value='Export'></Input>}>
            <ExcelSheet data={filtered} name="serverConfig">
                <ExcelColumn label="manNum" value="manNum" />
                <ExcelColumn label="description" value="description" />
                <ExcelColumn label="quantity" value="qty" />
                <ExcelColumn label="price"value='price' />
            </ExcelSheet>
        </ExcelFile>
    );
}

export default Download

const Input = styled(InputButton)`
    margin: 0.5rem 0;
    /* align-self: flex-end; */
`