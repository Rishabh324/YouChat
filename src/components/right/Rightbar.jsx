import Scaffold from "./Scaffold";
import Message from "./Message";
import "./rightstyles.scss"
import Chatting from "./Chatting";
import Nothing from "./Nothing";
import { ChatContext } from "../../context/ChatContext";
import { useContext, useEffect, useState } from "react";

const Rightbar = () => {
    const { data } = useContext(ChatContext);
    const [u, setU] = useState(false);
    useEffect(() => {
        console.log(data);
        console.log(data.user);
        if (data.user) {
            console.log("true");
            setU(true);
        } else {
            console.log("false");
            setU(false);
        }
    }, [data.user]);

    return (
        <div className="rightbar">
            {!u ? <Nothing /> : <div className='rightcont'>
                <Scaffold />
                <div className='msgs'>
                    <Chatting />
                </div>
                <Message />
            </div>}
        </div>
    )
};

export default Rightbar;