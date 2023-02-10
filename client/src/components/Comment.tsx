import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { AiFillDelete } from 'react-icons/ai';

interface Comment {
    comdesc: any;
}

const Comment = ({ comdesc }: Comment) => {
    const [writer, setWriter] = useState<any>({});

    const { user } = useAppSelector(state => state.users);

    const handleDelete = async () => {
        await axios.delete(`/comments/${comdesc._id}`);
    };

    useEffect(() => {
        const fetchWriter = async () => {
            const res = await axios.get(`/users/find/${comdesc.userId}`);
            setWriter(res.data);
        };
        fetchWriter();
    }, []);

    return (
        <section className="mb-4">
            <div className="flex items-center">
                <img
                    className="rounded-full w-10 h-10 object-cover mr-2"
                    src={writer.img}
                    alt=""
                />
                <div>
                    <h1>{writer.name}</h1>
                    <p>{comdesc.desc}</p>
                </div>
                {user === null ? null : user._id === comdesc.userId ? (
                    <button
                        type="submit"
                        onClick={handleDelete}
                        className="ml-2 text-red-600 hover:cursor-pointer"
                    >
                        <AiFillDelete size={20} />
                    </button>
                ) : null}
                <button></button>
            </div>
        </section>
    );
};

export default Comment;
