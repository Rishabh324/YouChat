import { useContext, useEffect, useRef, useState } from 'react';
import './rightstyles.scss';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { ChatContext } from '../../context/ChatContext';
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


  return (
    <div>
      {
        messages?.map((m) => (
          <div ref={ref} className={`chat ${m.senderId === currentUser.uid && "owner"}`}>
            <div className='user-time'>
              <img src={m.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} width='35px' height='35px'></img>
              <p style={{ color: 'white' }}>{m.data}</p>
            </div>
            <div className='user-chats'>
              {m.text && <p className='uchat'>{m.text}</p>}
              {m.image && <img src={m.image} className="chatImage" width='200px' height='200px' />}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Chatting;