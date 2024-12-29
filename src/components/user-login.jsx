import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export function UserLogin(){

        const [cookies,setCookies,removeCookie]=useCookies(['username']);
        let navigate=useNavigate();

        const formik=useFormik({
            initialValues:{
                UserName:'',
                Password:''
            },
            onSubmit:(user)=>{
                axios.get(`http://127.0.0.1:5000/users`)
                .then(response=>{
                    var result=response.data.find(item=>item.UserName===user.UserName)
                    if(result){
                        if(user.Password===result.Password){
                            setCookies('username',user.UserName);
                            navigate('/user-dash');
                            alert('Login Successfull');
                        }else{
                            alert('Password is incorrect');
                        }
                    }
                    else{
                        alert('User not found');
                    }


                })
            }
               
        });

    return(
        <div style={{
            backgroundImage: "url('/user-login.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className='card p-4' style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <h1 data-testid="title" className="text-center  text-bg-dark">User Login</h1>
                <p className="text-center" style={{ color: '#121212', fontWeight: "bold" }}>Login to manage the video library</p>
                <form onSubmit={formik.handleSubmit}  >
                    <div className="mb-3">
                        <label className="form-label text-bg-dark"> User Login</label>
                        <input type="text" onChange={formik.handleChange} name="UserName" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label  text-bg-dark">Password</label>
                        <input type="password" onChange={formik.handleChange} name="Password" className="form-control" />
                    </div>
                    <button style={buttonStyle} type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <Link to="/user-register">New User Register</Link>
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

}