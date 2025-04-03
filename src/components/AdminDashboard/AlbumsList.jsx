import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAlbums } from '../../services/albumAPI';
import './AlbumsList.css';

const AlbumsList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const data = await getAlbums();
                setAlbums(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch albums:', error);
                setLoading(false);
            }
        };
        fetchAlbums();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="albums-container">
            <div className="albums-header">
                <h1 className="albums-title">อัลบั้มทั้งหมด</h1>
                <Link
                    to="/create-album"
                    className="btn btn-primary"
                >
                    สร้างอัลบั้มใหม่
                </Link>
            </div>

            <div className="albums-grid">
                {albums.map((album) => (
                    <div key={album._id} className="album-card">
                        <img
                            src={album.album_cover}
                            alt={album.album_name}
                            className="album-cover"
                        />
                        <div className="album-body">
                            <h3 className="album-name">{album.album_name}</h3>
                            <p className="album-category">
                                หมวดหมู่: {album.category?.name || 'ไม่มีหมวดหมู่'}
                            </p>
                            <p className="album-date">
                                สร้างเมื่อ: {new Date(album.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumsList;