import React, {useState} from 'react';
import {
  Link,
} from 'react-router-dom'

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomid: ""
    };
    this.roomIdChange = this.roomIdChange.bind(this);
  }

  roomIdChange(event) {
    let re = new RegExp("^[0-9a-zA-Z]*$", "ig");
    if(re.test(event.target.value)) {
      this.setState({roomid: event.target.value});
    }
  }

  render() {
    return (
      <>
        <div className="homePage">
          <h1>参加者はこちらから</h1>
          <div className="enterRoom">
            <input type='text' name='comment' placeholder='部屋IDを入力' value={this.state.roomid} onChange={this.roomIdChange}></input>
            <Link to={'/' + this.state.roomid} className="enterButton">参加</Link>
          </div>
          <a href="https://github.com/yf1121/movinG">GitHubソースコード</a>
        </div>
      </>
    )
  }
}