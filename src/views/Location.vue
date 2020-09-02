<template>
  <div class="location-box">
    <NavBar :title="navBar.title"></NavBar>
    <div id="map-container" ref="mapContainer"></div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'Location',
  props: ['id', 'type'],
  data() {
    return {
      navBar: {
        title: '打卡详情'
      },
      note: {}
    }
  },
  components: {
    NavBar
  },
  created() {},
  methods: {
    getNote() {
      this.$http({
        url: '/check/get',
        method: 'post',
        data: {
          id: this.id,
          type: this.type
        }
      }).then(res => {
        if (res.data.code && res.data.success) {
          this.note = res.data.data
          this.initMap()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    initMap() {
      let center = new qq.maps.LatLng(this.note.latlon.lat, this.note.latlon.lng),
        map = new qq.maps.Map(document.getElementById('map-container'), {
          center: center,
          zoom: 13
        }),
        anchor = new qq.maps.Point(this.note.latlon.lat, this.note.latlon.lng),
        size = new qq.maps.Size(20, 33),
        origin = new qq.maps.Point(this.note.latlon.lat, this.note.latlon.lng),
        icon = new qq.maps.MarkerImage(
          require('../assets/images/location.png'),
          size,
          origin,
          anchor
        ),
        marker = new qq.maps.Marker({
          map: map,
          position: center
        })
      marker.setIcon(icon)
    }
  },
  mounted() {
    let winWidth = document.body.clientWidth || document.documentElement.clientWidth,
      winHeight = document.body.clientHeight || document.documentElement.clientHeight
    this.$refs.mapContainer.style.height = winHeight + 'px'
    this.getNote()
  }
}

</script>
<style scoped>
.location-box {
  display: block;
  width: 100%;
  height: 100%;
}

.map-container {
  display: block;
  width: 100%;
  height: 100%;
}

</style>
