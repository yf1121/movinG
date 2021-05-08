// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
window.ipcRenderer = require('electron').ipcRenderer;
window.ipcRenderer.send('asynchronous-message', 'ping');
//ipcRendererのテスト用
window.ipcRenderer.on('asynchronous-reply', (event, arg) => {
  // console.log(arg);
  // "pong"が出力される
  alert(arg);
  if(arg=="pong") alert("yes");

});
window.ipcRenderer.on('comment', (event, arg) => {
  // alert(arg);
  var box=document.getElementById("IDsample02");
  const comment_elem = document.createElement("li");
  comment_elem.innerHTML=arg;
  box.appendChild(comment_elem);
  
});
// console.log(ipcRenderer);
// window.remote = require('electron').remote;