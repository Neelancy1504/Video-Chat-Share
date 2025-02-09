import React from 'react'
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton'
import RedirectInfo from '../../shared/components/RedirectInfo'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const RegisterPageFooter = ({handleRegister, isFormValid}) => {
  const navigate = useNavigate();

  const getFormNotValidMessage = () => {
    return "Please fill in all fields correctly";  // or whatever message you want
  };

  const handlePushToLoginPage = () => {
    navigate('/login');
  };

  return (
    <>
    <Tooltip title={!isFormValid ? getFormNotValidMessage() : ""}>
      <div>
        <CustomPrimaryButton
          label="Register"
          additionalStyles={{marginTop: '30px'}}
          disabled={!isFormValid}
          onClick={handleRegister}
        />
      </div>
    </Tooltip>

    <RedirectInfo
        text=''
        redirectText='Already have an account ? '
        additionalStyles={{marginTop: '5px'}}
        redirectHandler={handlePushToLoginPage}
    />
    </>
  )
}

export default RegisterPageFooter;
