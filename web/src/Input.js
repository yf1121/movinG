import React, {useState} from 'react';
import Modal from 'react-modal';
import SendImg from './img/send.png';
import QuestionImg from './img/question.png';
import editImg from './img/edit.png';
import HartImg from './img/hart.png';
import GoodImg from './img/good.png';
import clapImg from './img/clap.png';
import waveImg from './img/wave.png';
import okImg from './img/ok.png';
import styles from './index.css';
import firebase from './firebase.js';
// import MediaQuery from 'react-responsive';

const db = firebase.firestore();
Modal.setAppElement("#root"); //モーダル表示のために必要
const strageDlUrl = "gs://moving-5e9c4.appspot.com/";

function toBase64Url(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      showEmoji: false,
      room: String(this.props.match.params.room),
      emojiList: ["gs://moving-5e9c4.appspot.com/すみ.png"],
      modalIsOpen: false,
      setIsOpen: false,
      customEmojiImage: "",
      customEmojiId: ""
    };
    this.textChange = this.textChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.sendQuestion = this.sendQuestion.bind(this);
    this.showMoreEmoji = this.showMoreEmoji.bind(this);
    this.changeModalVisible = this.changeModalVisible.bind(this);
    this.changeEmojiId = this.changeEmojiId.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.addEmoji = this.addEmoji.bind(this);
  }

  // input 要素でのキー入力のたびに呼び出される
  textChange(event) {
    this.setState({text: event.target.value});
  }

  // コメント送信
  submitClick(event) {
    const room = this.state.room;
    if(this.state.text.length > 0) {
      const timestamp = firebase.firestore.Timestamp.now().seconds + firebase.firestore.Timestamp.now().nanoseconds * 0.000000001;
      db.collection("data").doc(room).collection("comment").doc(String(timestamp)).set({
        text: this.state.text,
        username: "anonymous",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
          console.log('次のメッセージが送信されました: ' + this.state.text + '\nID: ' + timestamp + '\nROOM: ' + room);
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
      alert('次のメッセージが送信されました: ' + this.state.text + ' in ' + timestamp);
      event.preventDefault();
      this.setState({text: ""})
    } else {
      alert('コメントを送信するには1文字以上入力してください')
    }
  }

  // 質問を送る処理
  sendQuestion(event) {
    const room = this.state.room;
    const timestamp = firebase.firestore.Timestamp.now().seconds + firebase.firestore.Timestamp.now().nanoseconds * 0.000000001;
    db.collection("data").doc(room).collection("question").doc(String(timestamp)).set({
      text: this.state.text,
      username: "anonymous",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
        console.log('次の質問が送信されました: ' + this.state.text + '\nID: ' + timestamp + '\nROOM: ' + room);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    alert('次のメッセージが質問として送信されました: ' + this.state.text + ' in ' + timestamp);
    event.preventDefault();
    this.setState({text: ""})
  }

  // 絵文字を送る処理
  sendEmoji(emojiname) {
    const room = this.state.room;
    const timestamp = firebase.firestore.Timestamp.now().seconds + firebase.firestore.Timestamp.now().nanoseconds * 0.000000001;
    db.collection("data").doc(room).collection("reaction").doc(String(timestamp)).set({
      emoji: emojiname,
      username: "anonymous",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
        console.log('絵文字 :' + emojiname + ': が送信されました\nID: ' + timestamp);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    alert('絵文字 :' + emojiname + ': が送信されました at ' + timestamp);
  }

  // 文字の装飾
  editClick() {
    
  }

  changeModalVisible(event) {
    this.setState({setIsOpen: !this.state.setIsOpen, modalIsOpen: !this.state.modalIsOpen});
    console.log(this.state.setIsOpen, this.state.modalIsOpen);
  }

  // カスタム絵文字の名前を変更する処理
  changeEmojiId(event) {
    this.setState({customEmojiId: event.target.value});
  }

  // カスタム絵文字のアップロード
  uploadImage(event) {
    const image = event.target.files[0];
    this.setState({customEmojiImage: image});
    console.log(this.state.customEmojiImage);
  }

  // カスタム絵文字を追加する処理
  addEmoji(event) {
    let customEmojiId = this.state.customEmojiId;
    let img = this.state.customEmojiImage;
    const thisBind = this;
    console.log(customEmojiId, img);

    if(customEmojiId && img) {
      const room = this.state.room;
      let storageRef = firebase.storage().ref().child(customEmojiId+`.png`);

      const blob = firebase.firestore.Blob.fromUint8Array(img);
      console.log(blob)
      img = {img : blob};

      db.collection("data").doc(room).collection("emojiList").doc(customEmojiId).set({
        url: strageDlUrl + customEmojiId + ".png",
        file: img,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });

      db.doc('/data/' + room + "emojiList" + customEmojiId).set(img, { merge: true }).catch(error => console.log(error));

      // storageRef.getMetadata().then(function(metadata) {
      //   console.log("このファイルは存在しています");
      //   alert("この名前はすでに使用されています");
      // }).catch(function(error) {
      //   if(error.code == "storage/unauthorized") {
      //     console.log("ファイルはまだ存在しません");
      //     storageRef.put(img)
      //       .then(function(snapshot) {
      //         alert(":" + customEmojiId + ": が追加されました");
      //         thisBind.setState({setIsOpen: !thisBind.state.setIsOpen, modalIsOpen: !thisBind.state.modalIsOpen});
      //       });
      //     db.collection("data").doc(room).collection("emojiList").doc(customEmojiId).set({
      //       url: strageDlUrl + customEmojiId + ".png",
      //       file: img,
      //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //     })
      //     .then((docRef) => {
      //     })
      //     .catch((error) => {
      //         console.error("Error adding document: ", error);
      //     });
      //   }
      // });
    } else {
      alert("絵文字の名前と画像ファイルは必須です");
    }
  }

  // すべての絵文字を表示する
  showMoreEmoji(event) {
    this.setState({showEmoji: !this.state.showEmoji})
    console.log(this.state.showEmoji);

    let listAry = [];
    // カスタム絵文字を表示する
    db.collection("data").doc(this.state.room).collection("emojiList").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        listAry.push({name: doc.id, src: doc.data()['file']});
        console.log(doc.id, doc.data()['file'].toBase64());
      });
    })
    this.setState({emojiList: listAry});
    console.log(listAry)
  }

  render()  {
    return (
      <>
        <div className="senddiv">

          <form className="sendText">
            <input type='text' name='comment' placeholder='コメントを入力' value={this.state.text} onChange={this.textChange}></input>
            <div className='submitButton'>
              <button name="send_comment" type='submit' title="送信" onClick={this.submitClick}>
                <img src={SendImg} />
              </button>
              <button name="send_question" type='button' title='質問を送る' onClick={this.sendQuestion}>
                <img src={QuestionImg} />
              </button>
            </div>
            <div className='editButton'>
              <button name='edit-comment' type='button' title="コメントの装飾" onClick={this.editClick}>
                  <img src={editImg} />
              </button>

            </div>
          </form>

          <div className='emojiArea'>
            <div className='defaultEmoji'>
              <a className='qbtn' onClick={this.sendQuestion}>
                <img src={QuestionImg} />
              </a>
              <a onClick={this.sendEmoji.bind(this, "heart")}>
                <img src={HartImg}></img>
              </a>
              <a onClick={this.sendEmoji.bind(this, "good")}>
                <img src={GoodImg}></img>
              </a>
              <a onClick={this.sendEmoji.bind(this, "clap")}>
                <img src={clapImg}></img>
              </a>
            </div>
            <button type='button' className="switchMoreEmoji" onClick={this.showMoreEmoji}>{this.state.showEmoji ? "隠す" : "もっと見る" }</button>
            <div className={this.state.showEmoji ? "visible emojiArea" : "invisible emojiArea"}>
              <a onClick={this.sendEmoji.bind(this, "wave")}>
                <img src={waveImg}></img>
              </a>
              <a onClick={this.sendEmoji.bind(this, "ok")}>
                <img src={okImg}></img>
              </a>
              {this.state.emojiList.map((image) => {
                return (
                  <a onClick={this.sendEmoji.bind(this, image['name'])} title={image['name']}>
                    <img src={image['src']}></img>
                  </a>
                );
              })}
              
              <button type='button' className="addEmoji" onClick={this.changeModalVisible}>絵文字を追加</button>
            </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              contentLabel="Example Modal"
            >
              <button className="addEmoji" onClick={this.changeModalVisible}>キャンセル</button>
              <div>絵文字を追加</div>
              <input type="text" onChange={this.changeEmojiId}></input>
              <input type="file" accept=".png" onChange={this.uploadImage} />
              <button className="addEmoji" onClick={this.addEmoji}>絵文字を追加</button>
            </Modal>
          </div>
        </div>
      </>
    );
  }
}


