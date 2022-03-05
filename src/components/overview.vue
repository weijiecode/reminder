<template>
  <div id="viewbox" style="width: 260px; height: 300px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ["toclass"],
  data() {
    return {
      mychart: null,
    };
  },
  components: {
    echarts,
  },
  mounted() {
    // 防止报警告：Can't get DOM width or height
    Object.defineProperty(document.getElementById('viewbox'),'clientWidth',{get:function(){return 260;}})
    Object.defineProperty(document.getElementById('viewbox'),'clientHeight',{get:function(){return 300;}})
    this.mycharts();
  },
  // 监听数据 重新初始化echarts 同步渲染
  watch: {
    toclass: {
      deep: true,
      handler(newValue) {
        // this.toclass = newValue
        this.mychart.dispose();
        this.mycharts();
      },
    },
  },
  methods: {
    mycharts() {
      // 基于准备好的dom，初始化echarts实例
      this.mychart = echarts.init(document.getElementById("viewbox"));
      // 绘制图表
      this.mychart.setOption({
        legend: {
          top: "bottom",
        },
        tooltip: {
          show: true,
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: { show: true },
            restore: { show: true },
          },
        },
        series: [
          {
            name: "待办事项",
            type: "pie",
            radius: [8, 50],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: this.toclass.a, name: "生活" },
              { value: this.toclass.b, name: "工作" },
              { value: this.toclass.c, name: "学习" },
              { value: this.toclass.d, name: "健康" },
              { value: this.toclass.e, name: "社交" },
              { value: this.toclass.f, name: "其它" },
            ],
          },
        ],
        color: [
          "#5da7f1",
          "#d81e06",
          "#82529d",
          "#f36372",
          "#2aa515",
          "#e0620d",
        ],
      });
    },
  },
};
</script>

<style scoped>

#viewbox {
   width: 100%;
   height: 100%;
  }
</style>