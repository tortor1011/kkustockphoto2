import SearchBox from '../SearchBox/Search'
import './HeroSection.css'
import useScreenSize from '../../Hooks/Responsive';
import { Box } from '@mui/material';

function HeroSection() {

    // ตรวจสอบขนาดหน้าจอ
    const { isMobile, isTablet, isDesktop, isUltraWide } = useScreenSize();

    // กำหนดขนาดของกล่องค้นหาตามอุปกรณ์
    let textWidth;
    if (isMobile) {
        textWidth = '60%';
    } else if (isTablet) {
        textWidth = '60%';
    } else if (isDesktop) {
        textWidth = '800px';
    } else if (isUltraWide) {
        textWidth = '800px';
    }

    return (

        <section className="hero-section">
            {/* <img src="/assets/mainlogo.png" alt="hero-logo" className="hero-image" /> */}
            <div className="hero-text-container">
                <Box sx={{ lineHeight: 1, width: textWidth }}>
                    <div className="top-text">
                        คลังภาพถ่าย
                    </div>
                    <div className="bottom-text">
                        มหาวิทยาลัยขอนแก่น
                    </div>
                </Box>
                <SearchBox />
            </div>

        </section>

    )
}

export default HeroSection;