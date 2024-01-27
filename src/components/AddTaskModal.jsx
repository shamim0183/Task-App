// AddTaskModal.js
import React, { useState } from 'react';

const AddTaskModal = ({ onSave, taskToUpdate, onCloseClick }) => {
  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      tags: [],
      priority: '',
      isFavourite: false,
    }
  );

  const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null));
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === 'tags') {
      value = value.split(',');
    }

    setTask({
      ...task,
      [name]: value,
    });
  };

  const { title, description, tags, priority } = task;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!title || !description || !tags || !priority) {
      setErrorMessage('All fields are required');
      return;
    }

    onSave(task, isAdd);
    onCloseClick();
  };

  return (
    <>
      <div className="bg-black bg-opacity-70 h-screen w-screen z-10 fixed top-0 left-0"></div>
      <form
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/4 left-1/3"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAdd ? 'Add New Task' : 'Edit Task'}
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2 mb-6">{errorMessage}</p>
        )}

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
                value={tags}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                value={priority}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-center lg:mt-20">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80 mr-4"
          >
            {isAdd ? 'Create new Task' : 'Save'}
          </button>
          <button
            type="button"
            className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={onCloseClick}
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTaskModal;
