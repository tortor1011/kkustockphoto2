import { useMediaQuery } from '@mui/material';

// Custom Hook สำหรับตรวจสอบขนาดหน้าจอ
const useScreenSize = () => {
    const isMobile = useMediaQuery('(max-width: 600px)'); // มือถือ
    const isTablet = useMediaQuery('(min-width: 601px) and (max-width: 1024px)'); // แท็บเล็ต
    const isDesktop = useMediaQuery('(min-width: 1025px) and (max-width: 1440px)'); // เดสก์ท็อปทั่วไป
    const isUltraWide = useMediaQuery('(min-width: 1441px)'); // หน้าจอขนาดใหญ่

    return { isMobile, isTablet, isDesktop, isUltraWide };
};

export default useScreenSize;
