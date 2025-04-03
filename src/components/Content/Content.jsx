import BrowseBy from '../Browse/Browse'
import { Link } from "react-router-dom";
import './Content.css'
import { useState, useEffect } from 'react';
import Downloading from '../Modal/Downloading';
import { getAlbums } from '../../services/albumAPI';

function Content() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [latestAlbum, setLatestAlbum] = useState(null);
    const [albumImages, setAlbumImages] = useState([]);
    const [otherAlbums, setOtherAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ดึงอัลบั้มล่าสุดจาก API
                const albumResponse = await fetch('http://localhost:3000/albums/latest-with-images');
                if (!albumResponse.ok) {
                    throw new Error('Failed to fetch albums');
                }
                const albumsData = await albumResponse.json();

                if (albumsData.latestAlbum) {
                    setLatestAlbum(albumsData.latestAlbum); // อัลบั้มล่าสุด
                    setOtherAlbums(albumsData.nextAlbums); // อัลบั้มอื่นๆ

                    // ดึงรูปภาพของอัลบั้มล่าสุด
                    setAlbumImages(albumsData.imagesFromLatestAlbum);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    const categories = [
        { title: "สภาพแวดล้อม และพื้นที่ส่วนกลาง", imageSrc: "/images/category_cover_thumbnail/01-thumbnail.jpg" },
        { title: "สิ่งอำนวยความสะดวกและการใช้ชีวิตในมหาวิทยาลัยขอนแก่น", imageSrc: "/images/category_cover_thumbnail/02-thumbnail.jpg" },
        { title: "บรรยากาศ การเรียนการสอน", imageSrc: "/images/category_cover_thumbnail/03-thumbnail.jpg" },
        { title: "การวิจัยและนวัตกรรม", imageSrc: "/images/category_cover_thumbnail/04-thumbnail.jpg" },
        { title: "เทรนด์ดิจิทัลโลกแห่งอนาคต", imageSrc: "/images/category_cover_thumbnail/05-thumbnail.jpg" },
        { title: "ผู้บริหาร", imageSrc: "/images/category_cover_thumbnail/06-thumbnail.jpg" },
        { title: "ศิลปวัฒนธรรมและศิลปสร้างสรรค์", imageSrc: "/images/category_cover_thumbnail/07-thumbnail.jpg" },
        { title: "กิจกรรมช่วยเหลือชุมชน", imageSrc: "/images/category_cover_thumbnail/08-thumbnail.jpg" },
        { title: "กิจกรรม นักศึกษานานาชาติ", imageSrc: "/images/category_cover_thumbnail/09-thumbnail.jpg" },
        { title: "พิธีปริญญาบัตร และรัฐพิธีสำคัญ", imageSrc: "/images/category_cover_thumbnail/10-thumbnail.jpg" },
        { title: "กีฬา และนันทนาการ", imageSrc: "/images/category_cover_thumbnail/11-thumbnail.jpg" },
        { title: "สภาพแวดล้อมมุมสูง", imageSrc: "/images/category_cover_thumbnail/12-thumbnail.jpg" },
        { title: "วิทยาศาสตร์และวิทยาศาสตร์สุขภาพ", imageSrc: "/images/category_cover_thumbnail/13-thumbnail.jpg" },
        { title: "คอนเสิร์ต และการแสดง", imageSrc: "/images/category_cover_thumbnail/14-thumbnail.jpg" },
        { title: "สัญลักษณ์ มหาวิทยาลัยขอนแก่น", imageSrc: "/images/category_cover_thumbnail/15-thumbnail.png" }
    ];

    return (
        <section id="content">
            <section id="content-container">

                <BrowseBy />

                <section id="news-container">
                    {/* Headline */}
                    <div className="news-latest">
                        <p className="uptext">what's</p>
                        <h1 className="title">NEWS!</h1>
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            <p>กำลังโหลดรูปภาพ...</p>
                        </div>
                    ) : latestAlbum ? (
                        <>
                            {/* ปกอัลบั้ม */}
                            <div className="news-image-cover" onClick={() => openModal({
                                _id: latestAlbum._id,
                                title: latestAlbum.album_name,
                                thumbnail: latestAlbum.album_cover,
                                photographer: 'ไม่ระบุ',
                                tags: [],
                                album: { category: latestAlbum.category || [] }
                            })}>
                                <img
                                    src={latestAlbum.album_cover}
                                    alt={latestAlbum.album_name}
                                    className="news-image"
                                />
                            </div>

                            {/* ชื่ออัลบั้ม */}
                            <div className="news-title">
                                <Link to={`results?album=${encodeURIComponent(latestAlbum.album_name)}`} className="hover-underline-animation">
                                    {latestAlbum.album_name}
                                </Link>
                            </div>

                            {/* ตัวอย่าง 5 รูป */}
                            <div className="sithan-kku-festival-parent">
                                {albumImages.map((image, index) => (
                                    <div key={index} onClick={() => openModal(image)}>
                                        <img
                                            alt={`sample-${index + 1}`}
                                            src={image.fullsize}  // แสดงรูปภาพจาก base64 ที่ได้
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* ปุ่มดูเพิ่มเติม ลิงก์ไปหน้าอัลบั้มรูป */}
                            <div className="view-more-container">
                                <div className="album-qty">จำนวน {latestAlbum.total_images} รายการ</div>
                                <Link to={`results?album=${encodeURIComponent(latestAlbum.album_name)}`} className="hover-underline-animation">ดูเพิ่มเติม →</Link>
                            </div>
                        </>
                    ) : (
                        <div className="error-container">
                            <p>ไม่พบข้อมูลอัลบั้มล่าสุด</p>
                        </div>
                    )}
                </section>

                {/* ดึง 'อัลบั้ม' ที่สร้างล่าสุด */}
                <section id="albums-container">
                    {/* Headline */}
                    <div className="albums-latest">
                        <p className="uptext">ค้นหาภาพถ่ายโดย</p>
                        <h1 className="title">ALBUMS!</h1>
                    </div>

                    {/* รายการอัลบั้ม 4 รายการล่าสุด */}
                    <div className="albums">
                        {otherAlbums.map((album, index) => (
                            <Link
                                key={index}
                                to={`results?album=${encodeURIComponent(album.album_name)}`}
                                className="the-album"
                            >
                                <div className="album-thumb">
                                    <img
                                        className="album-cover"
                                        alt={album.album_name}
                                        src={album.album_cover}
                                    />
                                </div>
                                <div className="album-about">
                                    <div className="album-qty">จำนวน {album.image_count || 0} รายการ</div>
                                    <div className="album-title">{album.album_name}</div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* ปุ่มดูเพิ่มเติม ลิงก์ไปหน้าอัลบั้มรูป */}
                    <div className="view-more-container">
                        <Link to="/results?album=all" className="hover-underline-animation">ดูเพิ่มเติม →</Link>
                    </div>
                </section>

                <section id="categories-container">
                    <div className="categories-latest">
                        <p className="uptext">ค้นหาภาพถ่ายโดย</p>
                        <h1 className="title">CATEGORIES!</h1>
                    </div>

                    <div className="categories">
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/results?category=${encodeURIComponent(category.title)}`}
                                className="the-category"
                            >
                                <div className="category-thumb">
                                    <img className="category-cover" alt="category-cover" src={category.imageSrc} />
                                </div>
                                <div className="category-about">
                                    <div className="category-title">{category.title}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </section>
        </section >
    )
}

export default Content