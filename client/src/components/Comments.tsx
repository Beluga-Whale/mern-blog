import { useAppSelector } from '../app/hooks';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

interface PostId {
    postId: any;
}

const Comments = ({ postId }: PostId) => {
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<[]>([]);
    const { user } = useAppSelector(state => state.users);

    useEffect(() => {
        const fetchComments = async () => {
            await axios
                .get(`/comments/${postId._id}`)
                .then(res => setComments(res.data));
        };
        fetchComments();
    }, [postId, comment]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post(`/comments`, {
            desc: comment,
            postId: postId._id,
        });
        setComment('');
    };

    return (
        <section>
            {user && (
                <form onSubmit={handleSend} className="flex mb-6 items-center">
                    <img
                        className="rounded-full w-10 h-10 object-cover mr-2"
                        src={user.img}
                        alt=""
                    />
                    <input
                        className="py-2 px-2 w-80"
                        type="text"
                        onChange={e => setComment(e.target.value)}
                        value={comment}
                        placeholder="Add your comments..."
                    />
                    {comment ? (
                        <button
                            className="bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-500"
                            type="submit"
                        >
                            Send Comment
                        </button>
                    ) : (
                        <button
                            className="bg-gray-500 px-4 py-2 rounded-md text-white "
                            type="submit"
                            disabled
                        >
                            Send Comment
                        </button>
                    )}
                </form>
            )}
            {comments?.map((comdesc: any) => (
                <Comment key={comdesc._id} comdesc={comdesc} />
            ))}
        </section>
    );
};

export default Comments;
