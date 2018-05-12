<template>
<div>
  <center>
  <h2>vuedragx</h2>
  </center>
  <h5>一个能拖动、能调整大小、能更新bind值的vue指令</h5>
  <div id="app">
     <div id="box1"  v-dragx="dragBox1"><span>听说你想拖我</span><br/><br/><div class="drag1"><b>来吧</b></div></div>
     <div id="box2" v-dragx="dragBox2" @bindUpdate="bindUpdate" :style="{left:dragBox2.left+'px',top:dragBox2.top+'px',width:dragBox2.width+'px',height:dragBox2.height+'px'}"><span>通过绑定值实现拖到</span><br/><div class="drag1"><b>还是这里拖</b></div>
       <div class="bindBox"><label>width:</label><span>{{dragBox2.width}}px</span></div>
       <div class="bindBox"><label>height:</label><span>{{dragBox2.height}}px</span></div>
       <div class="bindBox"><label>left:</label><span>{{dragBox2.left}}px</span></div>
       <div class="bindBox"><label>top:</label><span>{{dragBox2.top}}px</span></div>
     </div>
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
      },
      dragBox2:{
        dragBarClass:"drag1",
        left:350,
        top:50,
        width:200,
        height:200,
        dirctDom:false
      }
    };
  },
  methods:{
bindUpdate(event){
  let data=event.detail;
  this.dragBox2.top=data.top;
  this.dragBox2.left=data.left;
  this.dragBox2.width=data.width;
  this.dragBox2.height=data.height;
}
    
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
#box2{
  border:solid 1px rgba(33,61,223,0.5);
  position:absolute;
}
.drag1{
  
  background-color:#ccc;
  border-top: solid 1px rgba(33, 61, 223, 0.541);
  border-bottom: solid 1px rgba(33, 61, 223, 0.541);
}
.bindBox{
  clear: both;
  margin-top:5px;
}
</style>
