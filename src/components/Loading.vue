<template>
  <div class="loading-container">
    <div class="loading">
      <img src="../assets/img/loading.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.loading-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(153, 153, 153, 0.5);
  .loading {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>