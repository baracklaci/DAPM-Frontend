import {ChangeEvent, useState} from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

import { useBackendAPI } from "../../../services/backendAPI";

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

export default function AddOrganizationButton() {
    const { PostNewPeer } = useBackendAPI();
    const [domainName, setDomainName] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // TODO: need to be tested
    const handleUpload = async () => {
        await PostNewPeer(domainName)
    }

    return (
        <div>
            <Button sx={{ backgroundColor: "gray", padding: "1px", color: "black" }} onClick={handleOpen}>+</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-add-organization"
                aria-describedby="modal-add-organization"
            >
                <Box sx={style}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color: 'white'}}>
                        Add Organization
                    </Typography>
                    <TextField
                        id="outlined-controlled"
                        label="Domain Name"
                        value={domainName}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setDomainName(event.target.value);
                        }}
                        sx={{marginBlock: '2rem'}}
                    />
                    <Button onClick={handleUpload}>Upload</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}