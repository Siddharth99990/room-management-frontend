import {useAuth}from '../context/AuthContext';
const HomePage=()=>{
    const {user}=useAuth();
    return(
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 transition-all duration-500">
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:pu-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="space-y-6 sm:space-y-8 ">
                        <div className="space-y-4 sm:space-y-6">
                            <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight'>
                                Welcome,
                                <span className=" block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                    {user?.name}
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;