import { AiFillHeart } from 'react-icons/ai';
import { format } from 'timeago.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

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

    const like = async () => {
        if (!user) {
            navigate('/signin');
        } else {
            await axios.put(`/users/like/${post._id}`);
        }
    };

    return (
        <div className=" w-3/4 my-6 mx-auto ">
            <div className="flex justify-between">
                <div className="flex ">
                    <img
                        src="https://images.unsplash.com/photo-1633382931031-4475750b6837?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJlc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        className="rounded-full h-14 w-14 object-cover "
                    />
                    <div className="flex flex-col ml-2">
                        <p className="text-indigo-500">{writer.name}</p>

                        <p>
                            {post.views} views • {format(post.createdAt)}
                        </p>
                    </div>
                </div>
                <div>
                    <div
                        className=" flex items-center border border-purple-600 px-2 py-1 rounded-md text-indigo-500 cursor-pointer hover:bg-indigo-500 hover:text-white "
                        onClick={like}
                    >
                        <AiFillHeart />
                        <p className="ml-2 "> {post.likes.length} </p>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="font-bold">{post.title}</h1>
                <p className="text-gray-400">{post.desc}</p>
                <button className="border border-purple-600 text-indigo-500 px-4 py-2 rounded-md mt-4 hover:bg-indigo-500 hover:text-white  ">
                    Read more...
                </button>
            </div>
        </div>
    );
};

export default BlogCard;
