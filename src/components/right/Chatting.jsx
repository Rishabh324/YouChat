import { useContext, useEffect, useState } from 'react';
import './rightstyles.scss';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/chatContext';

const Chatting = () => {
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChat(doc.data());
      });

      return () => {
        unsub()
      };
    }

    currentUser.uid && getChats();
  }, [currentUser.uid])
  

  console.log(chat);

  const handleSelect = (u) => {
    dispatch({
      type: "CHANGE_USER",
      payload: u
    })
  }

  return (
    <div>
      {
        Object.entries(chat)?.map((chat) => (
          <div className='chat owner'>
            <div className='user-time'>
              <img src={chat[1].userInfo.photoURL} width='35px' height='35px'></img>
              <p>time</p>
            </div>
            <div className='user-chats'>
              <p className='uchat'>user chats</p>
            </div>
          </div>
        ))}
      <div className='chat'>
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

export default Chatting;