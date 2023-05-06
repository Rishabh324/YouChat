import Scaffold from "./Scaffold";
import Message from "./Message";
import "./rightstyles.scss"
import Chatting from "./Chatting";

const Rightbar = () => {

    return (
        <div className="rightbar">
            <Scaffold />
            <div className='msgs'>
                <Chatting />
            </div>
            <Message />
        </div>
    )
};

export default Rightbar;