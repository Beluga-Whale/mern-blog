import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProfileUser from './pages/ProfileUser';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home type="random" />} />
                <Route path="/trends" element={<Home type="trend" />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/Editor" element={<CreateBlog />} />
                <Route path="/Editor/:id" element={<EditBlog />} />
                <Route path="/ProfileUser" element={<ProfileUser />} />
            </Routes>
        </>
    );
}

export default App;
