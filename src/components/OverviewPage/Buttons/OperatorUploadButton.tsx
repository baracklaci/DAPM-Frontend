import { Box, Button, FormControl, FormLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { putOperator, putResource } from '../../../services/backendAPI';

export interface UploadButtonProps {
    orgId: string,
    repId: string,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const OperatorUploadButton = ({ orgId, repId }: UploadButtonProps) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.append("ResourceType", "operator");
        const formEntries = Object.fromEntries(formData.entries());

        console.log('Form Data:', formEntries);

        if (formData.get('SourceCodeFile')) {
            try {
                const result = await putOperator(orgId, repId, formData);
                console.log('Resource successfully uploaded:', result);
            } catch (error) {
                console.error('Error uploading resource:', error);
            }
        } else {
            console.error('No file selected.');
        }

        alert("Form Submitted");
    };

    return (
        <div>
            <Button sx={{ backgroundColor: "gray", padding: "1px", color: "black" }} onClick={handleOpen}>+</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-create-repository"
                aria-describedby="modal-create-repository"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'white' }}>
                            Upload Operator
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth margin="normal" style={{display: "flex", flexDirection: "column", gap: "15px"}}>
                                <FormLabel>Operator name</FormLabel>
                                <TextField name="Name"/>

                                <FormLabel>Upload source code</FormLabel>
                                <input type="file" name="SourceCodeFile" style={{fontSize: "18px"}} />

                                <FormLabel>Upload dockerfile</FormLabel>
                                <input type="file" name="DockerfileFile" style={{fontSize: "18px"}}/>
                            </FormControl>

                            <div style={{textAlign: "center"}}>
                                <Button type="submit" sx={{ backgroundColor: "grey", padding: "3px 7px", color: "white", display: "inline-block", verticalAlign: "middle" , marginTop: "20px", fontSize: "20px", fontWeight: "bolder"}}>Submit</Button>
                            </div>
                            
                        </form>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default OperatorUploadButton;
