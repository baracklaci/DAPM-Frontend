import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
  import classNames from 'classnames';
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

import RadioGroup from "@mui/material/RadioGroup";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { queryAccount } from '../services/user'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: String;
}

interface StyledTabProps {
    label: string;
}

const AntTab = styled((props: StyledTabProps) => (<Tab {...props} />))(({ theme }) => ({
    color: '#fff',
    "&.Mui-selected" : {
        background: '#3b3b3b',
    }
}))

const TabPanel = styled((props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    const TabPanelClass = classNames(other.className, {
        hidden: value !== index
    })

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        className={TabPanelClass}
      >
        {value === index && (
          <Box sx={{ p: 3, width: '80%' }}>
            <Typography component={"div"} sx={{width: '100%'}}>{children}</Typography>
          </Box>
        )}
      </div>
    );
})(({theme}) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '&.hidden': {
        display: 'none',
    }
}))

const ActionItems = ({record: { row }, ...props}: any) => {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState('');
    const [item, setItem] = React.useState({})

    return (
        <React.Fragment>
            <Button variant="outlined" size="small" startIcon={<PrintIcon />} onClick={() => {
                setOpen(true)
                setItem(row)
                setType('role')
            }}>change role</Button>
            <Button variant="outlined" size="small" startIcon={<PrintIcon />} onClick={() => {
                setItem(row)
                setOpen(true)
                setType('permission')
            }}>give permission</Button>
            <CustomDialog open={open} type={type} item={item}
                openCallBack={(state: any) => setOpen(state)}
                typeCallBack={(type: any) => setType(type)} 
                itemCallBack={(item: any) => setItem(item)} 
            />
        </React.Fragment>
    )
}

const CustomDialog = (props: any) => {
    
    const validateForm = (values: any) => {
        const errors: any = {};
        if (!values.lastName) {
            errors.lastName = 'Required';
        }
        if (!values.firstName) {
            errors.firstName = 'Required';
        }
        return errors;
    }

    // 点击提交
    const handleSubmit = (value: any) => {
        console.log('handleSubmit', value);
    }

    return (
        <Dialog
            open={props.open}
            onClose={() => props.openCallBack(false)}
        >
            <DialogTitle>{props.type === 'role' ? 'change role' : 'give permission'}</DialogTitle>
            <DialogContent>
                <Box sx={{ width: 400, background: '#20242a', padding: 2}}>
                    <Formik initialValues={{ ...props.item }}
                        validate={validateForm}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            {
                                props.type === 'role' ? 
                                <Field
                                    as={TextField}
                                    size="small"
                                    fullWidth
                                    name="firstName"
                                    label="firstName"
                                    id="firstName"
                                    sx={{mt: 2}}
                                    helperText={<ErrorMessage name="firstName" >{(msg: String) => <span style={{color: "red"}}>{msg}</span>}</ErrorMessage>}
                                />
                                : (
                                    <React.Fragment>
        
                                        <Field name="color" row as={RadioGroup}> 
                                            <FormControlLabel value="repository（all）" control={<Radio />} label="repository（all）" />
                                            <FormControlLabel value="repository（create）" control={<Radio />} label="repository（create）" />
                                            <FormControlLabel value="repository（read）" control={<Radio />} label="repository（read）" />
                                            <FormControlLabel value="resource（read）" control={<Radio />} label="resource（read）" />
                                            <FormControlLabel value="resource（download）" control={<Radio />} label="resource（download）" />
                                        </Field>       
                                        <Field
                                            as={TextField}
                                            size="small"
                                            fullWidth
                                            id="RoleName"
                                            label="RoleName"
                                            name="RoleName"
                                            sx={{mt: 2}}
                                            helperText={<ErrorMessage name="RoleName">{(msg: String) => <span style={{color: 'red'}}>{msg}</span>}</ErrorMessage>}
                                        /> 
                                    </React.Fragment>)
                            }
                        
                            <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
                                <Button onClick={() => {
                                    props.openCallBack(false)
                                    props.itemCallBack({})
                                }}>Cancel</Button>
                                <Button
                                    type={'submit'}
                                    color="warning"
                                    autoFocus
                                >
                                    Confirm
                                </Button>
                            </Box>
                        </Form>
                    </Formik>
                </Box>
            </DialogContent>
        </Dialog>
    )
}


const Account = () => {

    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [list, setList] = useState([]);

    useEffect(() => {

    const Token = sessionStorage.getItem('Token');
        if (Token) {
            queryData({token: Token});
        }

    }, [])

    const queryData = async (data: any) => {
        const res = await queryAccount(data);


        if (res.code === 200) {
            setList(res.data.map((item: any) => ({...item, id: item.Id})))
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    /**
     {
    "Id": "a683cd68-6135-4d18-aa38-842df36c9840",
    "UserName": "yao",
    "Password": "25d55ad283aa400af464c76d713c07ad",
    "Status": 1,
    "CreateTime": "2024-07-22T22:35:27.000773",
    "LastLoginTime": null,
    "GroupID": null,
    "OrganizationID": null,
    "RoleName": "visitor",
    "permission_repositoryID": null,
    "permission_repository_createID": null,
    "permission_repository_readID": null,
    "permission_resource_readID": null,
    "permission_resource_downloadID": null
}
     */

    const columns: GridColDef[] = [
        // { field: 'Id', width: 300, headerName: 'ID' },
        { field: 'UserName', width: 200, headerName: 'User Name' },
        { field: 'RoleName', width: 200, headerName: 'Role' },
        {
            field: 'actions',
            type: 'actions',
            width: 400,
            getActions: (params: any) => [
                <ActionItems 
                    variant="outlined" 
                    size="small" 
                    record={params}
                />
            ],
        },
    ];
    
    const initialRows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    
    return (
        <div style={{padding: 0, height: '100vh', display: 'flex', flex: '1'}}>
            <Button variant="outlined" size={"small"} sx={{position: "fixed", left: 30, top: 30}} startIcon={<ArrowBackIcon/>} onClick={() => navigate("/")}>Back</Button>
            <Box sx={{ bgcolor: 'background.paper', display: 'flex' }}>
                {/* <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" sx={{color: '#fff'}}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Drafts" sx={{color: '#fff'}}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav> */}
            
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    sx={{ pt: '100px', width: 200 }}
                >
                    <AntTab label="Item One" />
                    <AntTab label="Item Two" />
                </Tabs>
            </Box>
            <Box sx={{m: '20px', mt: "30px", display: 'flex', flex: '1', bgcolor: '#121212' }}>
                <TabPanel value={value} index={0}>
                    <DataGrid rows={list} columns={columns} sx={{width: '100%'}}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DataGrid rows={list} columns={columns} />
                </TabPanel>
            </Box>
        </div>
    )
}
export default Account;