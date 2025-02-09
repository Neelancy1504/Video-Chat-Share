import React from 'react'
import { styled } from '@mui/material/styles'
import InputWithLabel from '../../shared/components/InputWithLabel'

const InputsContainer = styled('div')({
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px', // Adds consistent spacing between inputs
  //marginBottom: '5px' // Adds space below the entire inputs section
})


const LoginPageInputs = ({mail , setMail , password , setPassword}) => {
  return (
  <InputsContainer>
      <InputWithLabel 
        value = {mail}
        setValue = {setMail}
        label="E-mail"
        type="text"
        placeholder= "Enter e-mail address"
      />
      <InputWithLabel
        value = {password}
        setValue = {setPassword}
        label="Password"
        type="password"
        placeholder= "Enter password"
      />
    </InputsContainer>
 );

}

export default LoginPageInputs;
