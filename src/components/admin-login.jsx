import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


export function AdminLogin() {

    const [cookies,setCookies,removeCookie]=useCookies(['userid']);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit:(admin)=>{
            axios.get(`http://127.0.0.1:5000/admin`)
            .then(response=>{
                var user=response.data.find(item=> item.UserId===admin.UserId)
                if(user){
                    if(user.Password.trim()===admin.Password){
                        setCookies('username',user.UserName);
                        navigate('/admin-dash')
                        alert('Login Successfull');

                    }else{
                        alert('Invalid Password')
                    }
                }else{
                    alert('Invalid UserID')
                }
            })
    },
});
    return (
        

        <div style={{
            backgroundImage: "url('/admin-login.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className='card p-4' style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <h1 className="text-center  text-bg-dark">Admin Login</h1>
                <p className="text-center" style={{ color: '#121212', fontWeight: "bold" }}>Login to manage the video library</p>
                <form  onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-bg-dark">Admin User Login</label>
                        <input type="text" name="UserId" onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label  text-bg-dark">Password</label>
                        <input type="password" name="Password" onChange={formik.handleChange} className="form-control" />
                    </div>
                    <button style={buttonStyle} type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
}

const buttonStyle = {
    background: 'linear-gradient(45deg, #ff6b6b, #f06595)',
    border: 'none',
    borderRadius: '30px',
    padding: '10px 20px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textDecoration: 'none',
    margin: '10px 0'
};

