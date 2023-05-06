import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import './leftstyle.scss';
import { ChatContext } from '../../context/chatContext';

const Chats = (user) => {
    const [chat, setChat] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const handleSelect = async () => {

        const combinedId = currentUser.uid > user.user.uid ? currentUser.uid + user.user.uid : user.user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), {
                    messages: [],
                })
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.user.uid,
                        displayName: user.user.displayName,
                        photoURL: user.user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                })

                await updateDoc(doc(db, 'userChats', user.user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                })
            }
        } catch (e) { }

        user.removeUser();

    };
    
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

    console.log(Object.entries(chat));
    const handleClick = (u) => {
        dispatch({
            type: "CHANGE_USER",
            payload: u
        })
        handleSelect();
    }

    return (
        <div>
            <div className="chats" onClick={() => handleClick(user.user)}>
                <img src={user.user.photoURL} width="30px" height='30px' ></img>
                <div>
                    <p style={{ color: 'white' }}>{user.user.displayName}</p>
                </div>
            </div>
        </div>
    )
};

export default Chats;