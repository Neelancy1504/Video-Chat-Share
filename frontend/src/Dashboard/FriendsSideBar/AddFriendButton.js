import React, { useState } from 'react'
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import AddFriendDialog from './AddFriendDialog';

const additionalStyles = {
    marginTop: '10px' ,
    marginLeft: '5px',
    width: '80%',
    height: '30px',
    fontWeight: '600',
    backgroundColor: '#17dbde'
}

const AddFriendButton = () => {
  const [isDialogOpen , setIsDialogOpen] = useState(false);

    const handleOpenAddFriendDialog = () => {
      setIsDialogOpen(true);
    };

    const handleCLoseAddFriendDialog = () => {
      setIsDialogOpen(false);
    }

  return (
    <>
      <CustomPrimaryButton 
        additionalStyles={additionalStyles}
        label= 'Add Friends'
        onClick = {handleOpenAddFriendDialog}
      />
      <AddFriendDialog
        isDialogOpen = {isDialogOpen}
        closeDialogHandler = {handleCLoseAddFriendDialog}
      />
    </>
  )
}

export default AddFriendButton
