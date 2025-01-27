import React from 'react'
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton'
import RedirectInfo from '../../shared/components/RedirectInfo'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const LoginPageFooter = ({handleLogin , isFormValid}) => {
  const navigate = useNavigate();

  const getFormNotValidMessage = () => {
    return "Please fill in all fields correctly";  // or whatever message you want
  };

  const handlePushToRegisterPage = () => {
    navigate('/register');
  };

  return (
    <>
    <Tooltip title={!isFormValid ? getFormNotValidMessage() : ""}>
      <div>
        <CustomPrimaryButton
          label="Log In"
          additionalStyles={{marginTop: '30px'}}
          disabled={!isFormValid}
          onClick={handleLogin}
        />
      </div>
    </Tooltip>

    <RedirectInfo
        text='Need an account? '
        redirectText='Create an acccount'
        additionalStyles={{marginTop: '5px'}}
        redirectHandler={handlePushToRegisterPage}
    />
    </>
  )
}

export default LoginPageFooter
