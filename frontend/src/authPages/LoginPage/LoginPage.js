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
import WebsiteLogo from '../../Dashboard/SideBar/WebsiteLogo';

// Styled components for the new UI
const LoginWrapper = styled('div')({
    width: '100%',  // Changed from 90%
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
    padding: '20px'  // Added padding for smaller screens
});

const LoginContainer = styled(Box)(({ theme }) => ({
    width: '90%',
    maxWidth: '1200px',  // Added max-width
    height: 'auto',      // Changed from fixed height
    minHeight: '75%',
    backgroundColor: 'white',
    borderRadius: '35px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'row',
    padding: '25px',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
        flexDirection: 'column',
        width: '100%',
        padding: '15px'
    }
}));

const FormSection = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '0 32px',
    '@media (max-width: 768px)': {
        padding: '0 15px',
        alignItems: 'center'
    }
}));

const ImageSection = styled(Box)(({ theme }) => ({
    width: '50%',
    height: '95%',
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'right',
    marginBottom: '32px',
    '@media (max-width: 768px)': {
        width: '100%',
        height: 'auto',
        marginTop: '20px',
        justifyContent: 'center'
    },
    '@media (max-width: 480px)': {
        display: 'none'  // Hide image on very small screens
    }
}));

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
                    <WebsiteLogo />
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
                            width: 'auto',  // Added for better responsiveness
                            height: 'auto'  // Added for better responsiveness
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
