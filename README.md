# PIX Copy and Paste Generator

A lightweight, full‑stack example and practical tool for generating **PIX copy‑and‑paste** payment codes.

## Overview

This project demonstrates how to:
- Persist PIX receiver information locally using **Pinia** + **LocalStorage**.
- Generate a static QR code and EMV‑formatted copy‑and‑paste string via a tiny **Node.js Express** API.
- Build a modern, responsive UI with **Vue 3**, **Composition API**, **TypeScript**, **Vue Router**, **TailwindCSS**, and **vue3‑toastify** for feedback.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vue 3, Composition API, TypeScript, Pinia, Vue Router, TailwindCSS, vue3‑toastify |
| Backend | Node.js, Express, TypeScript, qrcode‑generator |
| Build Tools | Vite, vue‑tsc, concurrently |
| Persistence | Browser LocalStorage |

## Getting Started

### Prerequisites
- **Node.js** (>= 20) and **npm**
- **Git**

### Installation
```bash
# Clone the repository (already done)
git clone git@github.com:tiagofrancafernandes/PIX-Copy-Paste-Generator.git
cd PIX-Copy-Paste-Generator

# Install dependencies
npm install
```

### Development
```bash
# Starts both the Vite dev server (frontend) and the Express API server
npm run dev
```
- Frontend: http://localhost:3000
- API (proxied): http://localhost:5000/api/pix/generate

### Build for Production
```bash
npm run build   # Generates assets in the `dist` folder
npm run preview # Serves the built app locally
```

## Usage
1. Open the app in the browser.
2. **Manage Receivers** → add one or more PIX receivers (key, name, city). Data is saved in your browser.
3. Return to **Generator**, select a receiver, enter an amount (minimum R$ 1.00), and click **Generate Code**.
4. The generated copy‑and‑paste string and QR code appear. Use the copy buttons to copy to clipboard.

## API
`POST /api/pix/generate`
```json
{
  "amount": 1000,                 // integer cents
  "pixKey": "example-key",
  "receiverName": "John Doe",
  "receiverCityName": "Sao Paulo"
}
```
Response:
```json
{
  "value": "10.00",
  "copyAndPasteCode": "000201...",
  "qrCodeUrl": "https://quickchart.io/qr?...",
  "qrCodeBase64": "data:image/png;base64,..."
}
```
The API validates inputs, builds the EMV payload, computes CRC‑16, and returns the QR data. No data is persisted on the server.

## License
This project is provided under the **MIT License** – feel free to fork, modify, and use it as a reference.
