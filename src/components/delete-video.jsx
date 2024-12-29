import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function DeleteVideo(){

    let params=useParams();
    let navigate=useNavigate()

    const[videos,setVideos]=useState([{VideoId:1,Title:'',Url:'',Likes:0,Dislikes:0,Views:0,CategoryId:0}])

    function LoadVideos(){
        axios.get(`http://127.0.0.1:5000/video/${params.id}`)
        .then(response=>{
            setVideos(response.data)
        })
    }

    useEffect(()=>{
        LoadVideos();
    },[])

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:5000/delete-video/${params.id}`)
        .then(()=>{
            alert('Video Deleted Successfully')
            navigate('/admin-dash')
        })
    }
            

    return(
        <div className="container-fluid">
            <h2>Delete Video</h2>
            <div className="card w-50">
                <div className="card-header">
                    <h4>{videos[0].Title}</h4>
                </div>
                <div className="card-body">
                    <iframe src={videos[0].Url} width="100%" height="300"></iframe>
                </div>
                <div className="card-footer text-center">
                    <button onClick={handleDeleteClick} className="btn btn-danger me-2">Yes</button>
                    <Link className="btn btn-warning" to="/admin-dash"> Cancle</Link>
                </div>

                
            </div>
        </div>
    )
}