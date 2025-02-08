import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material';
import AuthBox from '../../shared/components/AuthBox';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterPageFooter';
import { validateResgiterForm } from '../../shared/utils/validators';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

// Styled components matching Login page
const RegisterWrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)'
});

const RegisterContainer = styled(Box)({
    width: '65%',
    height: '75%',
    backgroundColor: 'white',
    borderRadius: '35px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'row',
    padding: '25px',
    overflow: 'hidden'
});

const FormSection = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '0 32px',
});

const ImageSection = styled(Box)({
    width: '50%',
    height: '95%',
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'right',
    marginBottom: '32px',
});

const PageTitle = styled(Typography)({
    fontSize: '28px',
    fontWeight: 700,
    color: '#2d3748',
    marginBottom: '8px',
    paddingTop: '30px',
    textAlign: 'center'
});

const SubTitle = styled(Typography)({
    color: '#718096',
    fontSize: '16px',
    textAlign: 'center',
    marginBottom: '32px'
});

const RegisterPage = ({ register }) => {
    const history = useNavigate();
    const [mail, setMail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState('');

    const handleRegister = () => {
        const userDetails = {
            mail,
            username,
            password
        };
        register(userDetails, history);
    };

    useEffect(() => {
        setIsFormValid(validateResgiterForm({
            mail,
            username,
            password,
        }));
    }, [mail, username, password, setIsFormValid]);

    return (
        <RegisterWrapper>
            <RegisterContainer>
                <FormSection>
                    <PageTitle>
                        Create an account
                    </PageTitle>
                    <SubTitle>
                        Join us and start connecting with friends
                    </SubTitle>

                    <RegisterPageInputs
                        mail={mail}
                        setMail={setMail}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                    />

                    <RegisterPageFooter
                        handleRegister={handleRegister}
                        isFormValid={isFormValid}
                    />
                </FormSection>

                <ImageSection>
                    <img
                        src="https://img.freepik.com/premium-vector/two-persons-talking-meeting-friends-colleagues-vector-illustration_1014921-830.jpg"
                        alt="Register"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            borderRadius: '40px',
                        }}
                    />
                </ImageSection>
            </RegisterContainer>
        </RegisterWrapper>
    );
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect(null, mapActionsToProps)(RegisterPage);

// import React, {useEffect, useState} from 'react'
// import AuthBox from '../../shared/components/AuthBox';
// import { Typography } from '@mui/material';
// import RegisterPageInputs from './RegisterPageInputs';
// import RegisterPageFooter from './RegisterPageFooter';
// import { validateResgiterForm } from '../../shared/utils/validators';
// import { connect } from 'react-redux';
// import { getActions } from '../../store/actions/authActions';
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = ({ register }) => {

//   const history =  useNavigate();


//   const [mail ,  setMail] = useState('');
//   const [username , setUsername] = useState('');
//   const [password , setPassword] = useState('');
//   const [isFormValid , setIsFormValid] = useState('');

//   const handleRegister = () => {
//    const userDetails = {
//     mail,
//     username,
//     password
//    };

//    register(userDetails , history);
//   };

//   useEffect(() => {
//     setIsFormValid(validateResgiterForm({
//       mail,
//       username,
//       password,
//     }));
//   }, [mail, username ,password, setIsFormValid]);

//   return (
//     <AuthBox> 
//       <Typography 
//         variant='h5'
//         sx = {{ color: 'white'}}>
//           Create an account
//       </Typography>

//       <RegisterPageInputs 
//         mail= {mail}
//         setMail = {setMail}
//         username = {username}
//         setUsername = {setUsername}
//         password = {password}
//         setPassword = {setPassword}
//       />

//       <RegisterPageFooter
//         handleRegister={handleRegister}
//         isFormValid={isFormValid}
//       />

//     </AuthBox>
//   )
// };



// const mapActionsToProps = (dispatch) => {
//   return {
//       ...getActions(dispatch),
//   };
// };

// export default connect(null , mapActionsToProps)(RegisterPage);


