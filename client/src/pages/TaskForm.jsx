import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useTasks} from "../context/TaskContext"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {

const { createTasks, getTask, updateTask} = useTasks()
const params = useParams()
const navigate = useNavigate()
const [task1, setTask] = useState({
  title:'',
  description:""
})



useEffect( () => {

  const loadTask = async () => {
    if(params.id){
      const [task] = await getTask(params.id)
      setTask({
        title :task.title,
        description: task.description
      })
    }
  }
  loadTask()
  
}, []) 


  return (
    <div >
      <Formik
        initialValues={task1}
        enableReinitialize= {true}
        onSubmit={async (values, actions) => {
          console.log(values);
          if(params.id){
              await updateTask(params.id, values)
          }
          else{
            await createTasks(values)
          }
          setTask({title:"", description:""})
          navigate("/")
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">

            <h1 className="text-xl font-bold uppercase text-center">{params.id ? "edit task " : "create task"}</h1>
            <label className="block">title</label>
            <input
              type="text"
              name="title"
              placeholder="write a title"
              onChange={handleChange}
              value={values.title}
              className="px-2 py-1 rounded-sm w-full"
            />
            <label className="block">description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="write a description"
              onChange={handleChange}
              value={values.description}
              className="px-2 py-1 rounded-sm w-full"
            ></textarea>

            <button className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cargando " : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
