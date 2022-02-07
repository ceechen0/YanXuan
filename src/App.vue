<template>
  <div id="app">
    <!-- 如果再router里配置了KeepAlive就在keepalive标签里显示 没有配置keepalive就正常在没有keepalive标签的router-view标签里显示 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<style lang="scss">
body {
  background-color: $colorE;
}
</style>
