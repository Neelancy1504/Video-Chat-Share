import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material';
import { validateMail} from '../../shared/utils/validators';
import InputWithLabel from '../../shared/components/InputWithLabel';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import  {connect} from 'react-redux';
import { getActions } from '../../store/actions/friendsActions';

const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler,
    sendFriendInvitation = () => {}
}) => {
    const [mail, setMail] = useState('');
    const [isFormValid, setIsFormValid] = useState('');

    const handleSentInvitation = () => {
        sendFriendInvitation ({
            targetMailAddress: mail,
        }, handleCloseDialog);   
    };

    const handleCloseDialog = () => {
        closeDialogHandler();
        setMail('');
    };

    useEffect(() => {
        setIsFormValid(validateMail(mail));
    },[mail, setIsFormValid]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
            <Typography> Invite a Friend </Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText component="div">
                <Typography> Enter e-mail address of friend which you would like to invite</Typography>
            </DialogContentText>
                <InputWithLabel
                    label='Mail'
                    type='text'
                    value={mail}
                    setValue={setMail}
                    placeholder="Enter mail address"
                />
        </DialogContent>
        <DialogActions>
            <CustomPrimaryButton
                onClick={handleSentInvitation}
                disabled={!isFormValid}
                label='Send'
                additionalStyles={{
                    marginLeft: '15px',
                    marginRight: '15px',
                    marginBottom: '10px',

                }}
            />
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect (null , mapActionsToProps)(AddFriendDialog);
