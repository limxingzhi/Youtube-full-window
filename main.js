// 'use strict'

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { URL, format, searchParams } = require('url');

function createWindow() {
  // Create the browser window.
  var inputWindow = new BrowserWindow({ width: 800, height: 600 });
  inputWindow.setMenu(null);

  // and load the index.html of the app.
  inputWindow.loadURL(format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
}

function createVideoWindow(videoURL) {
  // Create the browser window.
  var inputWindow = new BrowserWindow({ width: 1280, height: 720, frame: false });
  inputWindow.setMenu(null);

  // and load the index.html of the app.
  inputWindow.loadURL(format({
    pathname: path.join('youtube.com', 'embed', videoURL),
    protocol: 'https',
    slashes: true
  }));
}

app.on('ready', createWindow);

ipcMain.on('create-video-window', function (event, args) {

  var urlInput = args;

  try {
    urlInput = new URL(urlInput);
    createVideoWindow(urlInput.searchParams.get('v'));
  } catch (e) {
    event.sender.send('error', 'Invalid URL , please enter a full url\nE.g. https://www.youtube.com/watch?v=V2hlQkVJZhE');
    return false;
  }
});