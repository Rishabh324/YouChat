import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import './leftstyle.scss';

const Chats = (user) => {
    const { currentUser } = useContext(AuthContext);

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.user.uid ? currentUser.uid + user.user.uid : user.user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), {
                    messages: [],
                })

                await updateDoc(doc(db, 'userChats', currentUser.uid)), {
                    [combinedId + '.userInfo']: {
                        uid: user.user.uid,
                        displayName: user.user.displayName,
                        photoURL: user.user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                }

                await updateDoc(doc(db, 'userChats', user.user.uid)), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                }
            }
        } catch (e) {

        }
    };

    return (
        <div className="chats" onClick={handleSelect}>
            <img src={user.user.photoURL} width="30px" height='30px' ></img>
            <div>
                <p style={{ color: 'white' }}>{user.user.displayName}</p>
            </div>
        </div>
    )
};

export default Chats;