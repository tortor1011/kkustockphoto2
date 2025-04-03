import { useCallback } from 'react';
import LogoCadColor from '../../assets/LogoCad_Color.png';
import CadIcon from '../../assets/Cad-Icon.png';
import LogoKKU from '../../assets/LogoKKU-Thai.png';
import './Footer.css';

function Footer() {

  const onKkuIconImageClick = useCallback(() => {
    window.open("https://www.kku.ac.th/");
  }, []);
  const onCadIconImageClick = useCallback(() => {
    window.open("https://cad.kku.ac.th/");
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">

          <div className="footer-details">
            <b className="kku-stock-photos">KKU STOCK PHOTOS</b>
            <img className="kku-logo" alt="KKU-LOGO" src={LogoCadColor} />
            <div className="footer-text">
              <p>สำนักงานอธิการบดี มหาวิทยาลัยขอนแก่น</p>
              <p>เลขที่ 123 หมู่ 16 ถนนมิตรภาพ ตำบลในเมือง อำเภอเมือง จังหวัดขอนแก่น 40002</p>
              <p>หมายเลขโทรศัพท์ 0 4320 2204 แฟกซ์ 0 4320 2469</p>
            </div>
          </div>

          <div className="logoicon">
            <img className="kku-icon" alt="kkuicon" src={LogoKKU} onClick={onKkuIconImageClick} />
            <img className="cad-icon" alt="cadicon" src={CadIcon} onClick={onCadIconImageClick} />
          </div>
          
        </div>
      </div>
      <div className="bottom-bar"></div>
    </footer>


  )
}

export default Footer;