import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPost = async () => {
            await axios.get(`/posts/find/${id}`).then(res => {
                setTitle(res.data.title);
                setDesc(res.data.desc);
            });
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.put(`/posts/${id}`, {
            title,
            desc,
        });
        navigate(`/blog/${id}`);
    };

    return (
        <div className='className="w-full max-w-4xl mx-auto px-4 mt-10 "'>
            <h1 className="text-5xl mb-5">Edit the article</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="w-full px-3 py-4 text-xl border-2  rounded-sm border-slate-400 "
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    placeholder="Article Title"
                />
                <textarea
                    className="w-full px-3 py-4 text-xl mt-5 border-2  rounded-sm border-slate-400 "
                    onChange={e => setDesc(e.target.value)}
                    value={desc}
                    placeholder="Write you article in area"
                ></textarea>

                <button
                    className="bg-indigo-500 mt-5 text-center text-white py-4 px-3 rounded-md"
                    type="submit"
                >
                    Publish Article
                </button>
            </form>
        </div>
    );
};

export default EditBlog;
