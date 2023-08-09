//TodoList.js
import { Router } from "express";
import Todo from "../../models/Todo.js";

const router = Router();

router
  .route("/")
  .get(async (_req, res) => {
    try {
      const todoList = await Todo.find();
      if (!todoList) throw new Error("No Todo List found");
      res.status(200).json(todoList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .post(async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
      const todo = await newTodo.save();
      if (!todo) throw new Error("Something went wrong saving the Todo");
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router
  .route("/:id")
  .put(async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await Todo.findByIdAndUpdate(id, { ...req.body });
      if (!updated) throw Error("Something went wrong ");
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const removed = await Todo.findByIdAndDelete(id);
      if (!removed) throw Error("Something went wrong ");
      res.status(200).json(removed);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await Todo.findById(id);
      if (!todo) throw new Error("No Todo found");
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;
