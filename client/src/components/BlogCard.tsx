import { AiFillHeart } from 'react-icons/ai';
import { format } from 'timeago.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useNavigate, Link } from 'react-router-dom';

interface postDetail {
    post: any;
}

const BlogCard = ({ post }: postDetail) => {
    const [writer, setWriter] = useState<any>({});
    const { user } = useAppSelector(state => state.users);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWriter = async () => {
            const res = await axios.get(`/users/find/${post.userId}`);
            setWriter(res.data);
        };
        fetchWriter();
    }, [post.userId]);

    const handleLike = async () => {
        if (!user) {
            navigate('/signin');
        } else {
            post.likes.includes(user._id)
                ? await axios.put(`/users/dislike/${post._id}`)
                : await axios.put(`/users/like/${post._id}`);
        }
    };

    return (
        <div className=" w-3/4 my-6 mx-auto ">
            <div className="flex justify-between">
                <div className="flex ">
                    <img
                        src={writer.img}
                        alt=""
                        className="rounded-full h-14 w-14 object-cover "
                    />
                    <div className="flex flex-col ml-2">
                        <p className="text-indigo-500 font-bold">
                            {writer.name}
                        </p>

                        <p>{format(post.createdAt)}</p>
                    </div>
                </div>
                <div>
                    <div
                        className=" flex items-center border border-purple-600 px-2 py-1 rounded-md text-indigo-500 cursor-pointer hover:bg-indigo-500 hover:text-white "
                        onClick={handleLike}
                    >
                        <AiFillHeart />
                        {post.likes?.includes(user._id) ? (
                            <p className="ml-2 "> {post.likes.length}Liked </p>
                        ) : (
                            <p className="ml-2 "> {post.likes.length} </p>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <h1 className="font-bold">{post.title}</h1>
                <p className="text-gray-400">{post.desc.substring(0, 240)}</p>
                <Link to={`/blog/${post._id}`}>
                    <button className="border border-purple-600 text-indigo-500 px-4 py-2 rounded-md mt-4 hover:bg-indigo-500 hover:text-white">
                        Read more...
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
