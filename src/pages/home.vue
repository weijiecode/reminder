<template>
  <div class="home">
    <div class="homebox">
      <div class="homecontent">
        <div class="flexbox">
          <i @click="reload()" class="el-icon-refresh-right" style=""></i>
          <div class="contentcenter">
            <p class="onep">
              欢迎您，{{ username }}&nbsp;&nbsp;
              <svg style="font-size: 30px" class="icon" aria-hidden="true">
                <use xlink:href="#icon-ziyuan"></use>
              </svg>
            </p>
            <p class="twop">以下是你当前的任务统计数据</p>
            <div class="block-num" style="background-color: #5da7f1">
              <p class="blockp">今日待完成</p>
              <p class="blockpp">
                {{ todaynodone }}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-gf-list6"></use>
                </svg>
              </p>
            </div>
            <div class="block-num" style="background-color: #fa8e8c">
              <p class="blockp">超期未完成</p>
              <p class="blockpp">
                {{ overnodone }}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiangyingchaoshijiankong"></use>
                </svg>
              </p>
            </div>
            <div class="block-num" style="background-color: #98de6e">
              <p class="blockp">总待完成</p>
              <p class="blockpp">
                {{ allblock }}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-gf-list4"></use>
                </svg>
              </p>
            </div>
          </div>
          <div class="weatherbox">
            <p v-if="loading" class="twop">
              <City :tocity="tocity"></City>
            </p>
            <p v-if="!loading" class="twop">
              以下是<span class="cityp"
                ><i class="el-icon-location-information"></i>{{ city }}</span
              >的天气
            </p>
            <div
              class="wbox"
              v-loading="loading"
              element-loading-text="获取地址中，请稍等"
            >
              <svg
                v-if="wvalue == 0"
                style="margin-top: 10px"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-tianqitubiao_qing"></use>
              </svg>
              <svg
                v-if="wvalue == 1"
                style="margin-top: 12px"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-weibiaoti--"></use>
              </svg>
              <svg
                v-if="wvalue == 2"
                style="margin-top: 7px"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon_yintian"></use>
              </svg>
              <svg
                v-if="wvalue == 3"
                style="font-size: 50px"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon_baoyu"></use>
              </svg>
              <svg
                v-if="wvalue == 4"
                style="font-size: 57px"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon_zhenxue"></use>
              </svg>
              <p class="wboxp">今天</p>
              <div class="allpbox">
                <p class="pbox">天气：{{ todayweather.type }}</p>
                <p class="pbox">最高温：{{ todayweather.high }}</p>
                <p class="pbox">最低温：{{ todayweather.low }}</p>
              </div>
            </div>
            <div
              class="wbox"
              v-loading="loading"
              element-loading-text="获取地址中，请稍等"
            >
              <svg
                v-if="wvalue1 == 0"
                style="margin-top: 10px"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-tianqitubiao_qing"></use>
              </svg>
              <svg
                v-if="wvalue1 == 1"
                style="margin-top: 12px"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-weibiaoti--"></use>
              </svg>
              <svg
                v-if="wvalue1 == 2"
                style="margin-top: 7px"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon_yintian"></use>
              </svg>
              <svg
                v-if="wvalue1 == 3"
                style="font-size: 50px"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon_baoyu"></use>
              </svg>
              <svg
                v-if="wvalue1 == 4"
                style="font-size: 57px"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon_zhenxue"></use>
              </svg>
              <p class="wboxp">明天</p>
              <div class="allpbox">
                <p class="pbox">天气：{{ yesterdayweather.type }}</p>
                <p class="pbox">最高温：{{ yesterdayweather.high }}</p>
                <p class="pbox">最低温：{{ yesterdayweather.low }}</p>
              </div>
            </div>
            <p v-if="!loading" class="twop" style="float: left">{{ ganmao }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import City from "../components/city.vue";
import { datetimes } from "../mixins/mixin";
// 获取天气
import myBMap from "../api/map";
export default {
  created() {
    this.username = this.$store.state.nickname;
    // 获取数据
    this.getseacherdata();
        // 调用天气信息
     this.getweather();
  },
  mounted() {
    if(localStorage.getItem('city') == null){
      // 调用函数获取城市信息
    this.getCity();
    }
    
  },
  mixins: [datetimes],
  data() {
    return {
      username: "",
      // 所有待办数据
      blockdata: {},
      // 今日待完成数
      todaynodone: "",
      // 超期未完成数
      overnodone: "",
      // 总待办数
      allblock: 0,
      // 位置信息
      city: "",
      // 天气数据
      todayweather: {
        type: "",
        high: "",
        low: "",
      },
      yesterdayweather: {
        type: "",
        high: "",
        low: "",
      },
      // 天气提示
      ganmao: "",
      // 天气图片类型
      wvalue: 0,
      wvalue1: 0,
      // 是否获取到地址
      loading: true,
    };
  },
  components: {
    City,
  },
  methods: {
    async getseacherdata() {
      const { data: res } = await this.$http.get("/backlog/selectbacklog");
      if (res.code == 200) {
        this.blockdata = res.data;
        this.allblock = res.data.length;
        this.todaynodone = res.data.filter((item) => {
          return (
            this.todaydate == item.datetime.split(" ")[0] && item.done == 0
          );
        }).length;
        this.overnodone = res.data.filter((item) => {
          return this.todaydate > item.datetime.split(" ")[0] && item.done == 0;
        }).length;
      } else {
        this.$message.error("获取搜索数据失败，请重试");
      }
      // console.log(this.blockdata);
    },
    reload() {
      window.location.reload();
    },
    // 获取位置信息
    getCity() {
      myBMap.init().then((BMap) => {
        const geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(
          (position) => {
            let city = position.address.city; //获取城市信息
            // let province = position.address.province; //获取省份信息
            this.city = city;
            //console.log(city);
            localStorage.setItem("city", city);
            this.getweather();
            // console.log(city);
            // console.log(province);
            // console.log(position);
          },
          (e) => {
            //this.loading = true
            console.log(e);
            console.log("定位失败");
            if (localStorage.getItem("city") == "") {
              this.$message.error("定位失败，请手动添加城市地址");
            }
          },
          { provider: "baidu" }
        );
      });
    },
    // 获取天气
    async getweather() {
      // console.log('123')
      // console.log(this.city);
      // console.log(localStorage.getItem("city"))
      const res = await this.$http.get(
        "http://wthrcdn.etouch.cn/weather_mini?city=" +
          localStorage.getItem("city")
      );
      // console.log("天气");
      // console.log(res.data);
      if (res.data.status == 1000) {
        this.loading = false;
        this.city = localStorage.getItem("city");
        this.todayweather.type = res.data.data.forecast[0].type;
        this.todayweather.high = res.data.data.forecast[0].high;
        this.todayweather.low = res.data.data.forecast[0].low;
        this.ganmao = res.data.data.ganmao;
        if (this.todayweather.type.indexOf("晴") != -1) this.wvalue = 0;
        else if (this.todayweather.type.indexOf("云") != -1) this.wvalue = 1;
        else if (this.todayweather.type.indexOf("阴") != -1) this.wvalue = 2;
        else if (this.todayweather.type.indexOf("雨") != -1) this.wvalue = 3;
        else if (this.todayweather.type.indexOf(" 雪") != -1) this.wvalue = 4;
        // console.log(123)
        // console.log(this.todayweather)
        // console.log(this.ganmao)
        this.yesterdayweather.type = res.data.data.forecast[1].type;
        this.yesterdayweather.high = res.data.data.forecast[1].high;
        this.yesterdayweather.low = res.data.data.forecast[1].low;
        if (this.yesterdayweather.type.indexOf("晴") != -1) this.wvalue1 = 0;
        else if (this.yesterdayweather.type.indexOf("云") != -1)
          this.wvalue1 = 1;
        else if (this.yesterdayweather.type.indexOf("阴") != -1)
          this.wvalue1 = 2;
        else if (this.yesterdayweather.type.indexOf("雨") != -1)
          this.wvalue1 = 3;
        else if (this.yesterdayweather.type.indexOf(" 雪") != -1)
          this.wvalue1 = 4;
      }
    },
    //接收子组件的值
    tocity(city) {
      this.city = city;
      // console.log(this.city)
      this.loading = false;
      localStorage.setItem("city", this.city);
    }
  },
  watch: {
    city(newvalue) {
      console.log(newvalue)
      if(newvalue != null){
        this.getweather();
        // localStorage.setItem("city", newvalue);
      //this.city = localStorage.getItem("city");
      }
    },
  },
};
</script>

<style scoped>
.home {
  background-color: #f1f2f6;
  width: 100%;
  height: 100%;
}
.homebox {
  height: 100%;
  margin-left: 280px;
}
.homecontent {
  display: flex;
  justify-content: center;
  justify-items: center;
  min-width: 900px;
  min-height: 450px;
  margin-top: 20px;
  background-color: white;
  height: calc(100% - 120px);
  width: calc(100% - 30px);
  float: left;
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
  border-radius: 10px;
  margin-bottom: 30px;
}
.contentcenter {
  margin-top: 12%;
  width: 616px;
}
.onep {
  cursor: default;
  font-size: 24px;
  font-weight: 600;
}
.twop {
  cursor: default;
  color: #888;
  font-size: 13px;
  margin-top: 18px;
}
.block-num {
  float: left;
  width: 180px;
  height: 90px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 24px;
}
.block-num:hover {
  box-shadow: 0 0 10px #ccc;
}
.blockp {
  margin-left: 20px;
  color: hsla(0, 0%, 100%, 0.6);
  font-size: 12px;
}
.blockpp {
  margin-top: -5px;
  margin-left: 20px;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
}
.blockpp .icon {
  color: hsla(0, 0%, 100%, 0.7);
  font-size: 20px;
  float: right;
  margin-right: 20px;
  margin-top: 15px;
}
.el-icon-refresh-right {
  float: right;
  font-size: 20px;
  margin-top: 30px;
  margin-right: -120px;
  cursor: pointer;
}
.weatherbox {
  width: 616px;
  display: inline-block;
}
.cityp {
  color: #000;
  padding: 0 5px;
}
.wbox {
  border-radius: 8px;
  cursor: pointer;
  float: left;
  margin-right: 24px;
  width: 284px;
  height: 90px;
  background-color: #e7e6e7c2;
}
.wbox:hover {
  box-shadow: 0 0 10px #ccc;
}
.wbox .icon {
  float: left;
  font-size: 65px;
  margin-top: 18px;
  margin-left: 20px;
}
.wboxp {
  font-size: 15px;
  margin: 33px 0 0 20px;
  float: left;
  color: rgb(56, 50, 50);
}
.allpbox {
  color: rgba(15, 23, 42, 0.8);
  margin-left: 30px;
  float: left;
  font-size: 12px;
}
.pbox {
  line-height: 12px;
}
</style>