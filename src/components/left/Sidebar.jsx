import { signOut } from 'firebase/auth';
import List from './List';
import { auth } from '../../firebase';
import SearchBar from './SearchBar';
import './leftstyle.scss'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Sidebar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='sidebar'>
      <div className='topbar'>
        <div>
          <p className='applabel'>MatesApp</p>
        </div>
        <div className="profile-card">
          <img src={currentUser.photoURL!=null ? currentUser.photoURL : 'https://firebasestorage.googleapis.com/v0/b/matesapp-576e0.appspot.com/o/images%2Fprofile.png?alt=media&token=7dbd3cb3-577e-4254-b141-cb2fba478d84'} width="30px" height='30px' />
          <p className='user'>{currentUser.displayName}</p>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      </div>
      <div className='searchbar'>
        <SearchBar />
        <List />
      </div>
    </div>
  )
}

export default Sidebar;