<template>
  <a-layout-sider
    :class="['sider', device === 'desktop' ? null : 'shadow', theme ]"
    width="180px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <!-- <logo/> -->
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      @select="onSelect"
      :mode="mode"
      style="padding: 16px 0px;"
    ></s-menu>

    <div class="wy-trigger" @click="$store.commit('TOOGLE_SIDEBAR')">
      <a-icon type="double-left" v-if="!collapsed"/>
      <a-icon type="double-right" v-else/>
    </div>
  </a-layout-sider>
</template>

<script>
import ALayoutSider from "ant-design-vue/es/layout/Sider";
// import Logo from "../tools/Logo";
import SMenu from "./index";
import { mapState } from "vuex";

export default {
  name: "SideMenu",
  components: {
    ALayoutSider,
    // Logo,
    SMenu
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: "inline"
    },
    theme: {
      type: String,
      required: false,
      default: "light"
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: true
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  created() {},
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    }
  }
};
</script>
<style lang="less" scoped>
.light {
  background: #fff;
}
.wy-trigger {
  text-align: center;
  position: relative;
  .anticon {
    position: relative;
    z-index: 2;
    background: #fff;
    cursor: pointer;
  }
  &:after {
    display: block;
    content: "";
    height: 1px;
    background: #ccc;
    position: absolute;
    left: 0;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    z-index: 0;
  }
}
</style>
