<template>
	<a-modal title="管理员列表" :footer="null" destroyOnClose :visible="userPanelShow" @cancel="handleCancel">
		<a-spin :spinning="spinning">
			<div style="min-height:100px;width:100%">
				<a-collapse v-if="keys.length">
					<a-collapse-panel v-for="item in keys" :key="item" :header="item">
						<a-tag v-for="user in userList[item]" :key="user.id" @click="saveUserAndMock(user.id)">{{user.nickname}}</a-tag>
					</a-collapse-panel>
				</a-collapse>
			</div>
		</a-spin>
	</a-modal>
</template>
<script>
import { getUserList } from "@/api/auth";
import groupBy from "lodash/groupBy";
import Cookie from "js-cookie";
export default {
	data() {
		return {
			userList: {},
			spinning: false
		};
	},
	computed: {
		keys: function() {
			return Object.keys(this.userList);
		}
	},
	props: {
		userPanelShow: {
			type: Boolean,
			default: false
		},
		siteId: {
			type: [String, Number],
			required: true
		}
	},

	watch: {
		siteId: {
			handler: function(newVal, oldVal) {
				if (newVal === oldVal) {
				} else {
					this.userList = {};
					this.getUserList();
				}
			},
			immediate: true
		}
	},
	methods: {
		getUserList() {
			this.spinning = true;
			const data = {
				site_id: this.siteId
			};
			getUserList(data)
				.then(res => {
					this.spinning = false;
					const list = res.data.list;

					this.userList = groupBy(list, "group_title");
				})
				.catch(err => {
					this.spinning = false;
				});
		},
		saveUserAndMock(userId) {
			Cookie.set("mock_user", userId);
			Cookie.set("mock_site", this.siteId);
			setTimeout(() => {
				location.href = "/";
			}, 300);
		},
		handleCancel() {
			this.$emit("update:userPanelShow", false);
		}
	}
};
</script>
