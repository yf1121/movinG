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
  // alert(arg);
  // if(arg=="pong") alert("yes");
});

//コメントが更新されたのをmain.jsから受け取る
window.ipcRenderer.on('comment', (event, arg) => {
  // alert(arg);
  var box = document.getElementById("IDsample02");
  const comment_elem = document.createElement("li");
  comment_elem.innerHTML = arg;
  box.appendChild(comment_elem);
  // sleep(3, function () {
  //   comment_elem.remove();
  // });
});

//絵文字が送信されたのをmain.jsから受け取る
//何故か動作しない
window.ipcRenderer.on('emojiList', (event, arg) => {
  // 風船の追加・表示
  const balloon_elem = document.createElement("div")
  balloon_elem.classList.add("balloon_emoji")

  balloon_elem.innerHTML =
    '<span><svg viewBox="0 0 300 400">'
    + '<path d="M299.9,178C303.6,69.3,235.8,0,150,0C64.2,0-3.5,69.3,0.1,178C4,291.2,90.2,361.3,140.6,376.9l-9.2,22.8h37.2l-9.2-22.8C209.8,361.4,296,291.2,299.9,178z"></path>'
    +'</svg></span>'

  document.body.appendChild(balloon_elem)
  sleep(5, function () {
    balloon_elem.remove();
  });
});

//質問が送信されたのをmain.jsから受け取る
//何故か動作しない
window.ipcRenderer.on('question', (event, arg) => {
  // ?マークの追加・表示
  const balloon_elem = document.createElement("div")
  balloon_elem.classList.add("balloon_question")

  balloon_elem.innerHTML = '<span><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="500px" height="500px" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve">'
  + '<path fill-rule="evenodd" clip-rule="evenodd" fill="#A0A0A0" d="M271.346,79.721c-22.935-0.015-41.855,18.864-41.865,41.774c-0.009,23.403,18.722,42.228,42.013,42.225c23.185-0.003,41.988-18.82,41.985-42.013C313.477,98.474,294.673,79.737,271.346,79.721z M272.383,149.558c-3.299,0.027-5.461-2.08-5.474-5.332c-0.014-3.298,2.089-5.447,5.347-5.464c3.22-0.017,5.461,2.198,5.462,5.396C277.719,147.317,275.53,149.533,272.383,149.558z M285.293,116.914c-1.209,2.626-3.042,4.78-4.971,6.863c-1.687,1.822-2.979,3.816-3.573,6.273c-0.584,2.42-3.066,3.882-5.458,3.37c-2.205-0.472-3.502-2.64-3.185-5.167c0.463-3.685,2.492-6.495,4.892-9.143c2.326-2.567,3.984-5.44,3.5-9.089c-0.124-0.936-0.336-1.906-0.739-2.749c-1.062-2.216-3.772-2.551-5.337-0.646c-0.645,0.785-1.099,1.762-1.484,2.714c-0.667,1.65-1.924,2.258-3.578,2.284c-1.199,0.019-2.399,0.026-3.598-0.001c-2.296-0.052-3.059-1.019-2.647-3.311c1.273-7.108,6.19-11.073,15.502-11.072c1.893,0.015,5.314,0.775,8.059,3.398C286.663,104.45,287.757,111.562,285.293,116.914z"/></svg></span>'

  document.body.appendChild(balloon_elem)
  sleep(10, function () {
      balloon_elem.remove();
  });
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
