<template>
  <div>
    <a-spin :spinning="spinning">
      <a-collapse v-if="keys.length">
        <a-collapse-panel v-for="item in keys" :key="item" :header="item">
          <a-tag
            v-for="user in userList[item]"
            :key="user.id"
            @click="saveUserAndMock(user.id)"
          >{{user.nickname}}</a-tag>
        </a-collapse-panel>
      </a-collapse>
    </a-spin>
  </div>
</template>
<script>
import { getUserList } from "@/api/auth";
import groupBy from "lodash/groupBy";
import Cookie from "js-cookie";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      userList: {},
      spinning: true
    };
  },
  computed: {
    keys: function() {
      return Object.keys(this.userList);
    }
  },
  props: {
    siteId: {
      type: [String, Number],
      required: true
    }
  },

  watch: {
    siteId: {
      handler: function() {
        this.getUserList();
      },
      immediate: true
    }
  },
  methods: {
    getUserList() {
      const data = {
        site_id: this.siteId
      };
      getUserList(data).then(res => {
        this.spinning = false;
        const list = res.data.list;

        this.userList = groupBy(list, "group_title");
      });
    },
    saveUserAndMock(userId) {
      Cookie.set("mock_user", userId);
      Cookie.set("mock_site", this.siteId);
      setTimeout(() => {
        location.href = "/";
      }, 300);
    }
  }
};
</script>
