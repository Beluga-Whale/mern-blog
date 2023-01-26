import { AiFillHeart } from 'react-icons/ai';

const BlogCard = () => {
    return (
        <div className=" w-3/4 my-6 mx-auto ">
            <div className="flex justify-between">
                <div className="flex ">
                    <img
                        src="https://images.unsplash.com/photo-1633382931031-4475750b6837?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJlc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        className="rounded-full h-14 w-14 object-cover "
                    />
                    <div className="flex flex-col ml-2">
                        <p className="text-indigo-500">Anah Benešová</p>

                        <p>December 9, 2022</p>
                    </div>
                </div>
                <div>
                    <div className=" flex items-center border border-purple-600 px-2 py-1 rounded-md text-indigo-500 cursor-pointer hover:bg-indigo-500 hover:text-white ">
                        <AiFillHeart />
                        <p className="ml-2 ">2045</p>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                    numquam quasi ducimus fugit sit atque explicabo, blanditiis
                    necessitatibus vero doloremque nostrum. Explicabo, autem
                    dolor dicta facere tenetur saepe est illum.
                </h1>
                <p className="text-gray-400">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Omnis voluptas quidem corporis atque, dicta aspernatur
                    corrupti architecto eligendi odio vero, nobis cupiditate?
                    Aliquid, et pariatur accusantium sunt illum eum placeat.
                </p>
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 ">
                    Read more...
                </button>
            </div>
        </div>
    );
};

export default BlogCard;
