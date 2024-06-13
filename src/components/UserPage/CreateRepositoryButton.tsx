import { Button } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { putRepository } from '../../services/backendAPI';

export interface CreateRepositoryButtonProps {
    orgId: string,
}

const CreateRepositoryButton = ({orgId}:CreateRepositoryButtonProps ) => {

    const handleClick = async () => {
        
        const formData = new FormData();
        formData.append("name", "testName");

        console.log(formData)

        try {
            const result = await putRepository(orgId, `\"test1\"`);
            console.log('Resource successfully uploaded:', result);
        } catch (error) {
            console.error('Error creating repository:', error);
        }
    }


    return (
        <div>
            <Button sx={{backgroundColor:"gray", padding: "1px 1px"}} variant="contained"  component="label" onClick={handleClick}>
            +
            </Button>
        </div>
    );
}

export default CreateRepositoryButton;
