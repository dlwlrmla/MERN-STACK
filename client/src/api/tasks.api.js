import axios from "axios"

export const getTasksRequest = async () => {
    return await axios.get('http://localhost:3000/tasks')
}

export const createTaskRequest = async (task) => {
    return await axios.post('http://localhost:3000/tasks', task) 
}

export const deleteTaskRequest = async (id) => {
    return await axios.delete(`http://localhost:3000/tasks/${id}`)
}

export const getTaskRequest = async (id) => {
    return await axios.get(`http://localhost:3000/tasks/${id}`)
}

export const updateTaskRequest =  async (id, newFields) => {
    return await axios.put(`http://localhost:3000/tasks/${id}`, newFields)
}

export const toggleTaskDoneRequest = async(id, done) => {
    await axios.put(`http://localhost:3000/tasks/${id}`,{ done })
}