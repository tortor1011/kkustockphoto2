import './Browse.css';
import Divider from '@mui/material/Divider';

const Browse = () => {

    return (

        <div>
            <div className="browse-container">
                <div className="browse-item-container">
                    <div className="browse-item">
                        <div className="browse-label">รูปภาพล่าสุดทั้งหมด</div>
                    </div>
                    <div className="browse-item">
                        <div className="browse-label">อัลบั้มทั้งหมด</div>
                    </div>
                    <div className="browse-item">
                        <div className="browse-label">ดาวน์โหลดสูงสุด</div>
                    </div>
                    <div className="browse-item">
                        <div className="browse-label">เข้าชมสูงสุด</div>
                    </div>
                </div>
            </div>
            <Divider sx={{ width: '50%', height: 'auto', mt: 2, mb: 2, mx: 'auto' }} variant="middle" />

        </div>
    );
};

export default Browse;
