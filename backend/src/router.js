const express = require("express");

const tasksController = require("./controllers/tasksController");
const tasksMiddleware = require("./middlewares/tasksMiddlewares");

const router = express.Router();

router.get("/tasks", tasksController.getAll);
router.post(
  "/tasks",
  tasksMiddleware.validateTitulo,
  tasksController.createTask
);
router.delete("/tasks/:id", tasksController.deleteTask);
router.put(
  "/tasks/:id",
  tasksMiddleware.validateTitulo,
  tasksMiddleware.validateStatus,
  tasksController.updateTask
);

module.exports = router;
