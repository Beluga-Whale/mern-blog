import { useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';

const MyAricle = () => {
    const [myPosts, setMyPosts] = useState<[]>([]);
    const { user } = useAppSelector(state => state.users);
    useEffect(() => {
        const fetchMyPost = async () => {
            await axios.get(`/posts/findmypost/${user._id}`).then(res => {
                setMyPosts(res.data);
            });
        };
        fetchMyPost();
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto px-4 mt-14">
            {myPosts?.map((post: any) => (
                <BlogCard post={post} key={post._id} />
            ))}
        </div>
    );
};

export default MyAricle;
