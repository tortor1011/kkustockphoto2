import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, InputAdornment, Divider, IconButton } from "@mui/material";
import './Search.css';
import useScreenSize from '../../Hooks/Responsive';

function SearchBox() {
    // ตรวจสอบขนาดหน้าจอ
    const { isMobile, isTablet, isDesktop, isUltraWide } = useScreenSize();

    // กำหนดขนาดของกล่องค้นหาตามอุปกรณ์
    let searchWidth;
    if (isMobile) {
        searchWidth = '60%';
    } else if (isTablet) {
        searchWidth = '60%';
    } else if (isDesktop) {
        searchWidth = '70%';
    } else if (isUltraWide) {
        searchWidth = '100%';
    }
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(""); // เก็บค่าค้นหา

    const PromptTheme = createTheme({
        typography: {
            fontFamily: 'Prompt',
        },
    });


    // ฟังก์ชันเมื่อกดปุ่มค้นหา
    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/results?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <ThemeProvider theme={PromptTheme}>
            <div className="search-container">
                <Box sx={{ width: searchWidth, maxWidth: 800}}>
                    <TextField
                        id="searchQuery"
                        // id="outlined-search"
                        fullWidth
                        label={isMobile ? "ค้นหาภาพถ่าย" : "ค้นหาภาพถ่ายใน KKU Stock Photos"}
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // กด Enter เพื่อค้นหา
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Divider sx={{ height: 40, mx: 1 }} orientation="vertical" />
                                    <IconButton onClick={handleSearch}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default SearchBox;
