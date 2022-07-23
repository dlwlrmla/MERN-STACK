import { useEffect, useState } from "react";
import { getTasksRequest } from "../api/tasks.api";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

const TaskPage = () => {
  const { tasks, getData } = useTasks();

  useEffect(() => {
    getData();
  }, []);

  const RenderMain = () => {
    if (tasks.length > 0)
      return tasks.map((task) => <TaskCard key={task.id} task={task} />);
    return <p>no hay tareas aun </p>;
  };

  return (
    <>
      <div>
        <h1 className="text-5xl text-white font-bold text-center">Tasks</h1>
        <div className="grid grid-cols-3 gap-2">
          <RenderMain />
        </div>
      </div>
    </>
  );
};

export default TaskPage;
