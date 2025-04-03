import './CreateAlbum.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createAlbum } from '../../services/albumAPI';
import { fetchCategories } from '../../services/categoryAPI';

const CreateAlbum = () => {
    const [formData, setFormData] = useState({
        album_name: '',
        category: '',
        album_cover: ''
    });
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const { data } = await fetchCategories();
                setCategories(data);
                setLoadingCategories(false);
            } catch (error) {
                console.error('Failed to load categories:', error);
                setLoadingCategories(false);
            }
        };
        loadCategories();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, album_cover: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAlbum(formData);
            setSuccess('สร้างอัลบั้มสำเร็จ!');
            setError('');
            setTimeout(() => navigate('/albums'), 1500);
        } catch (err) {
            setError(err.message || 'เกิดข้อผิดพลาดในการสร้างอัลบั้ม');
            setSuccess('');
        }
    };

    return (
        <div className="album-container">
            <h2 className="album-title">สร้างอัลบั้มใหม่</h2>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="album-form">
                <div className="form-group">
                    <label>ชื่ออัลบั้ม</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.album_name}
                        onChange={(e) => setFormData({ ...formData, album_name: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>หมวดหมู่</label>
                    <select
                        className="form-control"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                    >
                        <option value="">เลือกหมวดหมู่</option>
                        {loadingCategories && (
                            <option disabled>กำลังโหลดหมวดหมู่...</option>
                        )}
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>ภาพปกอัลบั้ม</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="form-control"
                        required
                    />
                    {formData.album_cover && (
                        <img
                            src={formData.album_cover}
                            alt="Preview"
                            className="preview-image"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    สร้างอัลบั้ม
                </button>

                <Link
                    to="/albums"
                    className="btn"
                    style={{ backgroundColor: '#6b7280', color: 'white', textAlign: 'center' }}
                >
                    ย้อนกลับ
                </Link>
            </form>
        </div>
    );
};

export default CreateAlbum;