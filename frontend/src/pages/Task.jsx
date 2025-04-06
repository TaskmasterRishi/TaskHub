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
    if (mode === "add") {
      setFormData({
        title: "",
        description: "",
        stage: "todo"
      });
      setFormErrors({});
    }
  }, [mode]);

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
        <form className='m-auto my-16 max-w-[1000px] bg-white p-8 border border-gray-100 rounded-xl shadow-lg'>
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className='text-center mb-8 text-3xl font-bold text-gray-800'>
                {mode === "add" ? "Create New Task" : "Edit Task"}
                <div className="mt-2 w-12 h-1 bg-primary rounded-full mx-auto"></div>
              </h2>
              
              <div className="mb-6">
                <label htmlFor="title" className="block mb-3 text-lg font-semibold text-gray-700">Task Title</label>
                <input 
                  type="text" 
                  name="title" 
                  id="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg"
                  placeholder="Enter task title"
                />
                {fieldError("title")}
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block mb-3 text-lg font-semibold text-gray-700">Task Description</label>
                <Textarea 
                  name="description" 
                  id="description" 
                  value={formData.description} 
                  placeholder="Write a detailed description of your task..." 
                  onChange={handleChange}
                  className="min-h-[200px] p-4 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                {fieldError("description")}
              </div>

              <div className="mb-8">
                <label htmlFor="stage" className="block mb-3 text-lg font-semibold text-gray-700">Task Status</label>
                <select
                  name="stage"
                  id="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-4">
                {mode === "update" && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all"
                  >
                    Reset Changes
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-3 text-white bg-primary hover:bg-primary-dark rounded-xl font-semibold transition-all"
                >
                  {mode === "add" ? "Create Task" : "Save Changes"}
                </button>
              </div>
            </>
          )}
        </form>
      </MainLayout>
    </>
  )
}

export default Task