import { Button } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { putResource } from '../../services/backendAPI';

export interface UploadButtonProps {
    orgId: string,
    repId: string,
}

const UploadButton = ({orgId, repId}: UploadButtonProps) => {

    

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.files) {

            const file = e.target.files[0];
            const { name } = file;
            console.log(name)
            console.log(orgId)
            console.log(repId)

            const formData = new FormData();
            formData.append('Name', name);
            formData.append('ResourceType', "EventLog")
            formData.append('ResourceFile', e.target.files[0]);

            try {
                const result = await putResource(orgId, repId, formData);
                console.log('Resource successfully uploaded:', result);
            } catch (error) {
                console.error('Error uploading resource:', error);
            }
        } else {
            console.error('No file selected.');
        }
    }

    return (
        <div>
            <Button sx={{backgroundColor:"gray", padding: "1px 1px"}} variant="contained"  component="label">
                +  <input    type="file"
                    hidden onChange={handleChange}
                />
            </Button>
        </div>
    );
}

export default UploadButton;
