import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [name, setName] = useState<String>('');
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios
            .post('auth/signup', {
                name,
                email,
                password,
            })
            .then(res => {
                toast.success('🦄 Sign Up Success', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            })
            .catch(err => {
                toast.error(`User of Email already exists`, {
                    position: 'top-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <section className=" mt-8">
            <div className="text-center">
                <h1 className="text-5xl mb-2 ">Sign Up</h1>
                <Link to="/signin" className="text-green-500 ">
                    Have an account?
                </Link>
            </div>
            <form
                className="mx-auto flex flex-col items-center mt-4"
                onSubmit={handleSubmit}
            >
                <input
                    className="py-2 px-2 w-80 "
                    type="text"
                    onChange={e => setName(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    className="py-2 px-2 w-80 "
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />

                <input
                    className="py-2 px-2 w-80 "
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />

                <button
                    className="bg-green-600 px-4 py-2 rounded-md text-white mt-5 hover:bg-green-500"
                    type="submit"
                >
                    Sign Up
                </button>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
            </form>
        </section>
    );
};

export default SignUp;
