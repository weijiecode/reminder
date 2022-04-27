<template>
  <div class="statisticsbox">
    <div class="statistics">
      <p class="stap">统计分析</p>
      <div id="stabox"></div>
      <div id="leftview"></div>
      <div id="rightview">
        <div class="data-report">
          <div class="box">
            <div class="top">
              <span class="number">{{oldsevennum}}</span>
              <span class="unit">项</span>
            </div>
            <p class="label">前七日总待办</p>
          </div>
          <div class="box">
            <div class="top">
              <span class="number">{{oldsevennumdonenum}}</span>
              <span class="unit">项</span>
            </div>
            <p class="label">前七日已完成待办</p>
          </div>
          <div class="box">
            <div class="top">
              <span class="number">{{oldsevenpercent}}</span>
              <span class="unit">%</span>
            </div>
            <p class="label">前七日已完成待办率</p>
          </div>
          <div class="box">
            <div class="top">
              <span class="number">{{allnum}}</span>
              <span class="unit">项</span>
            </div>
            <p class="label">总待办</p>
          </div>
          <div class="box">
            <div class="top">
              <span class="number">{{alldonenum}}</span>
              <span class="unit">项</span>
            </div>
            <p class="label">总待办已完成</p>
          </div>
          <div class="box">
            <div class="top">
              <span class="number">{{allnumpercent}}</span>
              <span class="unit">%</span>
            </div>
            <p class="label">总待办已完成率</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { datetimes } from "../mixins/mixin"
export default {
  mixins: [datetimes],
  components: {
    echarts,
  },
  created() {
    this.getbacklogdata();
  },
  mounted() {
    this.getsevendata();
    this.getalldata();
    // vue取值的方式是异步的
    setTimeout(() => {
      this.getmychart1();
      this.getmychart2();
    }, 500);
  },
  data() {
    return {
      // 表一
      mychart1: null,
      // 表二
      mycahrt2: null,
      timep: "你的时间评估为 一般 加油我们在山顶见",
      // 五个分类的每一个月的数据
      monthdata1: [null],
      monthdata2: [null],
      monthdata3: [null],
      monthdata4: [null],
      monthdata5: [null],
      monthdata6: [null],
      a: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      // 前七日总待办
      oldsevennum: 0,
      // 前七日已完成待办
      oldsevennumdonenum: 0,
      // 前七日已完成待办率
      oldsevenpercent: 0,
      // 总待办
      allnum: 0,
      // 总待办已完成
      alldonenum: 0,
      // 总待办已完成率
      allnumpercent: 0
    };
  },
  methods: {
    // 获取年度待办事项数据
    async getbacklogdata() {
      const { data: res } = await this.$http.get("/backlog/selectbacklogdata");
      // console.log('1233');
      // console.log(this.yeardate)
      // 过滤今年的所有数据
      if (res.code == 200) {
        res.data = res.data.filter((item) => {
          return this.yeardate == item.datetime.split("-")[0]
        })
        for (let i = 0; i < 12; i++) {
          this.monthdata1[i] = res.data.filter((item) => {
            return (
              item.colorbg == "#7766E7" &&
              item.datetime.split("-")[1] == this.a[i]
            );
          }).length;
        }
        for (let i = 0; i < 12; i++) {
          this.monthdata2[i] = res.data.filter((item) => {
            return (
              item.colorbg == "#518BF1" &&
              item.datetime.split("-")[1] == this.a[i]
            );
          }).length;
        }
        for (let i = 0; i < 12; i++) {
          this.monthdata3[i] = res.data.filter((item) => {
            return (
              item.colorbg == "#FFCD00" &&
              item.datetime.split("-")[1] == this.a[i]
            );
          }).length;
        }
        for (let i = 0; i < 12; i++) {
          this.monthdata4[i] = res.data.filter((item) => {
            return (
              item.colorbg == "#1DBD84" &&
              item.datetime.split("-")[1] == this.a[i]
            );
          }).length;
        }
        for (let i = 0; i < 12; i++) {
          this.monthdata5[i] = res.data.filter((item) => {
            return (
              item.colorbg == "#FE738A" &&
              item.datetime.split("-")[1] == this.a[i]
            );
          }).length;
        }
        for (let i = 0; i < 12; i++) {
          this.monthdata6[i] = res.data.filter((item) => {
            return (
              item.colorbg == "#C4C4C4" &&
              item.datetime.split("-")[1] == this.a[i]
            );
          }).length;
        }
      }
    },
    // 表一
    getmychart1() {
      // 表1初始化
      this.mychart1 = echarts.init(document.getElementById("stabox"));
      this.mychart1.setOption({
        color: [
          "#7766E7",
          "#518BF1",
          "#FFCD00",
          "#1DBD84",
          "#FE738A",
          "#C4C4C4",
        ],
        title: {
          text: "年度待办统计",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["生活", "工作", "学习", "健康", "社交", "其它"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            z: 0,
            type: "category",
            boundaryGap: false,
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "生活",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.monthdata1,
          },
          {
            name: "工作",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.monthdata2,
          },
          {
            name: "学习",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.monthdata3,
          },
          {
            name: "健康",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgb(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.monthdata4,
          },
          {
            name: "社交",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 191, 0)",
                },
                {
                  offset: 1,
                  color: "rgb(224, 62, 76)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.monthdata5,
          },
          {
            name: "其它",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.monthdata6,
          },
        ],
      });
    },
    // 表二
    getmychart2() {
      this.mycahrt2 = echarts.init(document.getElementById("leftview"));
      this.mycahrt2.setOption({
        title: {
          text: "最近7天时间掌控评估",
        },
        radar: {
          indicator: [
            { name: "勤奋", max: 100 },
            { name: "一般", max: 200 },
            { name: "懒惰", max: 300 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [this.oldsevenpercent, this.oldsevenpercent, this.oldsevenpercent],
                name: "Allocated Budget",
              },
            ],
          },
        ],
      });
    },
    // 获取前七日待办数据
    async getsevendata() {
      const { data: res } = await this.$http.get('/backlog/selectbacklogdatadone')
      console.log(this.oldsevendate)
      if(res.code == 200){
        console.log(res)
        this.allnum = res.data.length
        this.alldonenum = res.data.filter((item) => {
          return item.done == 1
        }).length
        this.allnumpercent = Math.ceil((this.alldonenum / this.allnum)*100)
        this.oldsevennum = res.data.filter((item) => {
          return (item.datetime.split(" ")[0] >= this.oldsevendate && item.datetime.split(" ")[0] <= this.todaydate)
        }).length
        this.oldsevennumdonenum = res.data.filter((item) => {
          return (item.datetime.split(" ")[0] >= this.oldsevendate && item.datetime.split(" ")[0] <= this.todaydate && item.done == 1)
        }).length
        this.oldsevenpercent = Math.ceil((this.oldsevennumdonenum / this.oldsevennum)*100)
      }
    },
    // 获取总待办数据
    async getalldata() {}
  },
};
</script>

<style scoped>
.statisticsbox {
  margin-left: 280px;
  height: 100%;
}
.statistics {
  /* min-width: 1039px; */
  width: calc(100% - 30px);
  float: left;
  margin-top: -10px;
}
.stap {
  margin-top: 8px;
  font-size: 20px;
  font-weight: 600;
}
#stabox {
  height: 380px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
}
#leftview {
  min-width: 410px;
  margin: 30px 0 30px 0;
  float: left;
  width: calc(50% - 15px);
  height: 350px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
}
#rightview {
  min-width: 410px;
  margin: 30px 0 30px 30px;
  float: left;
  width: calc(50% - 15px);
  height: 350px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
}

.data-report {
  cursor: default;
  position: relative;
  overflow: hidden;
  flex-grow: 2;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 21.5rem;
  border-radius: 16px;
  background-color: #fff;
}
.box {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 50%;
}
.box:hover {
  background-color: rgba(15, 23, 42, 0.02);
}
.top {
  display: flex;
  align-items: baseline;
}
.number {
  color: rgba(15, 23, 42, 0.65);
  font-size: 3rem;
  font-weight: 600;
  line-height: 3rem;
  letter-spacing: 1px;
}
.unit {
  position: relative;
  top: -0.125rem;
  color: rgba(15, 23, 42, 0.45);
  font-weight: 500;
  margin-left: 0.3rem;
}
.label {
  margin-top: 1rem;
  color: rgba(15, 23, 42, 0.45);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
}
</style>