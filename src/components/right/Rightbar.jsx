import Scaffold from "./Scaffold";
import Message from "./Message";
import "./rightstyles.scss"
import Chat from "./Chat";

const Rightbar = () => {
    return (
        <div className="rightbar">
            <Scaffold />
            <div className='msgs'>
                <Chat />
            </div>
            <Message />
        </div>
    )
};

export default Rightbar;