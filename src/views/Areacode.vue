<template>
  <div class="area-code-container">
    <div class="area-code-search">
      <Search :keyWord="search.keyWord" :placeholder="search.placeholder" @searchHandler="searchHandler"></Search>
    </div>
    <div class="area-code-list-box">
      <v-touch tag="a" href="javascript:void(0);" class="area-code-list-items" v-for="(areaCode,$index) in areaCodes" @tap="selectAreaCodeItems($event,areaCode,$index)" :key="$index">
        <span class="area-code-name">{{areaCode.city}}</span>
        <span class="area-code-value">{{areaCode.code}}</span>
      </v-touch>
    </div>
  </div>
</template>
<script>
import globalAreaCode from '../assets/js/globalAreaCode.js'
import Search from '@/components/Search.vue'
export default {
  name: 'AreaCode',
  data() {
    return {
      search: {
        keyWord: 'keyWord',
        placeholder: '搜索'
      },
      areaCodes: []
    }
  },
  components: {
    Search
  },
  created() {
    this.areaCodes = globalAreaCode.areaCodes
  },
  methods: {
    searchHandler(value) {
      if (value) {
        this.areaCodes = []
        globalAreaCode.areaCodes.forEach(areaCode => {
          if (areaCode.city.indexOf(value) != -1) {
            this.areaCodes.push(areaCode)
          }
        })
      }
    },
    selectAreaCodeItems(e, item, index) {
      sessionStorage.setItem('areaCode', JSON.stringify(item))
      this.$router.go(-1)
    }
  },
  mounted() {}
}

</script>
<style scoped>
.area-code-container {
  display: block;
  width: 100%;
  height: auto;
}

.area-code-list-box {
  width: 100%;
  height: auto;
}

.area-code-list-items {
  display: block;
  width: 92%;
  height: 50px;
  font-size: 16px;
  color: #15181d;
  border-bottom: 1px solid #c4c4c4;
  padding: 0 4%;
}

.area-code-name {
  display: block;
  float: left;
  width: 50%;
  height: 50px;
  line-height: 50px;
  text-align: left;
}

.area-code-value {
  display: block;
  float: right;
  width: 50%;
  height: 50px;
  line-height: 50px;
  text-align: right;
}

</style>
