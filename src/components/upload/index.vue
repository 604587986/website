<template>
	<div>
		<a-button type="primary" size="small" class="upload-picker" :class="'upload-picker-'+guid" @mouseover.native="refreshBtn">选择文件</a-button>

		<a-table :columns="columns" :rowKey="record => record.name" :dataSource="tableData" :pagination="false" size="small">
			<span slot="action" slot-scope="text,row">
				<a-button size="small" @click="startUpload(row)">上传</a-button>
				<!-- <a-button size="small" @click="cancelFile(row)">删除</a-button> -->
				<a-button size="small" @click="selectFile(row)">选择</a-button>
			</span>
			<span slot="size" slot-scope="text,row">
				<a-tag>{{formatSize(row.size)}}</a-tag>
			</span>
			<span slot="progress" slot-scope="text,row">
				<span :ref="row.id" class="text"></span>
			</span>
			<span slot="status" slot-scope="text,row">
				<span :ref="row.id+'status'" class="text"></span>
			</span>
		</a-table>
	</div>
</template>
<script>
import {
	upload_check, // 文件整体检查
	chunk_check, //分片检查
	chunk_upload, //分片上传，注意这个接口不走axios,所以有独立的前缀，
	upload_done //上传合并
} from "@/api/upload";

const columns = [
	{
		title: "文件名",
		dataIndex: "name"
	},
	{
		title: "大小",
		dataIndex: "size",
		scopedSlots: { customRender: "size" }
	},
	{
		title: "进度",
		dataIndex: "progress",
		scopedSlots: { customRender: "progress" }
	},
	{
		title: "状态",
		dataIndex: "status",
		scopedSlots: { customRender: "status" }
	},
	{
		title: "操作",
		dataIndex: "action",
		scopedSlots: { customRender: "action" }
	}
];
export default {
	data() {
		return {
			columns,
			guid: Math.floor(Math.random() * 100000),
			uploader: null,
			tableData: [],
			statusMap: {
				inited: "初始状态",
				queued: "等待上传",
				progress: "上传中",
				complete: "上传完成",
				error: " 上传出错",
				interrupt: "暂停中",
				invalid: "文件不合格",
				cancelled: "文件被移除"
			}
		};
	},
	props: {
		type: {
			type: [String, Number],
			default: 1
		}
	},
	mounted() {
		this.$nextTick(() => {
			if (!window.WebUploader) {
				alert("上传组件加载失败");
				return;
			}
		});

		this.registerHooks();
		this.initUpload();
	},
	methods: {
		refreshBtn() {
			this.uploader.refresh();
		},
		startUpload(file) {
			this.uploader.upload(file);
		},
		stopUpload(file) {
			this.uploader.stop(file);
			console.log(file.getStatus());
		},
		cancelFile(file) {
			// 如果文件正在计算MD5，不允许取消
			if (file.in_md5) {
				this.$message.warning("正在检查文件属性，请稍后");
				return;
			}
			//取消上传
			this.uploader.cancelFile(file);
			this.uploader.removeFile(file, true);
			//派发通知事件
			this.cancel(file);
		},
		initUpload() {
			var _this = this;
			this.uploader = WebUploader.create({
				resize: false, // 不压缩image
				compress: false,
				// swf: "../js/uploader.swf", // swf文件路径
				server: chunk_upload, // 文件接收服务端。
				pick: ".upload-picker-" + this.guid, // 选择文件的按钮。可选
				chunked: true, //是否要分片处理大文件上传
				chunkSize: (1024 * 1024 * 5) / 1, //分片上传，每片2M，默认是5M
				chunkRetry: 2,
				duplicate: true, //是否支持重复上传
				prepareNextFile: false,
				duplicate: true,
				formData: {},
				fileVal: "file"
				// accept: [
				// 	{
				// 		extensions: "mp4,mov,wmv,avi",
				// 		mimeTypes:
				// 			"video/mp4,video/quicktime,video/x-ms-wmv,video/x-msvideo"
				// 	}
				// ]
			});
			//添加文件前的校验
			this.uploader.on("fileQueued", function(file) {
				var str = file.name;
				var bytesCount = 0;

				for (var i = 0; i < str.length; i++) {
					var c = str.charAt(i);
					if (/^[\u0000-\u00ff]$/.test(c)) {
						//匹配双字节
						bytesCount += 1;
					} else {
						bytesCount += 3;
					}
				}
				if (bytesCount > 200) {
					let text = "文件名过长！请重命名后再试";

					_this.$message.warning(text);
					return false;
				}
			});

			//	监听添加文件
			this.uploader.on("fileQueued", function(file) {
				_this.tableData.push(file);
			});

			//监听是否正在上传
			this.uploader.on("uploadProgress", function(file, percentage) {
				_this.$refs[file.id].innerHTML =
					"上传进度" + Math.round(percentage * 100) + "%";
				_this.$refs[file.id + "status"].innerHTML = "正在上传";
			});
			this.uploader.on("uploadSuccess", function(file) {});

			//监听是否发生网络错误
			this.uploader.on("uploadError", function(file) {
				console.log("????");

				_this.uploadFailed(file);
			});

			//监听分片是否上传成功
			this.uploader.on("uploadAccept", function(obj, res) {
				if (res.code != 200) {
					console.log("分片上传失败");
					return false;
				}
			});
			//分片上传前构建发送数据
			this.uploader.on("uploadBeforeSend", function(
				block,
				data,
				headers
			) {
				data.fileMd5 = block.file.fileMd5;
				data.chunkMd5 = block.chunkMd5;
				data.chunkSizeStr = block.end - block.start;
				data.chunkIndexStr = block.chunk;
			});
		},
		registerHooks() {
			const _this = this;
			WebUploader.Uploader.unRegister("custom"); //卸载之前注册的钩子
			WebUploader.Uploader.register(
				{
					"before-send-file": "beforeSendFile",
					"before-send": "beforeSend",
					"after-send-file": "afterSendFile",
					name: "custom"
				},
				{
					// 时间点1：所有分块进行上传之前调用此函数
					beforeSendFile: function(file) {
						const deferred = WebUploader.Deferred();

						const uploader = this;

						_this.uploader
							.md5File(file)
							.progress(percentage => {
								//标记文件正在计算MD5
								file.in_md5 = true;

								_this.$refs[file.id].innerHTML =
									"检查文件属性" +
									Math.round(percentage * 100) +
									"%";
							})
							.then(md5 => {
								//标记文件MD5计算完成
								file.in_md5 = false;
								// 将此文件总MD5存到file信息中
								file.fileMd5 = md5;

								const formData = {
									fileMd5: md5,
									size: file.size,
									fileName: file.name,
									title: file.name,
									description: file.name,
									type: 1
								};

								upload_check(formData)
									.then(res => {
										if (
											res &&
											res.code === 200 &&
											res.data &&
											res.data.state === 1
										) {
											file.path = res.data.url; //存储文件路径，用于预览
											file.file_id = res.data.id; //存储文件id，用于保存第三步

											//文件已存在，停止上传
											// deferred.reject();

											_this.$refs[
												file.id
											].innerHTML = `上传进度 100%`;

											_this.uploadComplete(file);

											uploader.owner.skipFile(file);
										} else {
											//文件不存在，执行上传
											deferred.resolve();
										}
									})
									.catch(err => {
										//网络错误，停止上传
										deferred.reject();
									});
							});
						return deferred.promise();
					},
					// 时间点2：如果有分块上传，则每个分块上传之前调用此函数
					beforeSend: block => {
						const deferred = WebUploader.Deferred();
						_this.uploader
							.md5File(block.file, block.start, block.end)
							.then(md5 => {
								// 存储当前分块md5
								block.chunkMd5 = md5;

								// 构造检查分片所需的数据
								const formData = {
									fileMd5: block.file.fileMd5,
									chunkMd5: md5,
									chunkIndexStr: block.chunk,
									chunk_md5: md5
								};

								//检查分片是否存在
								chunk_check(formData)
									.then(res => {
										if (
											res &&
											res.code === 200 &&
											res.data.isExisted
										) {
											//如果存在，跳过此分片
											deferred.reject();
										} else {
											//如果不存在，上传此分片
											deferred.resolve();
										}
									}) //其他错误，同样重新上传此分片
									.catch(err => {
										deferred.resolve();
									});
							});
						return deferred.promise();
					},
					// 时间点3：上传完成
					afterSendFile: (file, res) => {
						const deferred = WebUploader.Deferred();

						const formData = {
							fileName: file.name,
							fileSizeStr: file.size,
							fileMd5: file.fileMd5,
							chunksCountStr: file.blocks.length
						};
						_this.$refs[file.id + "status"].innerHTML =
							"文件合成中";
						upload_done(formData)
							.then(res => {
								if (res && res.code == 200 && res.data) {
									//   合并成功
									file.path = res.data.url; //存储文件路径，
									file.file_id = res.data.id; //存储文件id，

									_this.uploadComplete(file);
									deferred.resolve();
								} else {
									_this.uploadFailed(file);
									deferred.reject();
								}
							})
							.catch(err => {
								_this.uploadFailed(file);
								deferred.reject();
							});

						return deferred.promise();
					}
				}
			);
		},
		uploadComplete(file) {
			this.$refs[file.id + "status"].innerHTML = `上传成功`;
			//派发通知事件
			this.$emit(
				"complete",
				this.tableData.filter(i => {
					return !!i.path;
				})
			);
		},
		uploadFailed(file) {
			this.$refs[file.id + "status"].innerHTML = "上传失败";
		},
		cancel(file) {
			this.tableData = this.tableData.filter(i => {
				return i.id !== file.id;
			});
			this.$emit(
				"complete",
				this.tableData.filter(i => {
					return !!i.path;
				})
			);
		},
		formatSize(fileSize) {
			if (fileSize < 1024) {
				return fileSize + "B";
			} else if (fileSize < 1024 * 1024) {
				var temp = fileSize / 1024;
				temp = temp.toFixed(2);
				return temp + "KB";
			} else if (fileSize < 1024 * 1024 * 1024) {
				var temp = fileSize / (1024 * 1024);
				temp = temp.toFixed(2);
				return temp + "MB";
			} else {
				var temp = fileSize / (1024 * 1024 * 1024);
				temp = temp.toFixed(2);
				return temp + "GB";
			}
		},
		selectFile(file) {
			//没有path，说明未上传成功
			if (!file.path) {
				this.$notification.warning({
					message: "无法选择",
					description: "此文件暂未上传成功"
				});
			} else {
				const emitFile = {
					id: file.file_id,
					title: file.name,
					url: file.path,
					type: this.type,
					desc: file.name
				};
				this.$emit("uploadedAndSelected", emitFile);
			}
		}
	}
};
</script>
<style lang="less" scoped>
.upload-picker {
	padding: 0;
	height: auto;

	/deep/.webuploader-pick {
		padding: 7px 14px;
	}

	/deep/input[type="file"] {
		display: none;
	}
}
.upload-table {
	.text {
		word-break: normal;
	}
}
</style>
