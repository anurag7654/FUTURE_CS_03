const express = require('express');
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Ensure 'uploads' and 'decrypted' directories exist
const uploadDir = 'uploads';
const decryptedDir = 'decrypted';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(decryptedDir)) fs.mkdirSync(decryptedDir);

// AES Encryption Setup
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'utf8'); // 32 bytes
const iv = Buffer.from(process.env.IV, 'utf8');               // 16 bytes

function encrypt(buffer) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([cipher.update(buffer), cipher.final()]);
}

function decrypt(buffer) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([decipher.update(buffer), decipher.final()]);
}

// Multer for file uploads (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Upload Route (Encrypt and Save)
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const encrypted = encrypt(req.file.buffer);
    const outputPath = path.join(uploadDir, req.file.originalname + '.enc');

    fs.writeFileSync(outputPath, encrypted);
    res.send('File uploaded and encrypted successfully.');
});

// Download Route (Decrypt and Serve)
app.get('/download', (req, res) => {
    const fileName = req.query.filename;
    const encryptedPath = path.join(uploadDir, fileName + '.enc');

    if (!fs.existsSync(encryptedPath)) {
        return res.status(404).send('File not found.');
    }

    const encrypted = fs.readFileSync(encryptedPath);
    const decrypted = decrypt(encrypted);
    const decryptedPath = path.join(decryptedDir, fileName);

    fs.writeFileSync(decryptedPath, decrypted);
    res.download(decryptedPath, () => {
        fs.unlinkSync(decryptedPath); // Auto-delete after sending
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
