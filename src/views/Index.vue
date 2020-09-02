<template>
  <div class="index-container">
    <router-view />
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="location" icon="location-o">打卡</van-tabbar-item>
      <van-tabbar-item name="notes" icon="notes-o">统计</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'Index',
  props: [],
  data() {
    return {
      active: 'location'
    }
  },
  components: {},
  created() {},
  methods: {
    onChange(name) {
      switch (name) {
        case 'notes':
          this.$router.push({
            path: '/notes'
          })
          break;
        case 'setting':
          break;
        default:
          this.$router.push({
            path: '/'
          })
          break;
      }
    }
  },
  mounted() {}
}

</script>
<style scoped>
.index-container {
  display: block;
  width: 100%;
  height: auto;
  min-height: 760px;
  background: #f2f3f5;
}

</style>
