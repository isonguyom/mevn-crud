<template>
  <main>
    <h1 class="title">MEVN CRUD APP</h1>

    <form @submit.prevent="addTodo" method="post">
      <input
        class="input"
        v-model="title"
        type="text"
        name="name"
        placeholder="Enter todo"
      />
      <input
        class="input"
        v-model="description"
        type="text"
        name="description"
        placeholder="Enter Description"
      />
      <button type="submit" class="submit-btn">Add Todo</button>
    </form>
    <div class="todo-wrapper">
      <h2 class="caption">Todo List</h2>
      <ul>
        <li class="todo-item" v-for="(todo, i) in todos" :key="todo._id">
          <div class="todo">
            <h3 class="todo-title">{{ todo.title }}</h3>
            <span class="todo-description">{{ todo.description }}</span>
          </div>
          <div class="todo-btns">
            <button
              type="button"
              class="edit-btn"
              @click="updateTodo(todo._id, todo)"
            >
              <span v-if="!openEdit">Edit</span><span v-else>Save</span>
            </button>
            <button type="button" class="del-btn" @click="delTodo(todo._id, i)">
              Delete
            </button>
          </div>
          <form
            class="update-form"
            id="updateForm"
            :class="{ active: openEdit }"
            method="post"
          >
            <input
              type="text"
              name="updateTitle"
              id="updateTodo"
              v-model="todo.title"
            />
            <br />
            <input
              type="text"
              name="updateDescription"
              id="updateTodo"
              v-model="todo.description"
            />
          </form>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      title: "",
      description: "",
      todos: [],
      openEdit: false,
      updateTitle: "",
      updateDescription: "",
    };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      const res = await axios.get("/api/todoList");
      this.todos = res.data;
    },

    async addTodo() {
      const res = await axios.post("api/todoList/", {
        title: this.title,
        description: this.description,
      });
      this.todos.push(res.data);
      this.title = "";
      this.description = "";
    },

    async delTodo(id, i) {
      await axios.delete(`api/todoList/${id}`);
      this.todos.splice(i, 1);
    },

    async updateTodo(id, todo) {
      if (!this.openEdit) {
        // this.updateTitle = todo.title
        // this.updateDescription = todo.description
        this.openEdit = true;
      } else {
        const res = await axios.post(`api/todoList/${id}`, {
          title: todo.title,
          description: todo.description,
        });
        this.updateTitle = todo.title;
        this.updateDescription = todo.description;
        this.openEdit = false;
      }
    },
  },
};
</script>
