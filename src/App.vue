<template>
  <div id="app" class="container">
    <a href="/" class="site-title">Vue To Do List App</a>
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>

*{
  box-sizing: border-box;
}

.container{
  max-width: 500px;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
.site-title{
  margin-bottom: 20px;
  text-decoration: none;
  font-weight: 700;
  display: block;
  text-align: center;
  font-size: 20px;
  color: #409EFF;
}
</style>
