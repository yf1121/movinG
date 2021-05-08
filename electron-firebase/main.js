/* main.js
 * electron-firebase
 * This is a quickstart template for building Firebase authentication workflow into an electron app
 * Copyright (c) 2019-2020 by David Asher, https://github.com/david-asher
 * 
 * Read about Electron security:
 * https://www.electronjs.org/docs/tutorial/security
 */
'use strict';

/*
 * Why is this function here? Our sample app source code lives in the same folder as the 
 * electron-firebase module source code, so pulling in a module would look like 
 * require('./electron-firebase') but when the sample app is in your application, the 
 * electron-firebase code is in the usual and loadable ./node_modules location. So calling 
 * loadModule() instead of require() would work in either configuration, but for your app, 
 * you can just delete this function and use require() like the rest of the world.
 */
global.loadModule = function ( moduleName )
{
    var newModule
    try {
        newModule = require( moduleName )
    }
    catch( error )
    {
        newModule = require( './' + moduleName )
    }
    return newModule
}

// Load modules. answerBrowser.js and setupApp.js are two modules in our sample app. mainapp 
// isn't an app, but a helper library for the main electron-firebase app.
const {app, BrowserWindow} = require('electron')
// const { app } = require('electron')
const { mainapp } = loadModule( 'electron-firebase' )
const { infoRequest, showFile } = loadModule('answerBrowser')
const { updateUserDocs } = loadModule('setupApp')
const path = require('path')
const firebase = require ("firebase");
require("firebase/auth");
require("firebase/firestore");
// require("./comment.js");
// var mainWindow = null ;

// Some startup code
const fbConfig={
    "apiKey": "AIzaSyCd8tr0y47lvUhyL7NWT112epaxWXsMABw",
    "authDomain": "moving-5e9c4.firebaseapp.com",
    "databaseURL": "https://moving-5e9c4.firebaseio.com",
    "projectId": "moving-5e9c4",
    "storageBucket": "moving-5e9c4.appspot.com",
    "messagingSenderId": "1032830265053",
    "appId": "1:1032830265053:web:f989c3ee6e6fb588669d34",
    "hostingUrl": "https://moving-5e9c4.firebaseapp.com/",
    "serviceAccountId": "firebase-adminsdk-dxvr8@moving-5e9c4.iam.gserviceaccount.com"
}
firebase.initializeApp( fbConfig );

// electron-firebase framework event handling
function createWindow () {
    // Create the browser window.
    // mainWindow = new BrowserWindow({
    //     width: 800,
    //     height: 600,
    //     webPreferences: {
    //         nodeIntegration: true,
    //         preload: path.join(__dirname, 'preload.js')
    //     },
    //     transparent: false,
    //     frame: true, // フレームを表示 or 非表示にする
    //     resizable: false, // ウィンドウリサイズ禁止 resizableが有効だと、一部環境によっては透過が機能しなくなる可能性があります。
    //     alwaysOnTop: true // 追加 常に最前面にある
    // })
    // // and load the index.html of the app.
    // mainWindow.loadFile('index.html')

    // mainWindow.webContents.send('asynchronous-message', 'ping');

    // mainWindow.maximize();
    // mainWindow.setIgnoreMouseEvents(true); // 追加 マウスイベントを無視する
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    // return mainWindow;
}
app.whenReady().then(() => {
    // createWindow();
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
        transparent: false,
        frame: true, // フレームを表示 or 非表示にする
        resizable: false, // ウィンドウリサイズ禁止 resizableが有効だと、一部環境によっては透過が機能しなくなる可能性があります。
        alwaysOnTop: true // 追加 常に最前面にある
    })
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
    mainWindow.webContents.send('asynchronous-message', 'pong');
    // mainWindow.webContents.openDevTools()

    const db = firebase.firestore();
    const {ipcMain} = require('electron');
//asynchronous-messageチャンネルの受信処理
    ipcMain.on('asynchronous-message', (event, arg) => {
        // "ping"が出力される
        console.log(arg);
        // event.senderに送信元のプロセスが設定されているので、asynchronous-replyチャンネルで文字列"pong"を非同期通信で送信元に送信
        event.sender.send('asynchronous-reply', 'pong');
        // ※event.senderはwebContentsオブジェクトな

    });
    //成功
    // mainWindow.webContents.on('did-finish-load', ()=>{
    //     mainWindow.webContents.send('asynchronous-reply', 'hoge');
    //   })

    // const docRef = db.collection('data').doc('room1').collection('emojiList').doc('none');
    // docRef.get().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!!");
    //     }
    // }).catch((error) => {
    //     // console.log(error);
    //     console.log("Error getting document:", error);
    // });
    // docRef.onSnapshot((doc) => {
    //     var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //     console.log(source, " data: ", doc.data());
    //     // console.log("Current data: ", doc.data());
    // });

    db.collection("data").doc('room1').collection('comment').onSnapshot((querySnapshot) => {
        // console.log("Current data: ", querySnapshot.data());
        querySnapshot.forEach((doc) => {
            // cities.push(doc.data().name);
            console.log("Current data: ", doc.data());
            mainWindow.webContents.on('did-finish-load', ()=>{
                mainWindow.webContents.send('comment', doc.data().text);
              })
            // console.log("decode", decoder.decode(doc.data()));
        });
    },(error) =>{
        console.log("error in snapshot")
    });

    // const Ref2=db.collection('data').

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

// This function will be called when Electron has finished initialization and is ready to create 
// browser windows. Some APIs can only be used after this event occurs. launchInfo is macOS specific.
// see: https://www.electronjs.org/docs/api/app#event-ready


// see: https://electronjs.org/docs/api/app#event-activate-macos
// macOS specific - Emitted when the application is activated. Various actions can trigger this 
// event, such as launching the application for the first time, attempting to re-launch the 
// application when it's already running, or clicking on the application's dock or taskbar icon.
app.on( 'activate', (appEvent,hasVisibleWindows) => 
{
    logwrite( "EVENT app activate " )
    // do whatever
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});