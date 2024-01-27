// TaskBoard.js
import React, { useState } from 'react';
import AddTaskModal from './AddTaskModal';
import SearchTask from './SearchTask';
import TaskList from './TaskList';
import { useTaskContext } from '../context/TaskContext';

const TaskBoard = () => {
  const { state, dispatch } = useTaskContext();
  const { tasks } = state;

  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddTask = (newTask, isAdd) => {
    if (isAdd) {
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } else {
      dispatch({ type: 'UPDATE_TASK', payload: newTask });
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

 const handleSearch = (searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    if (lowercasedSearchTerm === '') {
      // If the search term is empty, show all tasks
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } else {
      // Filter tasks based on the search term
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(lowercasedSearchTerm)
      );

      dispatch({ type: 'SET_TASKS', payload: filtered });
    }
  };

  const handleDeleteTask = (taskId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');

    if (isConfirmed) {
      dispatch({ type: 'DELETE_TASK', payload: taskId });
    }
  };

  const onDeleteAllClick = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete all tasks?');

    if (isConfirmed) {
      dispatch({ type: 'DELETE_ALL_TASKS' });
    }
  };

  const handleFavorite = (taskId) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, isFavorite: !getTaskById(taskId).isFavorite } });
  };

  const handleCloseClick = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  // Helper function to get task by ID
  const getTaskById = (taskId) => tasks.find((task) => task.id === taskId) || {};

  return (
    <div>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            onSave={handleAddTask}
            taskToUpdate={taskToUpdate}
            onCloseClick={handleCloseClick}
          />
        )}
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <div className="mb-14 items-center justify-between sm:flex">
              <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
              <div className="flex items-center space-x-5">
                <SearchTask onSearch={handleSearch} />
                <button
                  className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
                  onClick={() => setShowAddModal(true)}
                >
                  Add Task
                </button>
                <button
                  className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
                  onClick={onDeleteAllClick}
                >
                  Delete All
                </button>
              </div>
            </div>
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onFav={handleFavorite}
              />
            ) : (
              <p className="text-center text-gray-400">The task list is empty.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskBoard;
