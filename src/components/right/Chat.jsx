import './rightstyles.scss';

const Chat = () => {
    return (
      <div>
        <div className='chat owner'>
        <div className='user-time'>
          <img src='src/assets/profile.png' width='35px' height='35px'></img>
          <p>time</p>
        </div>
        <div className='user-chats'>
          <p className='uchat'>user chats</p>
        </div>
      </div><div className='chat'>
        <div className='user-time'>
          <img src='src/assets/profile.png' width='35px' height='35px'></img>
          <p>time</p>
        </div>
        <div className='user-chats'>
          <p className='uchat'>user chats</p>
        </div>
      </div>
      </div>
    )
}

export default Chat;