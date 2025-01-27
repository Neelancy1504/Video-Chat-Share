import React from 'react'
import InputWithLabel from '../../shared/components/InputWithLabel'
import {styled} from '@mui/material';

const InputsContainer = styled('div')({
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px', // Adds consistent spacing between inputs
  //marginBottom: '5px' // Adds space below the entire inputs section
})

const RegisterPageInputs = (props) => {
  const {mail , setMail , username, setUsername , password , setPassword} = props;
    return <InputsContainer>
    <InputWithLabel
      value = {mail}
      setValue = {setMail}
      label= 'E-mail address'
      type= 'text'
      placeholder = 'Enter e-mail address'
      />

    <InputWithLabel
      value = {username}
      setValue = {setUsername}
      label= 'Username'
      type= 'text'
      placeholder = 'Enter your username'
      />

    <InputWithLabel
      value = {password}
      setValue = {setPassword}
      label= 'Password'
      type= 'password'
      placeholder = 'Enter Password'
      />

      
    </InputsContainer>
  
}

export default RegisterPageInputs
