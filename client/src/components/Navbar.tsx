import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/userSlice';
import { MdOutlineArticle } from 'react-icons/md';

const Navbar = () => {
    const [nav, setNav] = useState<boolean>(false);

    const { user } = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="flex justify-between items-center w-full max-w-5xl mx-auto px-4 my-3">
            <div>
                <h1 className="text-3xl text-indigo-500 font-black md:text-5xl ">
                    <Link to="/">Beluga</Link>
                </h1>
            </div>

            {user ? (
                <ul className="hidden  md:flex">
                    <li className="px-4  cursor-pointer    hover:scale-105 duration-200 hover:text-indigo-500 hover:font-semibold ">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4  cursor-pointer    hover:scale-105 duration-200 hover:text-indigo-500 hover:font-semibold ">
                        <Link to="#" className="flex items-center ">
                            <MdOutlineArticle size={20} className="mr-3" />
                            <p>New Article</p>
                        </Link>
                    </li>
                    <li className="px-4  cursor-pointer    hover:scale-105 duration-200 hover:text-indigo-500 hover:font-semibold ">
                        {user.name}
                    </li>

                    <li
                        className="px-4  cursor-pointer    hover:scale-105 duration-200 hover:text-indigo-500 hover:font-semibold "
                        onClick={handleLogout}
                    >
                        Logout
                    </li>
                </ul>
            ) : (
                <ul className="hidden  md:flex">
                    <li className="px-4  cursor-pointer    hover:scale-105 duration-200 hover:text-indigo-500 hover:font-semibold ">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4  cursor-pointer    hover:scale-105 duration-200 hover:text-indigo-500 hover:font-semibold ">
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li className="px-4  cursor-pointer    hover:scale-105 duration-200 hover:text-indigo-500 hover:font-semibold ">
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            )}

            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden "
            >
                {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
            </div>
            {nav ? (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-white ">
                    <li className="px-4 cursor-pointer  py-6 text-4xl">
                        <Link to="/" onClick={() => setNav(!nav)}>
                            Home
                        </Link>
                    </li>
                    <li className="px-4 cursor-pointer  py-6 text-4xl">
                        <Link to="/signin" onClick={() => setNav(!nav)}>
                            Sign In
                        </Link>
                    </li>
                    <li className="px-4 cursor-pointer  py-6 text-4xl">
                        <Link to="/signup" onClick={() => setNav(!nav)}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
            ) : null}
        </nav>
    );
};

export default Navbar;
