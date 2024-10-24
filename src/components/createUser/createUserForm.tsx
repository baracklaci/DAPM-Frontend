/**
 * Author:
 * - Mahdi El Dirani
 * 
 * Description:
 * Add Member Form
 */
import { useFormik } from "formik";
import * as Yup from 'yup';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { useAuth } from "../../auth/authProvider";
import CardMembershipIcon from '@mui/icons-material/CardMembership';

interface CreateUserFormProps {
    setOpenAddMemberPopup: (value: boolean) => void;
}

interface SignupResponse {
    ticketId: string;
    status: number;
    message: string;
    result?: {
        succeeded: boolean;
    };
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({setOpenAddMemberPopup }) => {
    const auth = useAuth();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            name: '',
            role: 'user',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required').matches(
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    'Password must contain at least one numeric value, one special character, one uppercase letter, one lowercase letter, and at least 8 characters'
                ),
            name: Yup.string().required('Name is required'),
            role: Yup.string().required('Role is required')

        }),
        onSubmit: async (values,{ resetForm }) => {
            console.log(values)
            const error = await auth?.signupAction(values) as SignupResponse;
            console.log(error, "I am error")
            if(error?.result){
                if(error?.result?.succeeded){

                    setOpenAddMemberPopup(false)
                }
                else if(!error?.result?.succeeded){
                    console.log("usernmamm: ",error?.result)
                    alert("Username is already used")
                    resetForm()
                }
            }
            else{
                alert("Fetch error")
                resetForm()
            }
        }
    });

    return (
        <form className="flex  flex-col w-full py-1 signup" onSubmit={formik.handleSubmit}>

            <div className="flex justify-between">
                <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start mb-2">
                    <h4 className="text-sm font-bold text-[#ffffff4d] ">UserName</h4>
                    <div className="signup-input h-fit relative border-2 p-1 border-[#3b3b3b]  w-full  flex items-center sm:rounded-none rounded-md">
                        <PersonIcon className=" text-white "></PersonIcon>

                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full  h-fit pl-2  bg-transparent text-white"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                    </div>
                    {formik.touched.username && formik.errors.username ? (
                        <div className="text-red-500 text-xs text-start mt-1">{formik.errors.username}</div>
                    ) : null}
                </div>
                <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start mb-2">
                    <h4 className="text-sm font-bold text-[#ffffff4d] ">Name</h4>
                    <div className="signup-input h-fit relative border-2 p-1 border-[#3b3b3b]  w-full  flex items-center sm:rounded-none rounded-md">
                        <PersonIcon className=" text-white "></PersonIcon>

                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full  h-fit pl-2  bg-transparent text-white"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                    </div>
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-xs text-start mt-1">{formik.errors.name}</div>
                    ) : null}
                </div>
            </div>

            <div className="flex justify-between">
                <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start mb-2">
                    <h4 className="text-sm font-bold text-[#ffffff4d] ">Password</h4>
                    <div className="signup-input h-fit relative border-2 p-1 border-[#3b3b3b]  w-full  flex items-center sm:rounded-none rounded-md">
                        <PasswordIcon className=" text-white "></PasswordIcon>

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full  h-fit pl-2  bg-transparent text-white"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-xs text-start mt-1">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start mb-2">
                    <h4 className="text-sm font-bold text-[#ffffff4d] ">Role</h4>
                    <div className="signup-input h-fit relative border-2 p-1 border-[#3b3b3b]  w-full  flex items-center sm:rounded-none rounded-md">
                        <CardMembershipIcon className=" text-white "></CardMembershipIcon>

                        <select
                                // placeholder=""
                                className="w-full p-0 select priority-select  bg-[#121212] border-none focus:border-none text-white"
                                name="role"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                                aria-label="Project status">
                                {/* <option value=""></option> */}
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                    </div>
                    {formik.touched.role && formik.errors.role ? (
                        <div className="text-red-500 text-xs text-start mt-1">{formik.errors.role}</div>
                    ) : null}
                </div>
            </div>

            <div className="w-full flex items-end grow justify-self-end   justify-center mt-8">
                <button type="submit" className="text-white text-xl sm:w-fit w-full sm:px-10 p-2 px-6 bg-[#3b3b3b] border-2 border-white rounded-md">ADD</button>

            </div>
        </form>
    )
}
export default CreateUserForm;