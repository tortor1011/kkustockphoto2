import { useEffect, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './back-top.css';

export default function BackTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div id="back-top" className={visible ? 'show' : 'hide'}>
            <div className="back-to-top" onClick={scrollToTop}>
                <ExpandLessIcon fontSize="medium" />
            </div>
        </div>
    );
}
