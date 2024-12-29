import { Link } from "react-router-dom";

export default function VideoLibraryIndex(){
    return(
        <div style={{
            backgroundImage: 'url(cover-img.png)',
            backgroundSize: 'cover',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1 style={{color:'#e60e23'}}>Welcome to the Video Library</h1>
            <p style={{color:'#121212',fontWeight:"bold"}}>Explore a wide range of videos and manage your library with ease.</p>
            <div>
                <Link to='/user-login'  className="btn btn-primary" style={buttonStyle}>User Login</Link>
                <Link to='/admin-login' className="btn btn-warning ms-2" style={buttonStyle}>Admin Login</Link>
            </div>
        </div>
    )
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
    margin: '10px'
};

buttonStyle[':hover'] = {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
};