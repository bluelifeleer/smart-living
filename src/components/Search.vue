<template>
  <div class="search-component">
    <slot><input type="text" name="search-input" v-model="search.keyWord.value" :placeholder="search.keyWord.placeholder"></slot>
  </div>
</template>
<script>
export default {
  name: 'SearchComponent',
  props: ['keyWord', 'placeholder'],
  data() {
    return {
      search: {
        keyWord: {
          value: '',
          placeholder: ''
        }
      }
    }
  },
  components: {},
  watch: {
    'search.keyWord.value': {
      handler(newVal, oldVal) {
        this.searchHandler(newVal)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.search.keyWord.placeholder = this.placeholder
  },
  methods: {
    searchHandler(value) {
      this.$emit('searchHandler', value)
    }
  },
  mounted() {}
}

</script>
<style scoped>
.search-component {
  width: 100%;
  height: auto;
  margin: 10px 0;
  position: relative;
}

.search-component:before {
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  content: "\e63c";
  font-family: "iconfont";
  position: absolute;
  left: 30px;
  top: 5px;
}

.search-component input {
  display: block;
  width: 75%;
  height: 40px;
  line-height: 40px;
  background: #ecedef;
  border-radius: 20px;
  padding: 0 5% 0 10%;
  margin: 0 auto;
  font-size: 16px;
}

</style>
