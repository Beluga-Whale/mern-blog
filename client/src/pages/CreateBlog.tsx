import axios from 'axios';
import { useState } from 'react';

const CreateBlog = () => {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');

    const handleSubmit = async () => {
        await axios.post(`/posts`, {
            title,
            desc,
        });
    };

    return (
        <div className='className="w-full max-w-4xl mx-auto px-4 mt-10 "'>
            <h1 className="text-5xl mb-5">Create new article</h1>
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

export default CreateBlog;
