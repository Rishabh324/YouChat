import './rightstyles.scss'

const Scaffold = () => {
  return (
    <div className="scaffold">
      <div className='topbar'>
        <div className='chat-title'>
          <img src='src/assets/profile.png' width='30px' height='30px'></img>
          <p className='allyname'>Friend</p>
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