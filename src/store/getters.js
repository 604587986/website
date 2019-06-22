const getters = {
  //需要动态添加的路由（经过权限过滤）
  addRouters: state => state.permission.addRouters,
  //标记用户登录状态（fasle则重定向到登录页）
  status: (state) => {
    if (state.user.user) {
      return true
    }
    return false;
  },
  //用户所在权限组（与后端一致）
  group: (state) => {
    if (state.user.group) {
      return state.user.group.level
    }
    return '';
  }
}

export default getters