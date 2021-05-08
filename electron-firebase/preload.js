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
  // if(arg=="pong") alert("yes");

});

//コメントが更新されたのをmain.jsから受け取る
window.ipcRenderer.on('comment', (event, arg) => {
  // alert(arg);
  var box=document.getElementById("IDsample02");
  const comment_elem = document.createElement("li");
  comment_elem.innerHTML=arg;
  box.appendChild(comment_elem);
  // sleep(3, function () {
  //   comment_elem.remove();
  // });
});

function sleep(waitSec, callbackFunc) {
  // 経過時間（秒）
  var spanedSec = 0;
  // 1秒間隔で無名関数を実行
  var id = setInterval(function () {
      spanedSec++;
      // 経過時間 >= 待機時間の場合、待機終了。
      if (spanedSec >= waitSec) {
          // タイマー停止
          clearInterval(id);
          // 完了時、コールバック関数を実行
          if (callbackFunc) callbackFunc();
      }
  }, 1000);
}
