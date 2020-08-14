<template>
  <div class="no-data">
    <img :src="imgUrl" alt />
    <slot name="footer">
      <p></p>
    </slot>
  </div>
</template>

<script>
export default {
  name: "NoData",
  props: {
    imgUrl: String,
  },
};
</script>

<style lang='scss'>
.no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: 50px 0;
  color: #999999;
  img {
    width: 240px;
    height: 180px;
    margin-bottom: 30px;
  }
  a {
    font-size: 15px;
  }
}
</style>