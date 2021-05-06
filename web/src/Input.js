import React, {useState} from 'react';
import SendImg from './img/send.png';
import QuestionImg from './img/question.png';
import HartImg from './img/hart.png';
import GoodImg from './img/good.png';
import clapImg from './img/clap.png';
import waveImg from './img/wave.png';
import okImg from './img/ok.png';
import styles from './index.css';
import firebase from './firebase.js'

const db = firebase.firestore();

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.textChange = this.textChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.sendQuestion = this.sendQuestion.bind(this);
  }

  // input 要素でのキー入力のたびに呼び出される
  textChange(event) {
    this.setState({text: event.target.value});
  }

  // コメント送信
  submitClick(event) {
    if(this.state.text.length > 0) {
      const timestamp = firebase.firestore.Timestamp.now().seconds + firebase.firestore.Timestamp.now().nanoseconds * 0.000000001;
      db.collection("data").doc("room1").collection("comment").doc(String(timestamp)).set({
        text: this.state.text,
        username: "anonymous",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
          console.log('次のメッセージが送信されました: ' + this.state.text + '\nID: ' + timestamp);
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
    const timestamp = firebase.firestore.Timestamp.now().seconds + firebase.firestore.Timestamp.now().nanoseconds * 0.000000001;
    db.collection("data").doc("room1").collection("question").doc(String(timestamp)).set({
      text: this.state.text,
      username: "anonymous",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
        console.log('次の質問が送信されました: ' + this.state.text + '\nID: ' + timestamp);
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
    const timestamp = firebase.firestore.Timestamp.now().seconds + firebase.firestore.Timestamp.now().nanoseconds * 0.000000001;
    db.collection("data").doc("room1").collection("reaction").doc(String(timestamp)).set({
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

  render()  {
    let divClass="emoji_extra";
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
          </form>

          <div className='emojiErea'>
            <a onClick={this.sendEmoji.bind(this, "heart")}>
              <img src={HartImg}></img>
            </a>
            <a onClick={this.sendEmoji.bind(this, "good")}>
              <img src={GoodImg}></img>
            </a>
            <a onClick={this.sendEmoji.bind(this, "clap")}>
              <img src={clapImg}></img>
            </a>
            <a onClick={this.sendEmoji.bind(this, "wave")}>
              <img src={waveImg}></img>
            </a>
            <a onClick={this.sendEmoji.bind(this, "ok")}>
              <img src={okImg}></img>
            </a>
            <button type='button'>もっと見る</button>
            <div className={divClass}></div>
          </div>
        </div>
      </>
    );
  }
}


