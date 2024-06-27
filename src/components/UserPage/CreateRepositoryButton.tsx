import { Button, FormControl, FormLabel, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { putRepository } from '../../services/backendAPI';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';


export interface CreateRepositoryButtonProps {
    orgId: string,
}

const CreateRepositoryButton = ({ orgId }: CreateRepositoryButtonProps) => {

    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const repositoryName = formData.get("Name") as string

        if (repositoryName) {
            try {
                const result = await putRepository(orgId, repositoryName);
                console.log('repository successfully created:', result);
            } catch (error) {
                console.error('Error creating repository:', error);
            }
        } else {
            console.error('No repository name given.');
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
                            <FormLabel>Repository name</FormLabel>
                            <TextField name="Name" />
                        </FormControl>

                        <Button type="submit" sx={{ backgroundColor: "gray", padding: "1px", color: "black" }}>Submit</Button>
                    </form>
                </div>
            </BasePopup >
        </div >
    );
}

export default CreateRepositoryButton;
