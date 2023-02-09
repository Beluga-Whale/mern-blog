import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { format } from 'timeago.js';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { subscription } from '../features/userSlice';
import { like } from '../features/postSlice';

const BlogDetail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState<any>({});
    const [writer, setWriter] = useState<any>({});
    const { user } = useAppSelector(state => state.users);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postRes = await axios.get(`/posts/find/${id}`);

                const writeRes = await axios.get(
                    `/users/find/${postRes.data.userId}`
                );
                setDetail(postRes.data);
                setWriter(writeRes.data);
            } catch (err) {}
        };
        fetchData();
    }, [id, dispatch]);

    const handleDelete = async () => {
        await axios.delete(`/posts/${id}`);
        navigate('/');
    };

    const handleLike = async () => {
        if (!user) {
            navigate('/signin');
        } else {
            detail.likes.includes(user._id)
                ? await axios.put(`/users/dislike/${detail._id}`)
                : await axios.put(`/users/like/${detail._id}`);
        }
    };

    const handleFollow = async () => {
        user.followerUsers.includes(writer._id)
            ? await axios.put(`/users/unfollow/${writer._id}`)
            : await axios.put(`/users/follow/${writer._id}`);
        dispatch(subscription(writer._id));
    };

    return (
        <section>
            <div className="bg-indigo-500  text-white py-10">
                <div className="w-full max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl mb-4 ">{detail.title}</h1>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <img
                                src={writer.img}
                                alt=""
                                className="rounded-full h-9 w-9 object-cover "
                            />
                            <div className="flex flex-col ml-2">
                                <h1 className="font-medium">{writer.name}</h1>
                                <p className="text-xs text-gray-300 ">
                                    {format(detail.createdAt)}
                                </p>
                            </div>
                        </div>
                        {user === null ? (
                            <div className="flex ml-4 items-center">
                                <button className="bg-slate-400 px-3 py-1 rounded">
                                    Follow {writer.name}
                                </button>
                                <button className="ml-4 flex items-center bg-green-600 px-3 py-1 rounded">
                                    <AiFillHeart /> <p>Like Article</p>
                                </button>
                            </div>
                        ) : user._id === detail.userId ? (
                            <div className="flex ml-4 items-center">
                                <Link to={`/Editor/${detail._id}`}>
                                    <button className="bg-slate-400 px-3 py-1 rounded">
                                        Edit Article
                                    </button>
                                </Link>
                                <button
                                    className="ml-4 bg-red-600 px-3 py-1 rounded"
                                    onClick={handleDelete}
                                >
                                    Delete Article
                                </button>
                            </div>
                        ) : (
                            <div className="flex ml-4 items-center">
                                <button
                                    className="bg-slate-400 px-3 py-1 rounded"
                                    onClick={handleFollow}
                                >
                                    {user.followerUsers?.includes(writer._id)
                                        ? 'Unfollow'
                                        : `Follow ${writer.name}`}
                                </button>
                                <button
                                    className="ml-4 flex items-center bg-green-600 px-3 py-1 rounded"
                                    onClick={handleLike}
                                >
                                    <AiFillHeart className="mr-1" />
                                    {detail.likes?.includes(user._id)
                                        ? 'Liked'
                                        : 'Like Article'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full max-w-5xl mx-auto px-4 m-5">
                <p className="mb-5">{detail.desc}</p>
                <hr />
            </div>
        </section>
    );
};

export default BlogDetail;
