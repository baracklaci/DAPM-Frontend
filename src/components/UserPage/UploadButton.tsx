import { Button, FormControl, FormLabel, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { putResource } from '../../services/backendAPI';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';

export interface UploadButtonProps {
    orgId: string,
    repId: string,
}

const UploadButton = ({ orgId, repId }: UploadButtonProps) => {

    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());
        
        console.log('Form Data:', formEntries);

        if (formData.get('ResourceFile')) {
            try {
                const result = await putResource(orgId, repId, formData);
                console.log('Resource successfully uploaded:', result);
            } catch (error) {
                console.error('Error uploading resource:', error);
            }
        } else {
            console.error('No file selected.');
        }
        
        alert("Form Submitted");
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
            <Button
                sx={{ backgroundColor: "gray", padding: "1px", color: "black" }}
                aria-describedby={id}
                type="button"
                onClick={handleClick}
            >
                +
            </Button>
            <BasePopup
                id={id}
                open={open}
                anchor={anchor}
                placement="right"
                offset={30}
            >
                <div
                    style={{
                        backgroundColor: 'black',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>Resource name</FormLabel>
                            <TextField name="Name" />

                            <FormLabel>Resource type</FormLabel>
                            <TextField name="ResourceType" />

                            <FormLabel>Upload File</FormLabel>
                            <input type="file" name="ResourceFile" onChange={handleChange} />
                        </FormControl>

                        <Button type="submit" sx={{ backgroundColor: "gray", padding: "1px", color: "black" }}>Submit</Button>
                    </form>
                </div>
            </BasePopup>
        </div>
    );
}

export default UploadButton;
