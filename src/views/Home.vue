<template>
  <div class="home-container">
    <NavBar :title="navBar.title"></NavBar>
    <div class="user-box">
      <div class="user-icon">李鹏</div>
      <div class="user-name">
        <span>李鹏</span>
      </div>
    </div>
    <div class="punch-clock-box">
      <v-touch tag="a" class="punch-clock-button" @tap="punchBlock($event)" :class="{'punch-clock-disable':!isCan}">
        <span class="punch-block-text">{{punchBlockText}}</span>
        <span class="now-date-box">{{nowDate}}</span>
      </v-touch>
      <div class="location-box">{{address}}</div>
    </div>
    <div style="display:none;width:603px;height:300px;" id="container"></div>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'Home',
  data() {
    return {
      navBar: {
        title: '打卡'
      },
      punchBlockText: '上班打卡',
      nowDate: '23:00:00',
      fullDate: '',
      uid: '5f303beb303e6f18e3be58dc',
      name: '李鹏',
      address: '',
      latlon: '',
      type: 1,
      isCan: true
    }
  },
  components: {
    NavBar
  },
  created() {
    this.getNowDate()
  },
  methods: {
    getCheck() {
      let now = new Date()
      let fullYear = now.getFullYear()
      let month = now.getMonth()
      let date = now.getDate()
      month = (month + 1)
      let toadyStr = `${fullYear}-${(month<=9?('0'+month):month)}-${(date<=9?('0'+date):date)}`
      this.$http({
        url: '/check/get',
        method: 'post',
        data: {
          uid: this.uid,
          dateTime: toadyStr
        }
      }).then(res => {
        if (res.data.code && res.data.success) {
          let caches = res.data.data
          if (caches.length == 2) {
            this.isCan = false
          } else if (caches.length == 1) {
            this.isCan = true
            // 表示下班打卡
            this.punchBlockText = '下班打卡'
            this.type = 2
          } else {
            this.isCan = true
            // 表示上班打卡
            this.punchBlockText = '上班打卡'
            this.type = 1
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getNowDate() {
      let _this = this
      setInterval(function() {
        let now = new Date()
        let fullYear = now.getFullYear()
        let month = now.getMonth()
        let date = now.getDate()
        let hour = now.getHours()
        let minute = now.getMinutes()
        let second = now.getSeconds()
        month = (month + 1)
        _this.nowDate = `${(hour<=9?('0'+hour):hour)}:${(minute<=0?('0'+minute):minute)}:${(second<=9?('0'+second):second)}`
        _this.fullDate = `${fullYear}-${(month<=9?('0'+month):month)}-${(date<=9?('0'+date):date)} ${_this.nowDate}`
      }, 1000)
      this.getCheck()
    },
    getLocation() {
      let _this = this,
        citylocation, map, marker = null,
        center = new qq.maps.LatLng(39.916527, 116.397128);
      map = new qq.maps.Map(document.getElementById('container'), {
        center: center,
        zoom: 13
      });
      //设置城市信息查询服务
      citylocation = new qq.maps.CityService();
      //请求成功回调函数
      citylocation.setComplete(function(result) {
        _this.address = result.detail.name
        _this.latlon = result.detail.latLng
        map.setCenter(result.detail.latLng);
      });
      //请求失败回调函数
      citylocation.setError(function() {
        alert("出错了，请输入正确的经纬度！！！");
      });
      citylocation.searchLocalCity();
    },
    punchBlock(e) {
      if (this.isCan) {
        let _this = this,
          loading
        this.$toast.allowMultiple()
        loading = this.$toast.loading({
          message: '',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
        this.$http({
          url: '/check/add',
          method: 'post',
          data: {
            type: this.type,
            uid: this.uid,
            address: this.address,
            datetime: this.fullDate,
            latlon: this.latlon
          }
        }).then(res => {
          loading.clear()
          if (res.data.code && res.data.success) {
            this.$toast({
              type: "success",
              message: `${(this.type==1?'上班':'下班')}打卡成功`,
              icon: 'success'
            })
            this.getCheck()
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$toast({
          type: "success",
          message: `您今天已打卡请勿重复操作`,
          icon: 'success'
        })
      }
    }
  },
  mounted() {
    this.getLocation()
  }
}

</script>
<style scoped>
.home-container {
  display: block;
  width: 100%;
  height: auto;
  padding: 60px 0 0 0;
}

.user-box {
  width: 90%;
  height: 50px;
  background: #FFF;
  border-radius: 20px;
  margin: 20px auto;
  padding: 15px 0;
}

.user-icon {
  display: block;
  float: left;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #5090e8;
  color: #FFF;
  border-radius: 50%;
  font-size: 16px;
  margin: 0 0 0 15px;
}

.user-name {
  display: block;
  float: left;
  width: 77%;
  height: 50px;
  margin: 0 0 0 10px;
}

.user-name span {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 22px;
}

.punch-clock-box {
  width: 90%;
  height: 160px;
  background: #FFF;
  border-radius: 20px;
  margin: 20px auto;
  padding: 120px 0;
}

.punch-clock-button {
  display: block;
  width: 120px;
  height: 120px;
  color: #FFF;
  background: #4999f8;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
}

.punch-clock-disable {
  color: #FFF;
  background: #bfdcfa;
}

.punch-block-text {
  display: block;
  width: 98%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  top: 27%;
  transform: translateX(-50%);
}

.now-date-box {
  display: block;
  width: 98%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translateX(-50%);
  color: #84c6ff;
}

.location-box {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}

</style>
