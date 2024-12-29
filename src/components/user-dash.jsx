import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import store from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addToSaveList } from "../slicers/video-slicer";
import { SavedVideos } from "./SavedVideos";

export function UserDashboard() {
    const [cookies, setCookies, removeCookie] = useCookies(['username']);
    const navigate = useNavigate();
    const videosCount = useSelector((state) => state.videos.videosCount);


    const [videos, setVideos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showSavedVideos, setShowSavedVideos] = useState(false);

    const dispatch = useDispatch();

    function LoadVideos() {
        axios.get('http://127.0.0.1:5000/videos')
            .then(response => {
                setVideos(response.data);
            });
    }

    function LoadCategories() {
        axios.get('http://127.0.0.1:5000/categories')
            .then(response => {
                setCategories(response.data);
            });
    }
    


    useEffect(() => {
        LoadVideos();
        LoadCategories();
    }, [videosCount]);

    function handleSignout() {
        removeCookie('username');
        alert('Signout Successful');
        navigate('/');
    }

    const filteredVideos = videos.filter(video => {
        return (
            (selectedCategory === '' || video.CategoryId === parseInt(selectedCategory)) &&
            (searchTerm === '' || video.Title.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    function handleSaveClick(video){
        alert('Video saved to your list');
        dispatch(addToSaveList(video))
    }

    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <div className="col-md-3">
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilters" aria-controls="offcanvasFilters">
                        Filters
                    </button>
                </div>
                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="text-center flex-grow-1">User Dashboard</h2>
                        <div className="d-flex align-items-center">
                            <button className="btn bi bi-clock-history"  onClick={() => setShowSavedVideos(!showSavedVideos)} > [{videosCount}]</button>
                            <span className="me-3 fw-bold">Hello, {cookies['username']}!</span>
                            <button onClick={handleSignout} className="btn btn-danger">Signout</button>
                        </div>
                    </div>
            </div>
                    <div className="my-3 d-flex flex-wrap">
                        {showSavedVideos ? (
                                <SavedVideos />
                            ) : (
                            filteredVideos.map(video => (
                                <div key={video.VideoId} className="card m-4 p-2" style={{width:'340px'}}>
                                    <iframe src={video.Url} width="100%" height="300" title={video.Title}></iframe>
                                    <div className="card-header">
                                        <h6>{video.Title}</h6>
                                    </div>
                                    <div className="card-footer">
                                        <span className="mx-2">{video.Likes} <i className="bi bi-hand-thumbs-up"></i></span>
                                        <span className="mx-2">{video.Dislikes} <i className="bi bi-hand-thumbs-down"></i></span>
                                        <span className="mx-2">{video.Views} <i className="bi bi-eye"></i></span>
                                        <span><button onClick={()=> handleSaveClick(video)} className="mx-2 btn bi bi-bookmark"> Save</button></span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasFilters" aria-labelledby="offcanvasFiltersLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasFiltersLabel">Filters</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="mb-3">
                        <label htmlFor="categoryFilter" className="form-label">Category</label>
                        <select id="categoryFilter" className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="searchFilter" className="form-label">Search</label>
                        <input
                            type="text"
                            id="searchFilter"
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by title"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}