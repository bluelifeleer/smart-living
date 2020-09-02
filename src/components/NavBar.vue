<template>
  <div class="nav-bar-component">
    <v-touch tag="a" href="javascript:void(0);" class="navigation-back" @tap="navigationBack($event)">返回</v-touch>
    <span class="nav-bar-title">
      <slot name="title">{{title}}</slot>
    </span>
    <span class="nav-bar-menu-box">
      <slot name="menu">
        <v-touch tag="a" href="javascript:void(0);" class="nav-bar-menu"><i class="icon iconfont">&#xe67c;</i></v-touch>
      </slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  props: ['title', 'background'],
  data() {
    return {

    }
  },
  components: {},
  created() {},
  methods: {
    navigationBack(e) {
      this.$router.go(-1)
    }
  },
  mounted() {}
}

</script>
<style scoped>
.nav-bar-component {
  width: 100%;
  height: 50px;
  background: #FFF;
  position: fixed;
  left: 0;
  top: 0;
}

.navigation-back {
  display: block;
  float: left;
  width: 10%;
  height: 50px;
  line-height: 50px;
  color: #2c3e50;
  position: relative;
  font-size: 15px;
  padding: 0 0 0 8%;
}

.navigation-back:before {
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  content: "\e794";
  font-family: 'iconfont';
  color: #2c3e50;
  position: absolute;
  left: 5px;
  top: 10px;
}

.nav-bar-title {
  display: block;
  float: left;
  width: 60%;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  text-align: center;
}

.nav-bar-menu-box {
  display: block;
  float: left;
  width: 20%;
  height: 50px;
}

.nav-bar-menu {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  color: #2c3e50;
  text-align: center;
}

</style>
