import styled from 'styled-components';


const Part = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid lightgrey; 
    border-radius: 0.3rem;
    margin: 1rem 0;
    padding: 1rem 0.5rem 0 0.5rem;
`
const Form = styled.form`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 0 1rem 0;
`
const FormComponent = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Label = styled.div`
    font-weight: bold;
    padding: 0 0 0.3rem 0;
`
const LabelRed = styled(Label)`
    color: #f44336;
`
const Input = styled.input`
    border: 2px solid lightgrey; 
    border-radius: 0.3rem;
`
const Select = styled.select`
    border: 2px solid lightgrey; 
    border-radius: 0.3rem;
`

const InputFile = styled.input`
    opacity: 0;
    width: 0;
`

const LabelInput = styled.label`
  display: inline-block;
  background: lightgray;
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: bold;
  margin-top: 0.3rem;
`

const Button = styled.input`
    &:hover {
        background-color: white;
        font-weight: bold;
    }
    border-radius: 0.3rem;
    color: white;
    margin-left: 1rem;
    padding: 3px 6px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.2s;
`
const DeleteButton = styled(Button)`
    &:hover { 
        color: #f44336;
    }
    background-color: #f44336;
    border: 2px solid #f44336; 
`
const AddButton = styled(Button)`
    &:hover {
        color: #4CAF50;;
    }
    background-color: #4CAF50;
    border: 2px solid #4CAF50; 
`

const Div = styled.div`
    margin: 0 0 1rem 0;
`


export {
    Part,
    Form,
    FormComponent,
    Label,
    LabelRed,
    Input,
    InputFile,
    LabelInput,
    Select,
    DeleteButton,
    AddButton,
    Div,
}