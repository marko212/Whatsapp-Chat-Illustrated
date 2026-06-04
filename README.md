# WhatsApp Chat Viewer

A high-performance, completely offline desktop application built with Electron and Tailwind CSS to view, search, and manage exported WhatsApp chat backups (`.txt` format). Engineered for sub-millisecond file execution, multi-language layout parsing, and privacy-first local data persistence.

## ⚡ Key Features

* **Ultra-Fast Lazy Loading:** Parses large datasets instantly by decoupling file processing from the rendering thread, utilizing an on-demand virtual scroll matrix.
* **Multilingual Engine:** Full structural support for English, Hebrew, German, Russian, French, and Emoji formatting, with automatic Right-to-Left (RTL) and LTR layout detection.
* **Asynchronous Link Previews:** Extracts OpenGraph metadata entirely for free on a background thread via native IPC channels, rendering cards inline dynamically as you scroll.
* **Session Persistence:** Caches active conversations, structural sidebar states, and exact vertical scroll coordinates across application restarts.
* **Zero-Cloud Architecture:** Operates 100% locally with no external APIs or tracking scripts to guarantee personal data privacy.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js / Electron
* **Frontend:** HTML5, Tailwind CSS (via CDN), Native JavaScript ES6
* **Bundler:** Electron-Builder

---

## 📦 Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Development Setup
1. Clone this repository or download the source code files.
2. Open your terminal in the project directory (`/whatsapp-viewer`) and install the development dependencies:
   ```bash
   npm install
