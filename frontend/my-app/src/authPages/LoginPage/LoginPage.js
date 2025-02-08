import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';
import AuthBox from '../../shared/components/AuthBox';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';
import { validateLoginForm } from '../../shared/utils/validators';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

// Styled components for the new UI
const LoginWrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)'
});

const LoginContainer = styled(Box)({
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

const LoginPage = ({ login }) => {
    const history = useNavigate();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(validateLoginForm({ mail, password }));
    }, [mail, password, setIsFormValid]);

    const handleLogin = () => {
        const userDetails = {
            mail,
            password
        };
        login(userDetails, history);
    };

    return (
        <LoginWrapper>
            <LoginContainer>
                <FormSection>
                    <LoginPageHeader />
                    <LoginPageInputs
                        mail={mail}
                        setMail={setMail}
                        password={password}
                        setPassword={setPassword}
                    />
                    <LoginPageFooter 
                        isFormValid={isFormValid} 
                        handleLogin={handleLogin}
                    />
                </FormSection>

                <ImageSection>
                    <img
                        src="https://img.freepik.com/premium-vector/two-persons-talking-meeting-friends-colleagues-vector-illustration_1014921-830.jpg"
                        alt="Login"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            borderRadius: '40px',
                        }}
                    />
                </ImageSection>
            </LoginContainer>
        </LoginWrapper>
    );
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect(null, mapActionsToProps)(LoginPage);
