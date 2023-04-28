import Rightbar from "../components/right/Rightbar";
import Sidebar from "../components/left/Sidebar";

const Home = () => {
    return (
        <div className='app'>
            <div className='home-container'>
                <Sidebar />
                <Rightbar />
            </div>
        </div>
    );
};

export default Home;