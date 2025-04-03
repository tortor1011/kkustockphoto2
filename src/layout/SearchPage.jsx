import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BackTop from '../components/back-top/back-top';
import SearchBox from '../components/SearchBox/Search';
import './SearchPage.css';
import BrowseBy from '../components/Browse/Browse';
import Downloading from '../components/Modal/Downloading';


function SearchPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };


    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('api/images', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched images:', data);
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
                setError(error.message || 'Failed to fetch images');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <section id="main-layout">
            <Header />
            <section id="search-page-hero-section">
                <SearchBox />
            </section>
            <section id="search-page-content">
                <section id="search-page-content-container">
                    <BrowseBy />

                    {loading ? (
                        <div className="loading-container">
                            <p>กำลังโหลดรูปภาพ...</p>
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <p>เกิดข้อผิดพลาดในการโหลดรูปภาพ: {error}</p>
                            <button onClick={() => window.location.reload()}>
                                ลองใหม่อีกครั้ง
                            </button>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="no-results-container">
                            <p>ไม่พบรูปภาพ</p>
                        </div>
                    ) : (
                        <div className="results">
                            {images.map((image, index) => {
                                const imageSrc = `http://localhost:3000/image/${image._id}/thumbnail`;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => openModal(image)}
                                    >
                                        <img
                                            className="thumbnail"
                                            loading="lazy"
                                            crossOrigin="anonymous"
                                            src={imageSrc}
                                            alt={image.title}
                                            onError={(e) => {
                                                console.error('Error loading image:', e.target.src);
                                                e.target.src = 'uploads/';
                                                e.target.alt = 'ไม่สามารถโหลดรูปภาพได้';
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </section>
            </section>

            <Downloading
                isOpen={modalOpen}
                closeModal={() => setModalOpen(false)}
                selectedImage={selectedImage}
            />

            <BackTop />
            <Footer />
        </section>
    );
}

export default SearchPage;