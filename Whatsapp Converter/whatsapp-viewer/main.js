const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 850,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    win.loadFile('index.html');
}

// File Picker IPC Channel
ipcMain.handle('select-backup-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Text Files', extensions: ['txt'] }]
    });
    if (!canceled && filePaths.length > 0) {
        const targetPath = filePaths[0];
        return {
            name: path.basename(targetPath),
            content: fs.readFileSync(targetPath, 'utf-8')
        };
    }
    return null;
});

// Free Lightweight Link Preview Scraper Engine
ipcMain.handle('fetch-link-preview', async (event, targetUrl) => {
    try {
        const response = await fetch(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const html = await response.text();

        // Fast Regex extractors for OpenGraph tags
        const getMeta = (property) => {
            const match = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
                html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`, 'i'));
            return match ? match[1] : null;
        };

        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);

        return {
            title: getMeta('og:title') || (titleMatch ? titleMatch[1] : 'Link Preview'),
            description: getMeta('og:description') || 'Click to follow link...',
            image: getMeta('og:image') || null,
            url: targetUrl
        };
    } catch (error) {
        return { title: 'External Link', description: targetUrl, image: null, url: targetUrl };
    }
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });