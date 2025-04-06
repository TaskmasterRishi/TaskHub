import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';

const Profile = () => {
  const authState = useSelector(state => state.authReducer);
  const [fetchData] = useFetch();
  const [taskCounts, setTaskCounts] = useState({
    todo: 0,
    'in-progress': 0,
    completed: 0
  });

  useEffect(() => {
    document.title = "Profile";
    if (authState.isLoggedIn) {
      fetchTaskCounts();
    }
  }, [authState.isLoggedIn]);

  const fetchTaskCounts = async () => {
    const config = { 
      url: "/tasks", 
      method: "get", 
      headers: { Authorization: authState.token } 
    };
    const data = await fetchData(config, { showSuccessToast: false });
    
    if (data?.tasks) {
      const counts = {
        todo: data.tasks.filter(task => task.stage === 'todo').length,
        'in-progress': data.tasks.filter(task => task.stage === 'in-progress').length,
        completed: data.tasks.filter(task => task.stage === 'completed').length
      };
      setTaskCounts(counts);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Name</label>
              <p className="mt-1 text-lg text-gray-900">
                {authState.user?.username || authState.user?.email || 'Not set'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-lg text-gray-900">
                {authState.user?.email}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-sm text-gray-500">To Do</p>
                <p className="text-2xl font-bold text-gray-700">{taskCounts.todo}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{taskCounts['in-progress']}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">{taskCounts.completed}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile; 