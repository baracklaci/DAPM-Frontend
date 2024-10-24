/**
 * Author:
 * - Hussein Dirani
 * 
 * Description:
 * Login Form
 */
import { useFormik } from "formik";
import * as Yup from 'yup';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { useAuth } from "../../auth/authProvider";
export default function LoginForm() {
    const auth=useAuth();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')

        }),
        onSubmit: async (values, { resetForm }) => {
            auth?.loginAction(values)
            resetForm()
        }
    });

    return (
        <form className="sm:h-[90%]  h-[65%]  signup flex  flex-col w-full py-6" onSubmit={formik.handleSubmit}>

            <div className="signup-input h-fit relative border-2 p-1 border-[#3b3b3b]  w-full sm:mt-6 mt-10 flex items-center sm:rounded-none rounded-md">
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

            <div className="signup-input h-fit relative border-2 p-1 border-[#3b3b3b]  w-full sm:mt-6 mt-10 flex items-center sm:rounded-none rounded-md">
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

             <div className="w-full flex items-end grow justify-self-end   justify-center mt-6">
                <button type="submit" className="text-white text-xl sm:w-fit w-full sm:px-10 p-2 px-6 bg-[#3b3b3b] border-2 border-white rounded-md">Login</button>

            </div>
        </form>
    )
}