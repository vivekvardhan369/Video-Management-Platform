import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";

// Define the validation schema using yup
const validationSchema = yup.object({
    UserName: yup.string().required("User Name is required"),
    Password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    Email: yup.string().email("Invalid email format").required("Email is required"),
    Mobile: yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits").required("Mobile number is required")
});

// Function to fetch user data
const fetchUserData = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/users`);
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the user data!', error);
        return [];
    }
};

export function UserRegister() {
    const [status, setStatus] = useState('');
    const [errorClass, setErrorClass] = useState('');
    const [userData, setUserData] = useState([]);
    let navigate = useNavigate();

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData().then(data => setUserData(data));
    }, []);

    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: '',
            Email: '',
            Mobile: ''
        },
        validationSchema: validationSchema,
        onSubmit: (user) => {
            axios.post(`http://127.0.0.1:5000/register-user`, user)
                .then(() => {
                    alert('Registered Successfully...');
                    navigate('/user-login');
                })
                .catch(error => {
                    console.error('There was an error registering the user!', error);
                });
        }
    });

    function VerifyUser(e) {
        const value = e.target.value;
        if (value.trim() === '') {
            setStatus('');
            setErrorClass('');
            return;
        }

        const user = userData.find(item => item.UserName === value);
        if (user) {
            setStatus('User Name already exists');
            setErrorClass('text-danger');
        } else {
            setStatus('User Id Available');
            setErrorClass('text-success');
        }
    }

    return (
        <div>
            <h2>User Register</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Name</dt>
                    <dd>
                        <input type="text" onChange={formik.handleChange} onBlur={VerifyUser} name="UserName" value={formik.values.UserName} />
                        {formik.touched.UserName && formik.errors.UserName ? <div className='text-danger'>{formik.errors.UserName}</div> : null}
                        <div className={errorClass}>{status}</div>
                    </dd>
                    <dt>Password</dt>
                    <dd>
                        <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="Password" value={formik.values.Password} />
                        {formik.touched.Password && formik.errors.Password ? <div className="text-danger">{formik.errors.Password}</div> : null}
                    </dd>
                    <dt>Mobile</dt>
                    <dd>
                        <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="Mobile" value={formik.values.Mobile} />
                        {formik.touched.Mobile && formik.errors.Mobile ? <div className="text-danger">{formik.errors.Mobile}</div> : null}
                    </dd>
                    <dt>Email</dt>
                    <dd>
                        <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="Email" value={formik.values.Email} />
                        {formik.touched.Email && formik.errors.Email ? <div className="text-danger">{formik.errors.Email}</div> : null}
                    </dd>
                </dl>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <Link to="/user-login">Existing User?</Link>
        </div>
    );
}