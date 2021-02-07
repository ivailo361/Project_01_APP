import styled from 'styled-components';

const OuterForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const InnerDiv = styled.div`
    padding-bottom: 1.3rem;
`

const Header = styled.div`
    margin: 1.5rem 0 1.3rem 0;
    font: 400 24px/1.4 Arial;
`
const LoginForm = styled.form`
    height: auto;
    background-color: #f6f8fa;
    padding: 1.3rem 1.3rem 0 1.3rem;
    border: 1px solid lightgrey;
    border-radius: 0.3rem;
`

const Sign = styled.button`
    &:hover {
        transition: background-color 0.4s ease;
        background-color: #308849;
        
    }
    width: 100%;
    height: 1.6rem;
    border: 1px solid #2f8146; 
    border-radius: 0.3rem;
    background-color: #2ea44f;
    color: white;
    font: 16px Arial;

`

 const formStyle = {
    OuterForm,
    InnerDiv,
    Header,
    LoginForm,
    Sign,
}

export default formStyle