const connection = require("./connection");

const getAll = async () => {
  const tasks = await connection.execute("SELECT * FROM tasks");
  return tasks[0];
};

const createTask = async (task) => {
  const { titulo } = task;

  const dateUTC = new Date(Date.now()).toUTCString();

  const createdTask = await connection.execute(
    "INSERT INTO tasks(titulo,status,data) VALUES (?, ?, ?)",
    [titulo, "pendente", dateUTC]
  );

  return { insertId: createdTask[0].insertId };
};

const deleteTask = async (id) => {
  const removedTask = await connection.execute(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );

  return removedTask[0];
};

const updateTask = async (id, task) => {
  const { titulo, status } = task;

  const updatedTask = await connection.execute(
    "UPDATE tasks SET titulo = ? , status = ? WHERE id = ?",
    [titulo, status, id]
  );

  return updatedTask[0];
};

module.exports = { getAll, createTask, deleteTask, updateTask };
