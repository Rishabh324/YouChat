const Message = () => {
    const auto_height = (e) => {
        console.log(e);
        e.height = "1px";
        e.height = (e.scrollHeight) + "px";
    }
    return (
        <div className="message">
            <div className="message-container">
                <textarea placeholder="Type Something..." className="auto_height" onInput={(e) => auto_height(e)}></textarea>
                <div className="send-utils">
                    <img src="src\assets\paperclip.jpeg" width='30px' height="30px"></img>
                    <img src="src\assets\addphoto.png" width='30px' height="30px"></img>
                    <button>Send</button>
                </div>
            </div>
            {/* <div className="msg-utils"> */}
            {/* </div> */}
        </div>
    )
};

export default Message;