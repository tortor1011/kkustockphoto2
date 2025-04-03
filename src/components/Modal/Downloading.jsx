import React, { useState, useEffect } from 'react';
import { Visibility, Download, CalendarMonth, Close } from "@mui/icons-material";
import './Downloading.css';

function Downloading({ isOpen, closeModal, selectedImage }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [accepted, setAccepted] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [checkedState, setCheckedState] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
    });

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            setCheckedState({
                checkbox1: false,
                checkbox2: false,
                checkbox3: false,
                checkbox4: false,
            });
            setAccepted(true);
            setSelectedTag(null);
        }
    }, [isOpen, selectedImage]);

    const handleClose = () => {
        setIsAnimating(false);
        setCheckedState({
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
        });
        setAccepted(true);
        setSelectedTag(null);
        setTimeout(() => {
            closeModal();
        }, 300);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setCheckedState((prevState) => ({
            ...prevState,
            [id]: checked,
        }));
    };

    const handleDownload = async () => {
        const isPurposeSelected = Object.values(checkedState).includes(true);
        if (!isPurposeSelected) {
            alert("กรุณาระบุวัตถุประสงค์การใช้งาน");
            return;
        }

        if (accepted) {
            setLoading(true);
            try {
                // เรียก API เพื่อดาวน์โหลดและเพิ่มจำนวนการดาวน์โหลด
                const response = await fetch(`http://localhost:3000/image/${selectedImage._id}/download`);

                if (!response.ok) {
                    throw new Error('Failed to download image');
                }

                // แปลงข้อมูลเป็น blob
                const blob = await response.blob();

                // สร้าง URL สำหรับดาวน์โหลด
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${selectedImage.title || 'image'}.jpg`;

                // ทำการดาวน์โหลด
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // ทำความสะอาด URL
                URL.revokeObjectURL(url);

                setTimeout(() => {
                    setLoading(false);
                    handleClose();
                }, 2000);
            } catch (error) {
                console.error('Error downloading image:', error);
                alert('เกิดข้อผิดพลาดในการดาวน์โหลดรูปภาพ');
                setLoading(false);
            }
        } else {
            alert("กรุณายอมรับเงื่อนไขการให้บริการ");
        }
    };

    // เพิ่มฟังก์ชันสำหรับเพิ่มจำนวนการดู
    useEffect(() => {
        const incrementViews = async () => {
            if (selectedImage && selectedImage._id) {
                try {
                    // เรียก API เพื่อเพิ่มจำนวนการดู
                    await fetch(`http://localhost:3000/image/${selectedImage._id}/thumbnail`);
                } catch (error) {
                    console.error('Error incrementing views:', error);
                }
            }
        };

        if (isOpen) {
            incrementViews();
        }
    }, [isOpen, selectedImage]);

    if (!isOpen) return null;

    return (
        <div>
            <div
                className={`modal-overlay ${isAnimating ? '' : 'closing'}`}
                onClick={handleOverlayClick}
            >
                <div className={`modal ${isAnimating ? '' : 'closing'}`}>
                    <div className="close-btn-container">
                        <Close
                            className="close-icon"
                            onClick={handleClose}
                        />
                    </div>
                    <div className='modal-container'>

                        <div className='modal-content'>
                            <div className='modal-left-container'>
                                <div className='modal-image-container'>
                                    <img
                                        src={`data:${selectedImage.thumbnail.contentType};base64,${selectedImage.thumbnail.data}`}
                                        alt="Selected"
                                        className="modal-image"
                                    />
                                </div>
                                <div className='metadata-container'>
                                    <div className='photographer-container'>
                                        <span>ภาพถ่ายโดย: </span>
                                        <a href="#">{selectedImage.photographer || 'ไม่ระบุ'}</a>
                                    </div>
                                    <div className='category-container'>
                                        <span>หมวดหมู่: </span>
                                        <a href="#">{selectedImage.album?.category?.join(', ') || 'ไม่ระบุ'}</a>
                                    </div>
                                    <div className='tags-container'>
                                        {Array.isArray(selectedImage.tags)
                                            ? selectedImage.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="tag"
                                                    onClick={() => setSelectedTag(tag)}
                                                    style={{ cursor: "pointer", color: selectedTag === tag ? "#A73B24" : "#939393" }}
                                                >
                                                    {tag}
                                                </span>
                                            ))
                                            : typeof selectedImage.tags === 'string'
                                                ? selectedImage.tags.split(',').map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="tag"
                                                        onClick={() => setSelectedTag(tag.trim())}
                                                        style={{ cursor: "pointer", color: selectedTag === tag.trim() ? "#A73B24" : "#939393" }}
                                                    >
                                                        {tag.trim()}
                                                    </span>
                                                ))
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="details-container">
                                    <span>
                                        <CalendarMonth fontSize="small" />
                                        {new Date(selectedImage.uploaded_at).toLocaleDateString('th-TH', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span><Visibility fontSize="small" /> {selectedImage.views || 0} ครั้ง</span>
                                    <span><Download fontSize="small" /> {selectedImage.downloads || 0} ครั้ง</span>
                                </div>
                            </div>

                            <div className='modal-right-container'>
                                <div className='modal-headline-container'>
                                    <div className='modal-headline'>
                                        <b className='modal-headline-text'>ต้องการดาวน์โหลดภาพ?</b>
                                    </div>

                                    <div className='modal-user-email'>
                                        <span className='modal-user-email-text'>สำหรับ </span>
                                        <span className='modal-user-email-text'>บุคคลทั่วไป</span>
                                    </div>
                                </div>
                                <div className='modal-purpose-container'>
                                    <div className='modal-purpose-headline'>
                                        <b className='modal-purpose-headline-span'>วัตถุประสงค์การใช้งาน</b>
                                        <span>*</span>
                                    </div>
                                    <div className='modal-purpose-content'>
                                        <div className='modal-purpose-content-checkbox'>
                                            <input
                                                type='checkbox'
                                                id='checkbox1'
                                                checked={checkedState.checkbox1}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor='checkbox1'>ใช้ประกอบการเรียน-การสอน</label>
                                        </div>
                                        <div className='modal-purpose-content-checkbox'>
                                            <input
                                                type='checkbox'
                                                id='checkbox2'
                                                checked={checkedState.checkbox2}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor='checkbox2'>ใช้ออกแบบกราฟิก สื่อสิ่งพิมพ์ประชาสัมพันธ์</label>
                                        </div>
                                        <div className='modal-purpose-content-checkbox'>
                                            <input
                                                type='checkbox'
                                                id='checkbox3'
                                                checked={checkedState.checkbox3}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor='checkbox3'>ใช้ประกอบข่าวเว็บไซต์ ประชาสัมพันธ์องค์กร</label>
                                        </div>
                                        <div className='modal-purpose-content-checkbox'>
                                            <input
                                                type='checkbox'
                                                id='checkbox4'
                                                checked={checkedState.checkbox4}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor='checkbox4'>ใช้เผยแพร่ประชาสัมพันธ์ ผ่านโซเชียลมีเดีย</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='modal-download-container'>
                                    <div className="terms">
                                        <input
                                            type="checkbox"
                                            id="accept-terms"
                                            checked={accepted}
                                            onChange={() => setAccepted(!accepted)}
                                        />
                                        <label htmlFor="accept-terms">ยอมรับ</label><a href="/pages/policy" target='_blank'>เงื่อนไขการให้บริการ</a>

                                    </div>

                                    <div className="modal-actions">
                                        <button onClick={handleDownload} disabled={loading}>
                                            {loading ? 'กำลังดาวน์โหลด...' : 'ดาวน์โหลดรูปภาพ'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Downloading;