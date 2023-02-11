import { Link } from 'react-router-dom';

const MenuProfile = () => {
    return (
        <div className="flex justify-start w-3/4 my-4 mx-auto">
            <div className="mr-4 focus-within:text-indigo-600 focus-within:font-black ">
                <Link to="/ProfileUser">My Articles</Link>
            </div>
            <div className="focus-within:text-indigo-600 focus-within:font-black ">
                <Link to="/ProfileUser/favorited">Favorited Follower</Link>
            </div>
        </div>
    );
};

export default MenuProfile;
