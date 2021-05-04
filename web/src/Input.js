import React from 'react';
import SendImg from './img/send.png';
import QuestionImg from './img/question.png';
import HartImg from './img/hart.png';
import styles from './index.css';

export default class Input extends React.Component {
  render()  {
    let divClass="emoji_extra";
    return (
      <>
        <div className="senddiv">
          <form className="sendText">
            <input type='text' name='comment' placeholder='コメントを入力'></input>
            <div className='submitButton'>
              <button name="send_comment" type='submit' title="送信"><img src={SendImg} /></button>
              <button name="send_question" type='submit' title='質問を送る'><img src={QuestionImg} /></button>
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


