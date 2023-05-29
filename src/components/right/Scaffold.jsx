import { useContext } from 'react';
import './rightstyles.scss'
import { ChatContext } from '../../context/chatContext';

const Scaffold = () => {
  const { data } = useContext(ChatContext);
  
  return (
    <div className="scaffold">
      <div className='topbar'>
        <div className='chat-title'>
          <img src={data.user?.photoURL} width='30px' height='30px'></img>
          <p className='allyname'>{data.user?.displayName}</p>
        </div>
        <div className="call-options">
          <img className='proficon' src="src\assets\vidcall.png" width="25px" height='25px' />
          <img className='proficon' src="src\assets/add.png" width="25px" height='25px' />
          <img className='proficon' src="src\assets/more.png" width="25px" height='25px' />
        </div>
      </div>
    </div>
  )
};

export default Scaffold;