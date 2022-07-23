import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "select * from tasks order by createdAt asc "
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message});
  }
};

export const getTask = async (req, res) => {
    try {
        const [result] = await pool.query("select * from tasks where id = ?", [
            req.params.id,
        ]);
        if (result.length === 0) {
            res.status(404).json({ message: error.message});
        }
        res.send(result);
    } catch (error) {
        return res.status(500)
      .json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const [result] = await pool.query(
            "insert into tasks (title, description) values (?, ?)",
            [title, description]
        );
        res.json({
            id: result.insertId,
            title,
            description,
        });
        
    } catch (error) {
        return res.status(500)
      .json({ message: error.message });
    }
};
export const updateTask = async (req, res) => {
    try {
        const result = await pool.query("update tasks set ? where id= ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
        
    } catch (error) {
        return res.status(500)        
        .json({ message : error.message})
    }
};
export const deleteTask = async (req, res) => {
    try {
        const [objeto] = await pool.query("select * from tasks where id = ?", [
            req.params.id,
        ]);
        console.log("item eliminado ", objeto);
        const [result] = await pool.query(
            "delete from tasks where id = ?",
            req.params.id
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "id not found" });
        } else {
            res.status(200).json({ message: "delete completed", objeto });
        }
        
    } catch (error) {
        return res.status(500)        
        .json({ error: error.message})
    }
};
