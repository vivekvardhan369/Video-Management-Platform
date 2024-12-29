import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export function AdminDashboard(){

    const [videos,setVideos]=useState([{VideoId:1,Title:'',Url:'',Likes:0,Dislikes:0,Views:0,CategoryId:0}])
    const [cookies, setCookies,removeCookie] = useCookies(['userid']);
    const navigate = useNavigate();

    function LoadVideos(){
        axios.get('http://127.0.0.1:5000/videos')
        .then(response=>{
            setVideos(response.data)
        }) 
    }

    useEffect(()=>{
        LoadVideos();
    },[])

    function handleSignout(){
        removeCookie('userid');
        alert('Signout Successfull');
        navigate('/')
    }


    return(
        <div className='mt-2'>
            <h3 className="d-flex justify-content-between">Admin Dashboard
            <span>{cookies['userid']}</span>
            <button onClick={handleSignout} className="btn btn-danger">Signout</button>
            </h3>

            <div>
                <Link to="/add-video" className='my-2 btn btn-primary bi bi-camera-video'> Add Video</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            videos.map(videos=>
                                <tr key={videos.VideoId}>
                                    <td>{videos.Title}</td>
                                    <td>
                                        <iframe src={videos.Url} width="200" height="100" ></iframe>
                                    </td>
                                    <td>
                                        <Link to={`/edit-video/${videos.VideoId}`} className="btn btn-warning bi bi-pen"></Link>
                                        <Link to={`/delete-video/${videos.VideoId}`} className="mx-2 btn btn-danger bi bi-trash"></Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}