import React, {useState} from 'react';
import SendImg from './img/send.png';
import QuestionImg from './img/question.png';
import HartImg from './img/hart.png';
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
  }

  // input 要素でのキー入力のたびに呼び出される
  textChange(event) {
    this.setState({text: event.target.value});
  }

  submitClick(event) {
    const timestamp = firebase.firestore.Timestamp.now().seconds + firebase.firestore.Timestamp.now().nanoseconds * 1/1000000000;
    db.collection("reaction").doc(String(timestamp)).set({
      emoji: [this.state.text],
      user: "user2",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    alert('次のメッセージが送信されました: ' + this.state.text + ' in ' + timestamp);
    event.preventDefault();
    this.setState({text: ""})
  }

  render()  {
    let divClass="emoji_extra";
    return (
      <>
        <div className="senddiv">

          <form className="sendText" onSubmit={this.submitClick}>
            <input type='text' name='comment' placeholder='コメントを入力' value={this.state.text} onChange={this.textChange}></input>
            <div className='submitButton'>
              <button name="send_comment" type='submit' title="送信" onClick={this.submitClick}>
                <img src={SendImg} />
              </button>
              <button name="send_question" type='submit' title='質問を送る'>
                <img src={QuestionImg} />
              </button>
            </div>
          </form>

          <div className='emojiErea'>
            <img src={HartImg}></img>
            <button type='button'>もっと見る</button>
            <div className={divClass}></div>
          </div>
        </div>
      </>
    );
  }
}


