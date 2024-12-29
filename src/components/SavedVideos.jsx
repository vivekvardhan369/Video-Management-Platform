import React from 'react';
import { useSelector } from 'react-redux';

export function SavedVideos() {
    const savedVideos = useSelector((state) => state.videos.videos);

    return (
        <div className="my-3">
            <h3 className='text-center'>Saved Videos</h3>
            {savedVideos.length > 0 ? (
                <div className="row justify-content-center">
                    {savedVideos.map(video => (
                        <div key={video.VideoId} className="card m-2 p-2 col-md-4" style={{width:'340px'}}>
                            <iframe src={video.Url} width="100%" height="300" title={video.Title}></iframe>
                            <div className="card-header">
                                <h6>{video.Title}</h6>
                            </div>
                            <div className="card-footer">
                                <span className="mx-2">{video.Likes} <i className="bi bi-hand-thumbs-up"></i></span>
                                <span className="mx-2">{video.Dislikes} <i className="bi bi-hand-thumbs-down"></i></span>
                                <span className="mx-2">{video.Views} <i className="bi bi-eye"></i></span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p>No videos saved</p>
                </div>
            )}
        </div>
    );
}