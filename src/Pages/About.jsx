import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BackTop from '../components/back-top/back-top';
import Divider from '@mui/material/Divider';
import './About.css';

function About() {
    return (
        <section id="main-layout">
            <Header />
            <section id="about-hero-section">
                <div className="about-hero-section-container">
                    <h1>เกี่ยวกับ</h1>
                </div>
            </section>
            <section id="about-container">
                <div className="about-description">
                    <div className="logo-icon-container">
                        {/* <img className="logo-icon" alt="logo" src="/assets/camera-logo-black.png" /> */}
                    </div>
                    <div className="description-container">
                        <div className="description-headline">
                            <span>คลังภาพถ่าย มหาวิทยาลัยขอนแก่น (KKU Stock Photos)</span>
                        </div>
                        <div className="description-text">
                            <p>เป็นบริการภาพถ่าย ที่ให้บริการโดย งานกิจกรรมสัมพันธ์ กองสื่อสารองค์กร มหาวิทยาลัยขอนแก่น </p>
                            <p>ได้รับอนุญาตเพื่อนำไปใช้ในการประกอบข่าว ภาพส่งสื่อมวลชน และนำมาใช้ในการออกแบบสื่อกราฟิก ต่าง ๆ</p>
                            <p>โดยมีเงื่อนไขการใช้รูปภาพตาม<a href='/policy' target='_blank'>ระเบียบมหาวิทยาลัยขอนแก่นว่าด้วยการดำเนินการด้านลิขสิทธิ์ พ.ศ. ๒๕๖๒</a></p>
                        </div>
                    </div>
                </div>
                <div className="director-container">
                    <div className="director-text">
                        <div className='director-text-headline'>
                            <span>ผู้อำนวยการกองสื่อสารองค์กร</span>
                            <span>มหาวิทยาลัยขอนแก่น</span>
                        </div>
                    </div>
                    <div className="director-profile-container">
                        <img className="director-profile" alt="Chumporn_Para" src="/assets/Chumporn_Para-profile.png" />
                    </div>
                    <div className="director-text">
                        <div>
                            <span className='director-firstname'>ชุมพร</span>
                        </div>
                        <div>
                            <span className='director-lastname'>พารา</span>
                        </div>
                        <div className='director-contact-container'>
                            <div>
                                <span className='director-position'>นักประชาสัมพันธ์ ชำนาญการ</span>
                            </div>
                            <div>
                                <span className='director-email'>chupar@kku.ac.th</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider sx={{ width: '50%', height: 'auto', borderBottomWidth: '2px', borderColor: '#B5B5B5', mt: 5, mb: 5, mx: 'auto' }} variant="middle" />
                <div className="team-profile-container">
                    <div className="team-profile-content">
                        <div className="team-profile-title">ทีมดำเนินโครงการการพัฒนาแพลตฟอร์มดิจิทัลสำหรับให้บริการภาพ
                            กองสื่อสารองค์กร มหาวิทยาลัยขอนแก่น (KKU Stock Photos)
                        </div>
                        <img className="team-profile" alt="the-clique-team" src="/assets/team-profile.png" />
                        <div className="about-details-container">
                            <div className="details">
                                <div className="istudent48-container">
                                    <p>นักศึกษารหัส 65 หลักสูตรสารสนเทศศาสตรบัณฑิต สาขาวิชาสารสนเทศศาสตร์</p>
                                    <p>คณะมนุษยศาสตร์และสังคมศาสตร์ มหาวิทยาลัยขอนแก่น</p>
                                    <p>(iStudent48, BiS Program, iSchool KKU)</p>
                                </div>
                                <div className="capstone-container">
                                    <p>เว็บไซต์นี้เป็นส่วนหนึ่งของการทำโครงการบูรณาการความรู้กับการปฏิบัติ (Capstone Project)</p>
                                    <p>ในชุดวิชา HS212106 การบริการแบบดิจิทัล (Digital Service : DS)</p>
                                    <p>และชุดวิชา HS212204 การสร้างสรรค์เนื้อหาดิจิทัล (Digital Creation Content : DCC) ปีการศึกษา 2567</p>
                                </div>
                                <div className="ischoolkku-container">
                                    <img alt="ischool-logo" src="/assets/ischoolkku-logo.png" />
                                    <div className="bis-program-container">
                                        <p>หลักสูตรสารสนเทศศาสตรบัณฑิต สาขาวิชาสารสนเทศศาสตร์</p>
                                        <p>คณะมนุษยศาสตร์และสังคมศาสตร์ มหาวิทยาลัยขอนแก่น (BiS Program, iSchool KKU)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <BackTop />
            <Footer />
        </section >
    )
}

export default About;