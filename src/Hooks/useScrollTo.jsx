// src/hooks/useScrollToContent.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToContent = (targetId, targetPath) => {
    const location = useLocation();

    useEffect(() => {
        // เช็คว่า Pathname ตรงกับ targetPath แล้วให้ Scroll ไปที่ #targetId
        if (location.pathname === targetPath) {
            const contentElement = document.getElementById(targetId);
            if (contentElement) {
                contentElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location, targetId, targetPath]); // ใช้ targetId และ targetPath ใน dependencies
};

export default useScrollToContent;


// การใช้งาน
// useScrollToContent("ใส่ id ของส่วนที่จะให้ Scroll ไป", "/ใส่ path ของหน้านั้น");


