import Vue from 'vue'
import { SIDEBAR_TYPE, DEFAULT_THEME, DEFAULT_LAYOUT_MODE, DEFAULT_COLOR, DEFAULT_COLOR_WEAK, DEFAULT_FULL_WIDTH } from "@/store/mutation-types"

const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop',
    theme: '',
    layout: '',
    color: null,
    weak: false,
    fullwidth: true
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar.opened = type
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOOGLE_SIDEBAR(state) {
      if (state.sidebar.opened) {
        state.sidebar = { ...state.sidebar, opened: false }
      } else {
        state.sidebar = { ...state.sidebar, opened: true }

      }
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_THEME: (state, theme) => {
      state.theme = theme
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      state.layout = layout
    },
    TOGGLE_COLOR: (state, color) => {
      state.color = color
    },
    TOGGLE_WEAK: (state, flag) => {
      state.weak = flag
    },
    TOGGLE_WIDTH: (state, flag) => {
      state.fullwidth = flag
    }
  },
  actions: {
    setSidebar: ({ commit }, type) => {
      commit('SET_SIDEBAR_TYPE', type)
    },
    CloseSidebar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleTheme({ commit }, theme) {
      commit('TOGGLE_THEME', theme)
    },
    ToggleLayoutMode({ commit }, mode) {
      commit('TOGGLE_LAYOUT_MODE', mode)
    },
    ToggleColor({ commit }, color) {
      commit('TOGGLE_COLOR', color)
    },
    ToggleWeak({ commit }, weakFlag) {
      commit('TOGGLE_WEAK', weakFlag)
    },
    ToggleWidth({ commit }, flag) {
      commit('TOGGLE_WIDTH', flag)
    }
  }
}

export default app