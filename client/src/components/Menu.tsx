import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="flex justify-start w-3/4 my-4 mx-auto">
            <div className="mr-4 focus-within:text-indigo-600 focus-within:font-black">
                <Link to="/">Global Feed</Link>
            </div>
            <div className="focus-within:text-indigo-600 focus-within:font-black ">
                <Link to="/trends">Trend Feed</Link>
            </div>
        </div>
    );
};

export default Menu;
