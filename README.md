# 🔐 Internship Task 3 – Secure File Sharing System (Node.js + AES Encryption)

This repository contains the implementation of a Secure File Sharing System developed as part of **Task 3** of the **Future Interns Cybersecurity Internship**. The system ensures secure upload and download of files using AES encryption, protecting them both at rest and in transit.

---

## 📌 Objective

- Build a secure portal for file upload and download
- Encrypt files using AES before saving them to disk
- Decrypt files securely before serving them to users
- Prevent unauthorized access and tampering

---

## 🔧 Technologies Used

- **Node.js (Express)** – for backend API server
- **Crypto module (Node.js)** – for AES encryption/decryption
- **Multer** – for handling multipart file uploads
- **Postman / curl** – for API testing
- **Git & GitHub** – for version control and project hosting

---

## 🚀 Features

- ✅ File upload with AES-256 encryption
- ✅ File download with real-time decryption
- ✅ Simple and secure REST API
- ✅ Handles error conditions (e.g., missing file)
- ✅ Easily testable via Postman or curl

---

## 🛡️ How It Works

[Client Upload]
↓
Encrypt file using AES
↓
Store encrypted file on server
↓
[Client Download]
↓
Decrypt file using AES
↓
Send file to client


## 📁 Project Structure

secure-file-share/
├── uploads/ # Encrypted file storage
├── app.js # Main server script
├── cryptoUtils.js # AES encryption/decryption logic
├── .env # Environment variables (ignored by Git)
├── .gitignore # Ignore node_modules and .env
└── README.md # Project documentation



## 🧪 API Endpoints

### 🔼 Upload a File

**POST** `/upload`

```bash
curl -F "file=@testfile.txt" http://localhost:5000/upload
🔽 Download a File
GET /download/:filename

bash
Copy
Edit
curl http://localhost:5000/download/testfile.txt -o decrypted.txt