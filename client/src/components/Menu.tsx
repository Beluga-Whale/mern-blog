import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="flex justify-start w-3/4 my-4 mx-auto">
            <div className="mr-4">
                <Link to="/">My Feed</Link>
            </div>
            <div className="mr-4">
                <Link to="/">Global Feed</Link>
            </div>
            <div>
                <Link to="/trends">Trend Feed</Link>
            </div>
        </div>
    );
};

export default Menu;
