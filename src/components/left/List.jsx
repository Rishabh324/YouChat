import { useContext, useEffect, useState } from 'react';
import './leftstyle.scss'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/chatContext';

const List = () => {
    const [chat, setChat] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);


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
        <div className="list">
            {Object.entries(chat)?.map((chat) => (
                <div className="userchat" onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} width="40px" height='40px' />
                    <div className="userinfo">
                        <p><span>{chat[1].userInfo.displayName}</span></p>
                        <p style={{ color: '#b9b9c1' }}>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default List;