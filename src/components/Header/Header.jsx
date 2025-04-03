import { Button, Drawer, List, ListItem, ListItemText, ThemeProvider, createTheme, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoKKU from '/assets/LogoKKU-Thai.png';
import newIcon from '/assets/the-camera-logo-white.png';

import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Header() {
  // ในส่วนของ Component
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { user, handleLogout } = useContext(AuthContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const PromptTheme = createTheme({
    typography: {
      fontFamily: 'Prompt',
    },
  });


  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="/" className="logo-container">
          <img src={newIcon} alt="Logo" className="logo-white" />

        </a>
        <div className="navbar-container">

          <nav className="navbar">
            <ul>
              <li><Link to="/">หน้าหลัก</Link></li>
              <li><Link to="/about">เกี่ยวกับ</Link></li>
              <li><Link to="/policy">เงื่อนไขการให้บริการ</Link></li>
            </ul>
          </nav>
          {user ? (
            <div className="user-menu-container">
              <IconButton
                onClick={handleMenuOpen}
                className="user-icon-button"
                aria-controls="user-menu"
                aria-haspopup="true"
              >
                <Avatar
                  src={user.profileImage || LogoKKU}
                  className="user-avatar"
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgba(167, 59, 36, 0.3)'
                    },
                    backgroundColor: '#f5f5f5',
                    '& img': {
                      objectFit: 'contain' // ปรับให้โลโก้พอดีไม่ถูก crop

                    }
                  }}
                />
              </IconButton>

              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className="user-dropdown"
                // กำหนดตำแหน่งเมนูไม่ให้ชนขอบ
                anchorOrigin={{
                  vertical: 'bottom', // จัดตำแหน่งเริ่มต้นที่ด้านล่างของ icon
                  horizontal: 'right', // จัดตำแหน่งเริ่มต้นที่ด้านขวาของ icon
                }}
                transformOrigin={{
                  vertical: 'top', // เมนูเปิดไปด้านบน
                  horizontal: 'right', // เมนูเปิดไปทางขวา
                }}
                // อนุญาตให้เลื่อนหน้าเว็บได้
                disableScrollLock={true} // 🔥 อนุญาตให้สครอลล์หน้าเว็บ

                PaperProps={{
                  style: {
                    width: '250px',
                    padding: '16px',
                    margin: '18px 0px'
                  }
                }}
              >
                <div className="user-info">
                  <h3 className="user-name">{user.firstname} {user.lastname}</h3>
                  <p className="user-email">{user.email}</p>
                  <p className="user-role">ประเภทผู้ใช้: {user.role.role}</p>
                </div>

                <MenuItem
                  onClick={handleLogout}
                  className="logout-menu-item"
                >
                  ออกจากระบบ
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="auth-buttons">
              <Button
                component={Link}
                to="/login"
                className="login-btn"
                startIcon={<img src={LogoKKU} alt="KKU Logo" className="login-icon" />}
              >
                <span className="login-text">KKU Login</span>
              </Button>
              {/* <Link to="/register" className="register-link">Register</Link> */}
            </div>
          )}
        </div>

      </div>

      {/* Hamburger Menu */}
      <Button onClick={() => toggleDrawer(true)} className="hamburger-button">
        <MenuIcon style={{ fontSize: 36, color: 'white' }} />
      </Button>

      {/* Drawer Component for Mobile */}
      <ThemeProvider theme={PromptTheme}>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
          className="drawer-list"
          sx={{
            fontFamily: 'Prompt',
            '& .MuiDrawer-paper': {
              width: '200px',
              backgroundColor: '#fff',
              padding: '20px',
              boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <List>
            <ListItem button sx={{ '&:hover': { backgroundColor: '#f0f0f0' }, borderRadius: '8px' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <ListItemText primary="หน้าหลัก" sx={{ fontSize: '18px', fontWeight: 600, color: '#000' }} />
              </Link>
            </ListItem>
            <ListItem button sx={{ '&:hover': { backgroundColor: '#f0f0f0' }, borderRadius: '8px' }}>
              <Link to="/about" style={{ textDecoration: 'none' }}>
                <ListItemText primary="เกี่ยวกับ" sx={{ fontSize: '18px', fontWeight: 600, color: '#000' }} />
              </Link>
            </ListItem>
            <ListItem button sx={{ '&:hover': { backgroundColor: '#f0f0f0' }, borderRadius: '8px' }}>
              <Link to="/policy" style={{ textDecoration: 'none' }}>
                <ListItemText primary="เงื่อนไขการให้บริการ" sx={{ fontSize: '18px', fontWeight: 600, color: '#000' }} />
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </ThemeProvider>
    </header>
  );
}

export default Header;
