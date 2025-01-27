import React, { useState } from 'react'
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import AddFriendDialog from './AddFriendDialog';

const additionalStyles = {
    marginTop: '10px' ,
    marginLeft: '5px',
    width: '80%',
    height: '30px',
    backgroundColor: '#3BA55D'
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
