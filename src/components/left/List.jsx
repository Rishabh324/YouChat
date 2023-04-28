import './leftstyle.scss'

const List = () => {
    return (
        <div className="list">
            <div className="userchat">
                <img src="src\assets\profile.png" width="40px" height='40px' />
                <div className="userinfo">
                    <p><span>Username</span></p>
                    <p style={{color: '#b9b9c1'}}>Hello</p>
                </div>
            </div>
        </div>
    )
}; 

export default List;