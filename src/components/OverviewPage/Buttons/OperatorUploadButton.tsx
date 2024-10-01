import {FormEvent, useState} from "react";
import { Box, Button, FormControl, FormLabel, Modal, TextField, Typography } from '@mui/material';

import { useBackendAPI } from "../../../services/backendAPI";

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
    const { createOperator } = useBackendAPI();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // TODO: need to be tested
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.append("ResourceType", "operator");
        const formEntries = Object.fromEntries(formData.entries());

        console.log('Form Data:', formEntries);

        if (formData.get('SourceCodeFile')) {
            try {
                const result = await createOperator(orgId, repId, formData);
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
                            <FormControl fullWidth margin="normal">
                                <FormLabel>Operator name</FormLabel>
                                <TextField name="Name" />

                                <FormLabel>Upload source code</FormLabel>
                                <input type="file" name="SourceCodeFile" />

                                <FormLabel>Upload dockerfile</FormLabel>
                                <input type="file" name="DockerfileFile" />
                            </FormControl>

                            <Button type="submit" sx={{ backgroundColor: "gray", padding: "1px", color: "black" }}>Submit</Button>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default OperatorUploadButton;
