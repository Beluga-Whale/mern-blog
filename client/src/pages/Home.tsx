import BlogCard from '../components/BlogCard';

const Home = () => {
    return (
        <main>
            <div className="bg-indigo-500 text-center text-white py-10">
                <h1 className="text-5xl mb-4 font-black">Beluga</h1>
                <p className="text-2xl">A place to share your knowledge</p>
            </div>
            <div className="w-full max-w-5xl mx-auto px-4">
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
        </main>
    );
};

export default Home;
