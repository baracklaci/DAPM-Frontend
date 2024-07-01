import { Button, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { putOperator, putResource } from '../../services/backendAPI';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';

export interface UploadButtonProps {
    orgId: string,
    repId: string,
}

const OperatorUploadButton = ({ orgId, repId }: UploadButtonProps) => {

    const dataTypes = ["eventLog", "bpmnModel", "petriNet"]

    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.append("ResourceType", "operator");
        const formEntries = Object.fromEntries(formData.entries());

        console.log('Form Data:', formEntries);

        if (formData.get('SourceCodeFile') ) {
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
                offset={60}
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
                            <FormLabel>Operator name</FormLabel>
                            <TextField name="Name" />

                            <FormLabel>Upload source code</FormLabel>
                            <input type="file" name="SourceCodeFile" />

                            <FormLabel>Upload dockerfile</FormLabel>
                            <input type="file" name="DockerfileFile" />
                        </FormControl>

                        <Button type="submit" sx={{ backgroundColor: "gray", padding: "1px", color: "black" }}>Submit</Button>
                    </form>
                </div>
            </BasePopup >
        </div >
    );
}

export default OperatorUploadButton;