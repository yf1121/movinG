// window.ipcRenderer.on('asynchronous-message', (msg) => {
//     // アラートダイアログに"ping"が表示される  
//     alert(msg);
//   });

//   ipcRenderer.on('asynchronous-message', (msg) => {
//     // アラートダイアログに"ping"が表示される  
//     alert(msg);
//   });
// ipcRenderer.send('asynchronous-message', 'ping');

// //非同期通信の受信の応答処理（asynchronous-replyチャンネル）
// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   // "pong"が出力される
//   console.log(arg);
// });