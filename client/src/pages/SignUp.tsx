import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
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
                />
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
                    Sign Up
                </button>
            </form>
        </section>
    );
};

export default SignUp;
