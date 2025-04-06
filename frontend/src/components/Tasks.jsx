import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Tasks = ({ status, droppableId }) => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => {
      // Filter tasks based on the status prop
      const filteredTasks = data.tasks.filter(task => task.stage === status);
      setTasks(filteredTasks);
    });
  }, [authState.token, fetchData, status]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn]);

  useEffect(() => {
    console.log("Tasks data:", tasks);
  }, [tasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Get the task being moved
    const task = tasks.find(task => task._id === draggableId);
    
    // Update the task status based on the destination column
    const newStatus = destination.droppableId;
    const updatedTask = { ...task, stage: newStatus };

    // Update the task in the backend
    const config = { 
      url: `/tasks/${task._id}`, 
      method: "put", 
      data: updatedTask, 
      headers: { Authorization: authState.token } 
    };
    
    fetchData(config).then(() => {
      // Remove the task from the current column
      const newTasks = tasks.filter(t => t._id !== task._id);
      setTasks(newTasks);
    });
  }

  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            className="space-y-4 min-h-[100px]"
          >
            {tasks.length === 0 ? (
              <div className='text-center text-gray-500 py-4'>
                No tasks in this category
              </div>
            ) : (
              tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'
                    >
                      <div className='flex items-center justify-between'>
                        <div>
                          <h3 className='font-medium text-gray-800'>{task.title}</h3>
                          <p className='text-sm text-gray-600 mt-1'>{task.description}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Tooltip text={"Edit this task"} position={"top"}>
                            <Link to={`/tasks/${task._id}`} className='text-blue-500 hover:text-blue-600'>
                              <i className="fa-solid fa-pen"></i>
                            </Link>
                          </Tooltip>
                          <Tooltip text={"Delete this task"} position={"top"}>
                            <button 
                              onClick={() => handleDelete(task._id)} 
                              className='text-red-500 hover:text-red-600'
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Tasks