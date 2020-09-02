<template>
  <div id="app">
    <router-view />
    <!-- 开启 safe-area-inset-bottom 属性 -->
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      active: 'location'
    }
  },
  methods: {
    onChange(index) {
      this.$toast(index);
    },
  }
}

</script>
<style>
html,
body,
div,
b,
p,
table,
tr,
td,
th,
ol,
ul,
dl,
li,
input,
textarea,
select,
radio,
checkbox {
  border: none;
  padding: 0;
  margin: 0;
}

ul,
ol,
dl {
  list-style: none;
}

a {
  text-decoration: none
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

@font-face {
  font-family: 'iconfont';
  /* project id 1734247 */
  src: url('//at.alicdn.com/t/font_1734247_urx3gvs4n9n.eot');
  src: url('//at.alicdn.com/t/font_1734247_urx3gvs4n9n.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1734247_urx3gvs4n9n.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1734247_urx3gvs4n9n.woff') format('woff'),
    url('//at.alicdn.com/t/font_1734247_urx3gvs4n9n.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1734247_urx3gvs4n9n.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
