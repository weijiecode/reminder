<template>
  <div class="home">
    <Menu></Menu>
    <Menutop></Menutop>
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "../components/menu.vue";
import Menutop from "../components/menutop.vue";
export default {
  data() {
    return {};
  },
  created() {
    this.$router.push({ path: "/backlog" });
  },
  components: {
    Menu,
    Menutop,
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