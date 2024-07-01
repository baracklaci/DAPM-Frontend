import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { PostNewPeer } from "../../services/backendAPI";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';

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
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

    const [domainName, setDomainName] = React.useState('');

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const handleSubmit = () => {
        PostNewPeer(domainName)
    }

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
            <Button sx={{ backgroundColor: "gray", padding: "1px", color: "black" }} onClick={handleClick}>+</Button>
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                { <Box sx={style}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color: 'white'}}>
                        Add Organization
                    </Typography>
                    <TextField
                        id="outlined-controlled"
                        label="Domain Name"
                        value={domainName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDomainName(event.target.value);
                        }}
                        sx={{marginBlock: '2rem'}}
                    />
                    <Button onClick={handleUpload}>Upload</Button>
                    </Box>
                </Box> } 
            </Modal>
                */}
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
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'white' }}>
                            Add Organization
                        </Typography>
                        <TextField
                            id="outlined-controlled"
                            label="Domain Name"
                            value={domainName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setDomainName(event.target.value);
                            }}
                            sx={{ marginBlock: '2rem' }}
                        />
                        <Button onClick={handleSubmit}>Upload</Button>
                    </Box>
                </div>
            </BasePopup >
        </div>
    );
}