<template>
  <div>站点列表</div>
</template>
<script>
import { getSiteList } from "@/api/site";
import { log } from 'util';
export default {
  mounted() {
	  this.getSiteList()
  },
  methods: {
    getSiteList() {
      let data = {};
      getSiteList(data).then(res=>{
		  console.log(res)
	  });
    }
  }
};
</script>
