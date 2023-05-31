import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import ATTACH from "../../assets/attach.png";

const Message = () => {

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const auto_height = (e) => {
        e.height = "1px";
        e.height = (e.scrollHeight) + "px";
    }

    const handleSend = async () => {

        if (image) {
            console.log("image");
            const storageRef = ref(storage, `chatImg/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);


            uploadTask.on('state_changed',
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                image: downloadURL,
                            })
                        })
                    })
                }
            );

        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText('');
        setImage(null);
    };

    return (
        <div className="message">
            <div className="message-container">
                <textarea placeholder="Type Something..." value={text} className="auto_height" onInput={(e) => auto_height(e)} onChange={e => setText(e.target.value)}></textarea>
                <div className="send-utils">
                    <input type='file' style={{ display: 'none' }} id="file" onChange={e => setImage(e.target.files[0])}></input>
                    <label htmlFor="file" style={{ display: 'flex', gap: '20px' }}>
                        <img src={ATTACH} style={{ marginTop: '10px' }} width='25px' height="25px"></img>
                    </label>
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    )
};

export default Message;