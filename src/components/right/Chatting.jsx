import { useContext, useEffect, useRef, useState } from 'react';
import './rightstyles.scss';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { ChatContext } from '../../context/chatContext';
import { AuthContext } from '../../context/AuthContext';

const Chatting = () => {
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);

  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const ref = useRef();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    ref.current?.scrollIntoView({ behavior: 'smooth' });

    return () => {
      unsub();
    };

  }, [data.chatId, messages]);

  console.log(chat);

  return (
    <div>
      {
        messages?.map((m) => (
          console.log(m),
          <div className={`chat ${m.senderId === currentUser.uid && "owner"}`}>
            <div className='user-time'>
              <img src={m.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} width='35px' height='35px'></img>
              <p style={{ color: 'white' }}>{m.data}</p>
            </div>
            <div className='user-chats'>
              <p className='uchat'>{m.text}</p>
              {m.img && <img src={m.img} width='200px' height='200px' />}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Chatting;