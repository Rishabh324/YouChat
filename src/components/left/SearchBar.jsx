import { useState } from "react";
import Chats from "./Chats";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const SearchBar = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const searchUser = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', username));

        try {
            console.log(q);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            })
        } catch (e) {
            console.log(e);
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === 'Enter' && searchUser();
    };

    const removeUser = () => {
        setUser(null);
        setUsername('');
    };

    return (
        <div className="search-bar">
            <input className='inputInput' placeholder='Search Contact...' onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username}></input>
            {err && <p style={{ color: 'red' }}>User not found</p>}
            {user && <Chats user={user} removeUser={removeUser} />}
        </div>
    )
};

export default SearchBar;