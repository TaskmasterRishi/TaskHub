import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authState.user?.name) {
      setIsLoading(false);
    }
  }, [authState]);

  useEffect(() => {
    document.title = authState.isLoggedIn && authState.user?.name ? 
      `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);

  useEffect(() => {
    console.log("Auth State:", authState);
    console.log("Is Logged In:", authState.isLoggedIn);
    console.log("User Object:", authState.user);
    console.log("User Name:", authState.user?.name);
    console.log("Token:", authState.token);
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className='bg-gradient-to-r from-primary to-primary-dark text-white h-[50vh] py-16 text-center flex flex-col justify-center'>
            <div className="max-w-2xl mx-auto px-4">
              <h1 className='text-4xl font-bold mb-6'>Welcome to Task Manager</h1>
              <p className="text-lg mb-8 text-gray-100">Organize your tasks efficiently and boost your productivity</p>
              <Link to="/signup" className='inline-flex items-center justify-center mt-6 px-8 py-3.5 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl'>
                Get Started <i className="fa-solid fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className='text-2xl font-semibold text-gray-800 mb-8'>
                Welcome back, <span className="text-blue-600">
                {authState.user?.username || authState.user?.email || 'Not set'}
                </span>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* To Do Column */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    To Do
                  </h2>
                  <Tasks status="todo" droppableId="todo" />
                </div>

                {/* In Progress Column */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    In Progress
                  </h2>
                  <Tasks status="in-progress" droppableId="in-progress" />
                </div>

                {/* Completed Column */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Completed
                  </h2>
                  <Tasks status="completed" droppableId="completed" />
                </div>
              </div>
            </div>
          </>
        )}
      </MainLayout>
    </>
  )
}

export default Home