let button_e = document.getElementById('button1')
button_e.onclick = function() {
    button1.style.backgroundColor = "lightblue";

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

    // const balloon_id = document.getElementById("balloon")

}
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
