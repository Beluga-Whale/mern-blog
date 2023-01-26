import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { fetchUserByLogin } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(fetchUserByLogin({ email, password }));
        navigate('/');
    };
    return (
        <section className=" mt-8">
            <div className="text-center">
                <h1 className="text-5xl mb-2 ">Sign In</h1>
                <Link to="/signup" className="text-green-500 ">
                    Need an account?
                </Link>
            </div>
            <form
                className="mx-auto flex flex-col items-center mt-4"
                onSubmit={handleSubmit}
            >
                <input
                    className="py-2 px-2 w-80 "
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <input
                    className="py-2 px-2 w-80 "
                    type="text"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <button
                    className="bg-green-600 px-4 py-2 rounded-md text-white mt-5 hover:bg-green-500"
                    type="submit"
                >
                    Sign In
                </button>
            </form>
        </section>
    );
};

export default SignIn;
