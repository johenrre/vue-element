<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
/*清除浮动*/
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}

.clearfix {
  zoom: 1;
}
html,
body,
#app,
#home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
ul,
li {
  list-style: none;
}
</style>
