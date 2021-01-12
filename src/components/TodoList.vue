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
        <el-row>
          <el-button
            class="button"
            type="primary"
            plain
            @click="changeStatus('active')"
            autofocus
            >Active</el-button
          >
          <el-button
            class="button"
            type="primary"
            plain
            @click="changeStatus('completed')"
            >Completed</el-button
          >
        </el-row>
      </div>
      <div
        class="todo-list-item"
        v-for="todo in filterTodos"
        :key="todo.id"
        :todo="todo"
      >
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
        <div class="remove-todo-item" @click="removeTodo(todo.id)">&#10060;</div>
      </div>
      <br />
      <hr />
      <div class="bulk-remove-section">
        <div class="select-completed" v-if="showSelectAllBtn">
          <el-checkbox class="checkbox-select-all" size="medium" border @change="selectAll">Select All</el-checkbox>
        </div>
        <div>
          <el-row>
            <el-button class="button-remove" type="danger" v-if="showRemoveAllBtn"
            @click="removeAllCompleted">Remove All</el-button>
          </el-row>
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
    };
  },

  computed: {
    status() {
      return this.$store.state.status;
    },
    filterTodos() {
      return this.$store.getters.filterTodos;
    },
    showRemoveAllBtn() {
      return this.$store.getters.showRemoveAllBtn;
    },
    showSelectAllBtn() {
      return this.$store.getters.showSelectAllBtn;
    },
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
        this.$store.commit("addTodo", {
          id: this.newTodoId,
          name: this.newTodo,
          isCompleted: false,
          editMode: false,
        });

        this.newTodo = "";
        this.newTodoId++;
      }
    },
    changeStatus(status) {
      this.$store.commit("changeStatus", status);
    },
    editTodo(todo) {
      this.beforeEditName = todo.name;
      todo.editMode = true;
    },
    editComplete(todo) {
      this.$store.commit("editComplete", todo);
    },
    removeTodo(id) {
      this.$store.commit("removeTodo", id);
    },
    selectAll() {
      this.$store.commit("selectAll", event.target.checked);
    },
    removeAllCompleted() {
      this.$store.commit("removeAllCompleted");
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
.button-remove {
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
.checkbox-select-all{
  margin: 10px;
  padding: 10px;
  background: #40a0ff2c;
}
</style>
