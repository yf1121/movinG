import React, { useState } from 'react';
import {
  Link,
} from 'react-router-dom'
import firebase from './firebase.js';

const db = firebase.firestore();

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomid: ""
    };
    this.roomIdChange = this.roomIdChange.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
  }

  roomIdChange(event) {
    let re = new RegExp("^[0-9a-zA-Z_-]*$", "ig");
    if (re.test(event.target.value)) {
      this.setState({ roomid: event.target.value });
    }
  }

  enterRoom(event) {
    const strageDlUrl = "gs://moving-5e9c4.appspot.com/";
    const emojiDef = ['wave', 'ok'];

    db.collection("data").doc(this.state.roomid).collection("comment").doc('0').get().then((doc) => {
      if (doc.exists) {
        console.log("この部屋はすでに存在するため、入室します. ID: ", doc.id);
      } else {
        const timestamp = firebase.firestore.Timestamp.now().seconds + firebase.firestore.Timestamp.now().nanoseconds * 0.000000001;
        db.collection("data").doc(this.state.roomid).collection("comment").doc('0.0').set({
          text: "＼部屋が作成されました／",
          username: "anonymous",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          color: "black",
        })
          .then((docRef) => {
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        db.collection("data").doc(this.state.roomid).collection("question").doc('0.0').set({
          text: "＼質問はここに表示されます／",
          username: "anonymous",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          color: "black",
        })
          .then((docRef) => {
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        for (let i = 0; i < emojiDef.length; i++) {
          db.collection("data").doc(this.state.roomid).collection("emojiList").doc(emojiDef[i]).set({
            url: strageDlUrl + emojiDef[i] + ".png",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
            .then((docRef) => {
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        }

        db.collection("data").doc(this.state.roomid).collection("reaction").doc(String(timestamp)).set({
          emoji: "heart",
          username: "anonymous",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
          .then((docRef) => {
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        console.log("部屋を作成しました. ID: ", this.state.roomid);
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  render() {
    return (
      <>
        <div className="homePage">
          <h1>参加者はこちらから</h1>
          <div className="enterRoom">
            <input type='text' name='comment' placeholder='部屋IDを入力' value={this.state.roomid} onChange={this.roomIdChange}></input>
            <Link to={'/' + this.state.roomid} className="enterButton" onClick={this.enterRoom}>参加</Link>
          </div>
          <p>※部屋IDには半角英数字とアンダーライン( _ )、ハイフン( - )が使用できます</p>
          <a href="https://github.com/yf1121/movinG">GitHubソースコード</a>
        </div>
      </>
    )
  }
}