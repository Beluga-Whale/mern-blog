import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
    const user = useAppSelector(state => state.users.user);
    const [img, setImg] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            await axios.get(`/users/find/${user._id}`).then(res => {
                setImg(res.data.img);
                setName(res.data.name);
                setEmail(res.data.email);
            });
        };
        fetchUser();
    }, [user]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.put(`/users/${user._id}`, {
            name,
            img,
            email,
        });
        dispatch(logout());
        navigate('/signin');
    };

    return (
        <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-center text-4xl">Your Settings</h1>
            <form
                onSubmit={handleUpdate}
                className="flex flex-col items-center"
            >
                <input
                    className="text-2xl px-2 py-2 rounded-md my-4 border-2 "
                    type="text"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    placeholder="URL of profile picture"
                />
                <input
                    className="text-2xl px-2 py-2 rounded-md my-4 border-2 "
                    type="text"
                    onChange={e => setImg(e.target.value)}
                    value={img}
                    placeholder="Username"
                />
                <input
                    className="text-2xl px-2 py-2 rounded-md my-4 border-2 "
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                />
                <button
                    className="bg-green-600 px-4 py-2 rounded-md text-white mt-5 hover:bg-green-500 "
                    type="submit"
                >
                    Update Settings
                </button>
            </form>
        </div>
    );
};

export default Setting;
