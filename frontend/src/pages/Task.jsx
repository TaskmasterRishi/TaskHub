import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {

  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stage: "todo"
  });
  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);


  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({
          title: data.task.title,
          description: data.task.description,
          stage: data.task.stage
        });
      });
    }
  }, [mode, authState, taskId, fetchData]);



  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      title: task.title,
      description: task.description,
      stage: task.stage
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    console.log("Submitting task with data:", formData);

    const updatedFormData = {
      ...formData
    };

    if (mode === "add") {
      const config = { url: "/tasks", method: "post", data: updatedFormData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
    else {
      const config = { url: `/tasks/${taskId}`, method: "put", data: updatedFormData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
  }


  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <MainLayout>
        <form className='m-auto my-16 max-w-[1000px] bg-white p-8 border border-gray-100 rounded-xl shadow-sm'>
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className='text-center mb-6 text-2xl font-semibold text-gray-800'>{mode === "add" ? "Add New Task" : "Edit Task"}</h2>
              <div className="mb-5">
                <label htmlFor="title" className="block mb-2 font-medium text-gray-700">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  id="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter task title"
                />
                {fieldError("title")}
              </div>
              <div className="mb-5">
                <label htmlFor="description" className="block mb-2 font-medium text-gray-700">Description</label>
                <Textarea 
                  name="description" 
                  id="description" 
                  value={formData.description} 
                  placeholder="Write your task description here..." 
                  onChange={handleChange}
                  className="min-h-[150px]"
                />
                {fieldError("description")}
              </div>
              <div className="mb-6">
                <label htmlFor="stage" className="block mb-2 font-medium text-gray-700">Stage</label>
                <select
                  name="stage"
                  id="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 font-medium rounded-lg transition-colors'
                  onClick={handleSubmit}
                >
                  {mode === "add" ? "Add task" : "Update Task"}
                </button>
                <button 
                  className='ml-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 font-medium rounded-lg transition-colors' 
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
                {mode === "update" && (
                  <button 
                    className='ml-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 font-medium rounded-lg transition-colors'
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </MainLayout>
    </>
  )
}

export default Task