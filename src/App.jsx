
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout'
import SearchPage from './layout/SearchPage'
import About from './Pages/About'
import Policy from './Pages/Policy'
import ScrollToTop from "./Hooks/ScrollToTop";
import CategoryManager from './components/AdminDashboard/CategoryManager';
import CreateAlbum from "./components/AdminDashboard/CreateAlbum"
import AlbumsList from './components/AdminDashboard/AlbumsList';
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";



export default function App() {

  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/results" element={<SearchPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/manage-categories" element={<CategoryManager />} />
          <Route path="/create-album" element={<CreateAlbum />} />
          <Route path="/albums" element={<AlbumsList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

