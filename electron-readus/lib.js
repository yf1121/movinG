// const { db } = require("./firebase");

let button = document.getElementById('button1')
button.onclick = function() {
    let input = document.getElementById('input1')
    // alert(input.value);
    button1.style.backgroundColor = "lightblue";

    const balloon_elem = document.createElement("div")
    balloon_elem.classList.add("balloon")
    balloon_elem.innerHTML =
        '<span><svg viewBox="0 0 300 400">'
        + '<path d="M299.9,178C303.6,69.3,235.8,0,150,0C64.2,0-3.5,69.3,0.1,178C4,291.2,90.2,361.3,140.6,376.9l-9.2,22.8h37.2l-9.2-22.8C209.8,361.4,296,291.2,299.9,178z"></path>'
        +'</svg></span>'

    const balloon_id = document.getElementById("balloon")
    document.body.insertBefore(balloon_elem, balloon_id)
}
