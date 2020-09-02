<template>
  <div class="notes-container">
    <NavBar :title="navBar.title" :showMenu="navBar.showMenu"></NavBar>
    <div class="note-list-box">
      <div class="note-list-items" v-for="(note,$index) in notes.list" :key="$index">
        <div class="note-list-items-header">{{note.datetime}}</div>
        <div class="note-list-items-body">
          <v-touch tag="a" href="javascript:void(0);" class="note-items" v-for="(record,$index) in note.records" :key="$index" @tap="navigationTo($event,record,$index)">
            <span class="type-box">{{record.type|typeFilter}}</span>
            <span class="datetime-box">时间：{{record.datetime}}</span>
          </v-touch>
        </div>
        <div class="note-list-items-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'Notes',
  props: [],
  data() {
    return {
      navBar: {
        title: '打卡统计',
        showMenu: true
      },
      uid: '5f303beb303e6f18e3be58dc',
      notes: {
        size: 100,
        page: 1,
        total: 1,
        list: [{
          datetime: '',
          records: []
        }]
      }
    }
  },
  components: {
    NavBar
  },
  created() {
    this.getNotes()
  },
  methods: {
    getNotes() {
      this.$toast.allowMultiple()
      let loading = this.$toast.loading({
        message: '',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      this.$http({
        url: '/check/list',
        method: 'post',
        data: {
          uid: this.uid,
        }
      }).then(res => {
        loading.clear()
        if (res.data.code && res.data.success) {
          let data = res.data.data
          if (data.list.length) {
            let map = {},
              dest = [],
              notes = data.list;
            for (let i = 0; i < notes.length; i++) {
              let ai = notes[i];
              let aiCreateTimeStr = this.$utils.format(ai.datetime, 'yyyy-MM-dd')
              if (!map[aiCreateTimeStr]) {
                dest.push({
                  datetime: aiCreateTimeStr,
                  records: [ai]
                });
                map[aiCreateTimeStr] = ai;
              } else {
                for (let j = 0; j < dest.length; j++) {
                  let dj = dest[j],
                    aiCreateTimeStr = this.$utils.format(ai.datetime, 'yyyy-MM-dd')
                  if (dj.datetime == aiCreateTimeStr) {
                    dj.records.push(ai);
                  }
                }
              }
              this.notes.list = dest
            }
          }
          this.notes.size = parseInt(data.size)
          this.notes.page = parseInt(data.page)
          this.notes.total = parseInt(data.total)
        }
      }).catch(err => {
        loading.clear()
        console.log(err)
      })
    },
    navigationTo(e, item, index) {
      this.$router.push({
        path: `/location?id=${item._id}&type=${item.type}`
      })
    }
  },
  filters: {
    typeFilter: type => {
      return parseInt(type) == 1 ? '上班打卡' : '下班打卡'
    }
  },
  mounted() {}
}

</script>
<style scoped>
.notes-container {
  display: block;
  width: 100%;
  height: auto;
  padding: 60px 0 0 0;
}

.note-list-box {
  width: 100%;
  height: auto;
}

.note-list-items {
  width: 100%;
  height: auto;
  margin: 0 0 20px 0;
}

.note-list-items-header {
  width: 90%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 5%;
}

.note-list-items-body {
  width: 90%;
  height: auto;
  padding: 0 5%;
  background: #FFF;
}

.note-list-items-footer {
  width: 100%;
  height: auto;
}

.note-items {
  display: block;
  width: 100%;
  height: 40px;
  color: #2c3e50;
}

.type-box {
  display: block;
  float: left;
  width: 30%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: left;
}

.datetime-box {
  display: block;
  float: right;
  width: 70%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: right;
}

</style>
