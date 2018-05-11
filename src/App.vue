<template>
<div>
  <center>
  <h2>vuedragx</h2>
  </center>
  <h5>一个能拖动、能调整大小、能更新bind值的vue指令</h5>
  <div id="app">
     <div id="box1"  v-dragx="dragBox1"><span>听说你想拖我</span><br/><br/><div class="drag1"><b>来吧</b></div></div>
     <div id="box2"></div>
  </div>
</div>
</template>

<script>
import "@/dragx.js";

export default {
  name: "App",
  data() {
    return {
      dragBox1: {
        dragBarClass: "drag1",
        dragContainerId: "app"
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border: dashed 1px #000;
  height: 500px;
  position: relative;
}
#box1 {
  width: 100px;
  height: 100px;
  border: solid 1px rgba(33, 61, 223, 0.541);
  position: absolute;
  top: 50px;
  left: 200px;
}
.drag1{
  
  background-color:#ccc;
  border-top: solid 1px rgba(33, 61, 223, 0.541);
  border-bottom: solid 1px rgba(33, 61, 223, 0.541);
}
#box2 {
}
</style>
