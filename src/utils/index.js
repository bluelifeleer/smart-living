/*
 * @Author: bluelife
 * @Date:   2020-04-26 02:32:40
 * @Last Modified by:   bluelife
 * @Last Modified time: 2020-08-23 00:32:13
 */
const md5 = require('blueimp-md5')
export default {
  date: null,
  getDataObj: function(item) {
    this.date = item ? new Date(item) : new Date()
  },
  getFullYear: function() {
    return parseInt(this.date.getFullYear())
  },
  getMonth: function() {
    return parseInt(this.date.getMonth() + 1)
  },
  getDay: function() {
    return parseInt(this.date.getDay())
  },
  getDate: function() {
    return parseInt(this.date.getDate())
  },
  getHours: function() {
    return parseInt(this.date.getHours())
  },
  getMinutes: function() {
    return parseInt(this.date.getMinutes())
  },
  getSeconds: function() {
    return parseInt(this.date.getSeconds())
  },
  getMilliseconds: function() {
    return parseInt(this.date.getMilliseconds())
  },
  getTime: function(item) {
    this.getDataObj(item)
    return parseInt(this.date.getTime())
  },
  formateDate: function(item, str) {
    //初始化获取对象
    this.getDataObj(item)
    switch (str) {
      case 'YYYYMMDD':
        return `${this.getFullYear()}${this.addZone(this.getMonth())}${this.addZone(this.getDate())}`
        break;
      case 'YYYY#MM#DD':
        return `${this.getFullYear()}#${this.addZone(this.getMonth())}#${this.addZone(this.getDate())}`
        break;
      case 'YYYY-MM-DD':
        return `${this.getFullYear()}-${this.addZone(this.getMonth())}-${this.addZone(this.getDate())}`
        break;
      default:
        return `${this.getFullYear()}-${this.addZone(this.getMonth())}-${this.addZone(this.getDate())} ${this.addZone(this.getHours())}:${this.addZone(this.getMinutes())}:${this.addZone(this.getSeconds())}`
        break;
    }
  },
  /**      
   * 对Date的扩展，将 Date 转化为指定格式的String      
   * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
   * eg:      
   * (this.format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
   * (this.format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
   * (this.format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
   * (this.format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
   * (this.format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
   */
  format: function(item, fmt) {
    //初始化获取对象
    this.getDataObj(item)
    var o = {
      "M+": this.date.getMonth() + 1, //月份         
      "d+": this.date.getDate(), //日         
      "h+": this.date.getHours() % 12 == 0 ? 12 : this.date.getHours() % 12, //小时         
      "H+": this.date.getHours(), //小时         
      "m+": this.date.getMinutes(), //分         
      "s+": this.date.getSeconds(), //秒         
      "q+": Math.floor((this.date.getMonth() + 3) / 3), //季度         
      "S": this.date.getMilliseconds() //毫秒         
    };
    var week = {
      "0": "/u65e5",
      "1": "/u4e00",
      "2": "/u4e8c",
      "3": "/u4e09",
      "4": "/u56db",
      "5": "/u4e94",
      "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.date.getDay() + ""]);
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  },
  getMonthDatas: num => {
    this.getDataObj()
    let current = this.getMonth() + num
    let year = null
    let month = null

    if (num == 0) {
      year = this.getFullYear()
      month = this.getMonth()
    } else if (num < 0) {
      if (current > 0) {
        year = this.getFullYear()
        month = current
      } else if (current == 0) {
        year = parseInt(this.getFullYear() - 1)
        month = 12 - current
      } else if (current < 0) {
        year = parseInt(this.getFullYear() - 1)
        month = 12 + current
      }
    } else if (num > 0) {
      year = this.getFullYear()
      month = num
    }
    let date = this.getDate()
    // return `${year}-${this.addZone(month)}-${this.addZone(date)}`
    return `${year}年${this.addZone(month)}月`
  },
  addZone: number => {
    return number <= 9 ? ('0' + number) : number
  },
  queryString: name => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    return r != null && r != undefined ? unescape(r[2]) : null
  },
  getCookie: key => {
    let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
    let arr = document.cookie ? document.cookie.match(reg) : null;
    return arr ? unescape(arr[2]) : null
  },
  setCookie: function(key, value, time, path) {
    time = time ? time : 's15' // 默认15分钟
    path = path ? path : '/' // 默认全局
    var strsec = this.getsec(time);
    var expires = new Date();
    expires.setTime(expires.getTime() + strsec * 1);
    document.cookie = key + "=" + escape(value) + ";expires=" + expires.toGMTString() + ';path=' + path;
  },
  deleteCookie: function(key) {
    var expires = new Date();
    expires.setTime(expires.getTime() - 1);
    var value = this.getCookie(key);
    if (value != null) {
      document.cookie = key + "=" + value + ";expires=" + expires.toGMTString();
    }
  },
  getsec: str => {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
      return str1 * 1000 * 60; // 分钟
    } else if (str2 == "h") {
      return str1 * 60 * 60 * 1000; // 小时
    } else if (str2 == "d") {
      return str1 * 24 * 60 * 60 * 1000; // 天
    }
  },
  random: (num, type) => {
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-=+';
    let number = '1234567890';
    let newStr = '';
    num = num || 32;
    if (type == 'number') {
      for (let i = 0; i < num; i++) {
        newStr += number.substr((Math.random() * str.length), 1)
      }
    } else {
      for (let i = 0; i < num; i++) {
        newStr += str.substr((Math.random() * str.length), 1)
      }
    }
    return newStr
  },
  addWrite: function(imgSrc, callback, write, type, name, buffer) {
    let fileReader = new FileReader(),
      _img = new Image(),
      _this = this
    type = type || 'jpg'
    name = name || _this.formateDate()
    _img.src = imgSrc
    _img.onload = function() {
      let _canvas = document.createElement("canvas"),
        width = _img.width,
        height = _img.height,
        ox = width / 2,
        oy = height / 2,
        base64Url = '',
        base2file = null,
        result = null,
        _ctx2d = _canvas.getContext("2d")
      _canvas.setAttribute("width", width);
      _canvas.setAttribute("height", height);
      _ctx2d.drawImage(this, 0, 0, width, height);
      _ctx2d.fillStyle = "#F00";
      _ctx2d.font = "13px Georgia Arial";
      let updateTime = '上传时间：' + _this.formateDate()
      _ctx2d.fillText(updateTime, (width - _ctx2d.measureText(updateTime).width), (height - 13));
      _ctx2d.save();
      if (write) {
        _ctx2d.translate(((ox - _ctx2d.measureText(write).width) - (_ctx2d.measureText(write).width / 2)), oy); // 将画布的原点移动到正中央
        _ctx2d.rotate((Math.PI / 180) * -15); // 弧度 = (Math.PI/180)*角度
        _ctx2d.font = "50px Georgia Arial";
        _ctx2d.fillText(write, 0, 0);
      }
      _ctx2d.translate(-ox, -oy); // 将画布的原点还原
      result = buffer ? _this.dataURLtoFile(base64Url, name) : _canvas.toDataURL(type);
      if (callback) {
        callback(result)
      }
    }
  },
  compress: function(file, rate, callback) {
    let fileReader = new FileReader(),
      _img = new Image(),
      _this = this,
      _maxPostSize = 1024 // 允许上传文件最大值1024KB
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load', function() {
      // 处理缩放，转格式
      _img.src = fileReader.result;
      _img.onload = function() {
        let _canvas = document.createElement("canvas"),
          width = _img.width < 300 ? _img.width : (_img.width * (rate / 100)),
          height = _img.height < 300 ? _img.height : (_img.height * (rate / 100)),
          base64Url = '',
          base2file = null,
          _ctx2d = _canvas.getContext("2d")
        _canvas.setAttribute("width", width);
        _canvas.setAttribute("height", height);
        _ctx2d.drawImage(this, 0, 0, width, height);
        // _ctx2d.lineWidth = 6;
        // _ctx2d.strokeStyle = '#F00';
        // _ctx2d.strokeRect(20, 20, 80, 80)
        // _ctx2d.rotate(45 * Math.PI / 180);
        // _ctx2d.font = '15px serif';
        // _ctx2d.fillStyle = "white"
        // let text = '小卒点单',
        //   measureText = _ctx2d.measureText(text) // 动态获取绘制文本的长宽
        // _ctx2d.fillText(text, ((width - measureText.width) / 2), (height - 10));
        // _ctx2d.rotate(45 * Math.PI / 180);
        base64Url = _canvas.toDataURL(file.type, (rate / 100));
        base2file = _this.dataURLtoFile(base64Url, file.name)
        _canvas.toBlob(blob => {
          // console.log('压缩后大小：' + blob.size)
          // 判断是否大于100KB
          if ((blob.size / 1024) >= _maxPostSize) {
            // 如果还大，继续压缩
            _this.compress(base2file, 60, callback)
          } else {
            if (callback) {
              callback(base2file);
            }
          }
        }, base2file.type);

      }
    }, false)
  },
  dataURLtoFile: (dataurl, filename) => {
    //将base64转换为file
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime
    });
  },
  verifyExt: type => {
    let ext = type.split('/')[1],
      extFilters = ['jpg', 'jpeg', 'png', 'gif'],
      flag = true
    for (let i = 0; i < extFilters.length; i++) {
      if (ext != extFilters[i]) {
        flag = false
        break;
      }
    }
    return flag
  },
  phoneFilter: phone => {
    if (!phone) {
      return ''
    } else {
      var reg = /(\d{3})\d{4}(\d{4})/;
      phone = '' + phone
      return phone.replace(reg, "$1****$2")
    }
  },
  md5: str => {
    return md5(str)
  },
  localStorage: () => {
    try {
      return window.localStorage
    } catch (err) {
      console.log(err)
      console.log('您的设备不支持localStorage')
    }
  },
  sessionStorage: () => {
    try {
      return window.sessionStorage
    } catch (err) {
      console.log(err)
      console.log('您的设备不支持sessionStorage')
    }
  },
  $setTimeout: (fn, timer = 50, call) => {
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        fn()
        if (call) {
          resolve(call())
        }
      }, timer)
    })
    return promise
  },
  $setInterval: (fn, timer = 50, call) => {
    const promise = new Promise(function(resolve, reject) {
      setInterval(function() {
        fn()
        if (call) {
          resolve(call())
        }
      }, timer)
    })
    return promise
  },
  isArray: o => {
    if (Array.isArray) {
      return Array.isArray(o)
    } else {
      return Object.prototype.toString.call(o) === '[object Array]'
    }
  },
  isObject: o => {
    return Object.prototype.toString.call(o) === '[object Object]'
  },
  /**
   * 判断json是否为空
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  isEmptyObject: obj => {
    let name
    for (name in obj) {
      return false;
    }
    return true
  },
  /**
   * 验证是否纳税识别号
   * @param  {[type]} taxId [description]
   * @return {[type]}       [description]
   */
  checkTaxId: taxId => {
    var regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i],
      i, j = regArr.length;
    for (var i = 0; i < j; i++) {
      if (regArr[i].test(taxId)) {
        return true;
      }
    }
    //纳税人识别号格式错误
    return false;
  },
  /**
   * 将字符串的'false'或'true'转换成Boolean类型
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  boolean: str => {
    return Boolean(parseInt(str))
  }
}
