const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('select-backup-file'),
    getLinkPreview: (url) => ipcRenderer.invoke('fetch-link-preview', url)
});