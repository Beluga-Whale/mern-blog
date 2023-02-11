import { useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import MenuProfile from '../components/MenuProfile';

interface Posts {
    type: string;
}

const MyAricle = ({ type }: Posts) => {
    const [myPosts, setMyPosts] = useState<[]>([]);
    const { user } = useAppSelector(state => state.users);
    useEffect(() => {
        const fetchMyPost = async () => {
            if (type === 'findmypost') {
                await axios.get(`/posts/findmypost/${user._id}`).then(res => {
                    setMyPosts(res.data);
                });
            } else if (type === 'follow') {
                await axios.get(`/posts/${type}`).then(res => {
                    setMyPosts(res.data);
                });
            }
        };
        fetchMyPost();
    }, [type]);

    return (
        <div>
            <div className="bg-indigo-500 text-center flex flex-col items-center text-white py-10">
                <img
                    className="w-16 h-16 object-cover rounded-full"
                    src={user.img}
                    alt=""
                />
                <h1 className="text-5xl mb-4 font-black">{user.name}</h1>

                <Link
                    className="self-end mr-80 border px-2 py-2 rounded-md hover:bg-indigo-300"
                    to="/setting"
                >
                    Edit Profile Setting
                </Link>
            </div>
            <div className="max-w-5xl mx-auto px-4">
                <MenuProfile />
            </div>
            <div className="w-full max-w-5xl mx-auto px-4 mt-14">
                {myPosts?.map((post: any) => (
                    <BlogCard post={post} key={post._id} />
                ))}
            </div>
        </div>
    );
};

export default MyAricle;
