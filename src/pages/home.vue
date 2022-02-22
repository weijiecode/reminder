<template>
  <div class="home">
    <Menu></Menu>
    <Menutop></Menutop>
    <Backlog v-if="$route.path == '/home'"></Backlog>
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "../components/menu.vue";
import Menutop from "../components/menutop.vue";
import Backlog from "../components/backlog.vue"
export default {
  data() {
    return {};
  },
  created() {},
  components: {
    Menu,
    Menutop,
    Backlog
  },
  methods: {},
};
</script>

<style scoped>
.home {
  background-color: #f1f2f6;
  width: 100%;
  height: 100%;
}

</style>