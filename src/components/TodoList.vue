<template>
  <div class="hello">
    <input
      type="text"
      class="input-todo"
      v-model="newTodo"
      placeholder="Add a Todo"
      @keyup.enter="addTodo"
    />
    <div>
      <div class="todo-list">
        <h3>Todos</h3>
      </div>
      <div>
        <button class="button" @click="status = 'active'" autofocus>
          Active
        </button>
        <button class="button" @click="status = 'completed'">
          Completed
        </button>
      </div>
      <div class="todo-list-item" v-for="(todo, index) in filterTodos" :key="todo.id">
        <div class="todo-item-name">
          <div class="todo-item-name-checkbox">
            <input type="checkbox" v-model="todo.isCompleted" />
          </div>
          <div
            v-bind:class="
              todo.isCompleted
                ? 'todo-item-name-display-isCompleted'
                : 'todo-item-name-display'
            "
            v-if="!todo.editMode"
            @click="editTodo(todo)"
          >
            {{ todo.name }}
          </div>
          <div class="todo-item-name-edit" v-else-if="todo.editMode">
            <input
              type="text"
              v-model="todo.name"
              @blur="editComplete(todo)"
              @keyup.enter="editComplete(todo)"
              v-focus
            />
          </div>
        </div>
        <div class="remove-todo-item" @click="removeTodo(index)">&#10060;</div>
      </div>
      <br />
      <hr />
      <div class="bulk-remove-section">
        <div class="select-completed" v-if="showSelectAllBtn">
          <input type="checkbox" @change="selectAll" /><span>Select All</span>
        </div>        
        <div>
          <button class="button" v-if="showRemoveAllBtn" @click="removeAllCompleted">
            Remove All
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      newTodo: "",
      newTodoId: 4,
      beforeEditName: "",
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
      ],
    };
  },

    computed: {
    filterTodos() {
      if (this.status == 'active') {
        return this.todos.filter(todo => !todo.isCompleted)
      } else if (this.status == 'completed') {
        return this.todos.filter(todo => todo.isCompleted)
      }
      return !this.todo.isCompleted
    },
    showRemoveAllBtn(){
      return this.status == "completed"
    },
    showSelectAllBtn(){
      return this.status == "active"
    }
  },

  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      } else {
        this.todos.push({
          id: this.newTodoId,
          name: this.newTodo,
          isCompleted: false,
          editMode: false,
        });

        this.newTodo = "";
        this.newTodoId++;
      }
    },
    editTodo(todo) {
      this.beforeEditName = todo.name;
      todo.editMode = true;
    },
    editComplete(todo) {
      if (todo.name.trim().length == 0) {
        todo.name = this.beforeEditName;
      }
      todo.editMode = false;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    selectAll() {
      this.todos.forEach((todo) => {
        todo.isCompleted = event.target.checked;
      });
    },
    removeAllCompleted() {
      this.todos = this.todos.filter((todo) => !todo.isCompleted);
    },
  },
};
</script>

<style>
.input-todo {
  width: 100%;
  margin-bottom: 5px auto;
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #8080807a;
}
.input-todo:focus {
  outline: none;
}
.todo-list {
  margin: 10px;
  padding: 10px 10px 0px;
  border-bottom: 2px solid black;
}
.todo-list-item {
  margin: 10px;
  padding: 10px;
  border-bottom: 1px solid #8080807a;
  display: flex;
  justify-content: space-between;
}
.todo-item-name .todo-item-name-checkbox {
  padding: 10px;
}
.todo-item-name-checkbox input {
  height: 16px;
  width: 16px;
}
.todo-item-name {
  display: flex;
  justify-content: flex-start;
}
.todo-item-name-display {
  padding: 10px;
  width: 150px;
  overflow: auto;
}
.todo-item-name-display-isCompleted {
  padding: 10px;
  width: 150px;
  overflow: auto;
  text-decoration: line-through;
  color: #8080807a;
}
.todo-item-name-edit input {
  padding: 10px;
  width: 150px;
  font-size: 16px;
  border: 1px solid #8080807a;
}
.todo-item-name-edit input:focus {
  outline: none;
}
.remove-todo-item {
  padding: 10px;
  cursor: pointer;
}
.bulk-remove-section {
  display: flex;
  justify-content: space-between;
}
.bulk-remove-section input {
  margin: 10px;
  padding: 10px;
  height: 16px;
  width: 16px;
  margin-right: 10px;
}
.button {
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
.button:focus{
    background-color: greenyellow;
}
</style>
