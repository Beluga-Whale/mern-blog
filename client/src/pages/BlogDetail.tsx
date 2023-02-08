import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { format } from 'timeago.js';
import axios from 'axios';
import { useAppSelector } from '../app/hooks';

const BlogDetail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState<any>({});
    const [writer, setWriter] = useState<any>({});
    const { user } = useAppSelector(state => state.users);

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
    }, [id]);

    const handleDelete = async () => {
        await axios.delete(`/posts/${id}`);
        navigate('/');
    };

    return (
        <section>
            <div className="bg-indigo-500  text-white py-10">
                <div className="w-full max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl mb-4 ">{detail.title}</h1>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <img
                                src="https://images.unsplash.com/photo-1633382931031-4475750b6837?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJlc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
                                <button className="bg-slate-400 px-3 py-1 rounded">
                                    Follow {writer.name}
                                </button>
                                <button className="ml-4 flex items-center bg-green-600 px-3 py-1 rounded">
                                    <AiFillHeart /> <p>Like Article</p>
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
