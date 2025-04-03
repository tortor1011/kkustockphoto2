import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BackTop from '../components/back-top/back-top';
import './Policy.css';

function Policy() {
    return (
        <section id="main-layout">
            <Header />
            <section id="policy-hero-section">
                <div className="policy-hero-section-container">
                    <h1>นโยบายการให้บริการฐานข้อมูลภาพถ่าย
                        มหาวิทยาลัยขอนแก่น</h1>
                </div>
            </section>
            <section id="policy-container">
                <img className="page" alt="" src="/assets/policy01.jpg" />
                <img className="page" alt="" src="/assets/policy02.jpg" />
                <img className="page" alt="" src="/assets/policy03.jpg" />
            </section>
            <BackTop />
            <Footer />
        </section>
    )
}

export default Policy;
