import BlogCard from '../components/BlogCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Menu from '../components/Menu';

interface Type {
    type: string;
}

const Home = ({ type }: Type) => {
    const [posts, setPosts] = useState<[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            await axios.get(`/posts/${type}`).then(res => setPosts(res.data));
        };
        fetchPosts();
    }, [type]);

    return (
        <main>
            <div className="bg-indigo-500 text-center text-white py-10">
                <h1 className="text-5xl mb-4 font-black">Beluga</h1>
                <p className="text-2xl">A place to share your knowledge</p>
            </div>
            <div className="w-full max-w-5xl mx-auto px-4">
                <Menu />

                {posts.map((post: any) => (
                    <BlogCard post={post} key={post._id} />
                ))}
            </div>
        </main>
    );
};

export default Home;
