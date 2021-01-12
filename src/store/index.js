import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    status: "active",
    todos: [
        {
        id: 1,
        name: "First Task",
        isCompleted: true,
        editMode: false,
        },
        {
        id: 2,
        name: "Second Task",
        isCompleted: false,
        editMode: false,
        },
        {
        id: 3,
        name: "Third Task",
        isCompleted: false,
        editMode: false,
        },
    ]
  },
  getters: {
    filterTodos(state) {
      if (state.status == "active") {
        return state.todos.filter((todo) => !todo.isCompleted);
      } else if (state.status == "completed") {
        return state.todos.filter((todo) => todo.isCompleted);
      }
      return !this.todo.isCompleted;
    },
    showRemoveAllBtn(state) {
      return state.status == "completed";
    },
    showSelectAllBtn(state) {
      return state.status == "active";
    }
  },
  mutations: {
    addTodo(state, todo){
      state.todos.push({
        id: todo.id,
        name: todo.name,
        isCompleted: todo.isCompleted,
        editMode: todo.editMode,
      })
    },
    changeStatus(state, status){
      state.status = status
    },
    editComplete(state, todo) {
      if (todo.name.trim().length == 0) {
        todo.name = this.beforeEditName;
      }
      todo.editMode = false;
    },
    removeTodo(state, id){
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    selectAll(state, checked){
      state.todos.forEach((todo) => {
        todo.isCompleted = checked;
      });
    },
    removeAllCompleted(state){
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    }
  }
})