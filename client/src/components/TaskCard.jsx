import { useTasks} from "../context/TaskContext"
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {

  const navigate = useNavigate()

  const { deleteTask, toggleTaskDone } = useTasks()
  const handleDone = async () => {
    await toggleTaskDone(task.id)
  }

  return (
    <div className="bg-zinc-600 text-white my-5 rounded-md p-4  ">
    <header className="flex justify-between ">
      <h2 className="text-sm font-bold">{task.title}</h2>
      <span>{task.done === 1 ? "done ✓" : "not done ⨯"}</span>
    </header>
      <p className="text-xs">{task.description}</p>
      <span> created at {task.createdAt}</span>
      <div className="flex gap-x-2 ">
        <button className="bg-red-400 px-2 py-1" onClick={() => deleteTask(task.id)}>detele</button>
        <button className="bg-slate-300 px-2 py-1" onClick={() => navigate(`edit/${task.id}`)}>edit</button>
        <button className="bg-green-500 px-2 py-1" onClick={() => handleDone()}>Toggle Task</button>
      </div>
    </div>
  );
};

export default TaskCard;
