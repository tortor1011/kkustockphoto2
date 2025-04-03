import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

// Configure CORS with more permissive settings
app.use(cors({
    origin: true, // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 hours
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));

// Add CORS headers to all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get('/api/images', (_, res) => {
    const folderPath = path.join(__dirname, 'public/images/thumbnails');
    console.log('Reading directory:', folderPath);
    
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ error: 'Error reading files' });
        }
        console.log('Found files:', files);
        
        // Sort files by name
        files.sort((a, b) => {
            // Extract numbers from filenames for comparison
            const numA = parseInt(a.match(/\d+/)?.[0] || 0);
            const numB = parseInt(b.match(/\d+/)?.[0] || 0);
            return numA - numB;
        });
        
        const images = files.map(file => {
            const imageData = {
                thumbnail: `/images/thumbnails/${file}`,
                fullSize: `/images/original/${file.replace('-thumbnail', '')}`,
                category: 'ศิลปวัฒนธรรมและศิลปสร้างสรรค์',
                photographer: 'บริพัตร ทาสี',
                tags: '2567, สีฐานเฟสติวัล, ขบวนกรรมสีฐานเฟสติวัล, วัฒนธรรม',
                uploadDate: '16 พฤศจิกายน 2567',
                views: 120,
                downloads: 45
            };
            console.log('Processing file:', file, '->', imageData);
            return imageData;
        });
        
        console.log('Sending response with', images.length, 'images');
        res.json(images);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
