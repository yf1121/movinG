let button = document.getElementById('button1')
button.onclick = function() {
    let input = document.getElementById('input1')
    alert(input.value);
    button1.style.backgroundColor = "lightblue";
}
let commentfield=nico = new Nico({
  ele: document.getElementById('comment'), // スクリーンになる要素
  // width: 400,                           // スクリーン幅
  // height: 400,                          // スクリーン高さ
  font: 50,                             // フォントサイズ
  color: '#fff',                        // フォントカラー
  speed: 3                              // 流れるスピード
});
nico.loop(['88888', 'かわいい', 'なんだこれw']);

gsap.to(button, {
  opacity: 0,
  duration: 2,
  rotation: 360,
});