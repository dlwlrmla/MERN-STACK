import { createContext, useContext, useState } from "react";
import {
  getTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest,
  toggleTaskDoneRequest,
} from "../api/tasks.api";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskContexProvider");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    const response = await getTasksRequest();
    setTasks(response.data);
  };

  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      console.log(response);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id);
      //console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const createTasks = async (task) => {
    try {
      const response = await createTaskRequest(task);
      //setTasks([...tasks, response.data])
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTaskDone = async (id) => {
    try {
      const taskFound = tasks.find((task) => task.id === id);
      await toggleTaskDoneRequest(id, taskFound.done === 0 ? true : false);
      tasks.map((task) =>
        task.id === id ? (task.done = task.done === 0 ? 1 : 0) : task.done
      );
      setTasks([...tasks]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        getData,
        deleteTask,
        createTasks,
        getTask,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
