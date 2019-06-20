import upload from '@/components/upload'
import './index.less'

import { getList } from '@/api/attachment'//获取附件列表

export default {
    name: "filePicker",
    components: { upload },
    props: {
        value: {},
        default: {},
        allowType: {
            type: Array,
            default() { return ['image', 'movie', 'attachment'] }
        }
    },
    computed: {
        fileTypeList: function () {
            let arr = [];
            if (this.allowType.includes('image')) {
                arr.push({
                    value: 1,
                    label: '图片'
                })
            }
            if (this.allowType.includes('attachment')) {
                arr.push({
                    value: 2,
                    label: '文档'
                })
            }
            if (this.allowType.includes('movie')) {
                arr.push({
                    value: 3,
                    label: '视频'
                })
            }
            return arr
        },


    },
    data() {
        return {
            modalVisible: false,
            listLoading: false,
            selectedFile: {
                id: '',
            },
            confirmFile: null,
            dataSource: [
                // {
                //     id: 1,
                //     title: 'Title 1',
                //     url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                //     desc: '我是一张图片',
                //     type: 1
                // },
            ],
            defaultValue: this.default,
            fileType: '',
            pagination: {
                showSizeChanger: true,
                total: undefined,
                current: 1,
                pageSize: 10
            }
        }
    },
    methods: {
        //获取附件列表
        getAttachmentList() {
            this.listLoading = true
            const ajaxData = {
                page: this.pagination.current,
                size: this.pagination.pageSize,
                type: this.fileType
            }
            getList(ajaxData).then(res => {
                this.listLoading = false

                this.dataSource = res.data.list;
                this.pagination.total = res.data.count
            })
        },
        // 打开模态框
        openModal() {
            this.modalVisible = true
        },
        // 关闭模态框
        closeModal() {
            this.modalVisible = false
        },
        //分页变化
        handleSizeChange(current, size) {

            this.pagination.pageSize = size;
            this.getAttachmentList()
        },
        //分页变化
        handlePageChange(val) {
            this.pagination.current = val;
            this.getAttachmentList()
        },
        // 文件类型改变时执行的操作（重新请求数据）
        handleFileTypeChange(e) {
            this.dataSource = []
            this.fileType = e.target.value;
            this.getAttachmentList()
        },
        //选择文件，此时并不派发通知事件
        handleSelectFile(item) {
            this.selectedFile = item;
        },
        //双击，执行确认文件方法
        handleDoubleClick(item) {
            this.handleConfirmFile()
        },
        //确认文件，此操作将派发事件告知父组件确认的文件
        handleConfirmFile() {
            this.confirmFile = this.selectedFile;
            this.$emit('confirm-file', this.confirmFile)
            this.closeModal()
        },
        //上传组件点了选择按钮后
        handleSelectUploadFile(file){
            this.selectedFile = file;
            this.confirmFile = file
            this.$emit('confirm-file', this.confirmFile)
            this.closeModal()
        },
        //清除
        handleDelete() {
            this.selectedFile = {};
            this.confirmFile = null;
            this.defaultValue = null;
            this.$emit('confirm-file', this.confirmFile)
        },
        //渲染文件列表
        renderFileList() {
            const listProps = {
                props: {
                    grid: {
                        gutter: 16,
                        xs: 2,
                        sm: 3,
                        md: 3,
                        lg: 4,
                        xl: 4,
                        xxl: 6
                    },
                    loading: this.listLoading,
                    dataSource: this.dataSource,
                    renderItem: (item, index) => {
                        if (this.fileType === 1) {
                            return (
                                <a-list-item ref={item.id} onClick={() => this.handleSelectFile(item)} onDblclick={() => this.handleDoubleClick(item)} style={{ cursor: 'pointer' }} class={{ selected: item.id === this.selectedFile.id }}>
                                    <a-card>
                                        <img src={this.mixin_format_img(item.url, '/160')} style="height:80px" alt="" slot="cover" />
                                        <a-card-meta
                                            title={item.title}>
                                        </a-card-meta>
                                        <a-icon type="check" class="selected-icon" />
                                    </a-card>
                                </a-list-item>
                            )
                        }
                        if (this.fileType === 2) {
                            return (
                                <a-list-item ref={item.id} onClick={() => this.handleSelectFile(item)} onDblclick={() => this.handleDoubleClick(item)} style={{ cursor: 'pointer' }} class={{ selected: item.id === this.selectedFile.id }}>
                                    <a-card>
                                        <a-card-meta
                                            title={item.title}>
                                            <template slot="description">{item.title}</template>
                                        </a-card-meta>
                                        <a-icon type="check" class="selected-icon" />
                                    </a-card>
                                </a-list-item>
                            )
                        }
                        if (this.fileType === 3) {
                            return (
                                <a-list-item ref={item.id} onClick={() => this.handleSelectFile(item)} onDblclick={() => this.handleDoubleClick(item)} style={{ cursor: 'pointer' }} class={{ selected: item.id === this.selectedFile.id }}>
                                    <a-card>
                                        <a-card-meta
                                            title={item.title}>
                                            <template slot="description">{item.desc}</template>
                                        </a-card-meta>
                                        <a-icon type="check" class="selected-icon" />
                                    </a-card>
                                </a-list-item>
                            )
                        }
                    }
                }
            }

            return (
                <div>
                    <a-radio-group style={{ marginBottom: '20px' }} onChange={this.handleFileTypeChange} value={this.fileType}>
                        {
                            this.fileTypeList.map(i => {
                                return <a-radio value={i.value} key={i.value}>{i.label}</a-radio>
                            })
                        }
                    </a-radio-group>
                    <a-list {...listProps} class="file-picker">
                        {this.renderPagination()}
                    </a-list>
                </div >
            )
        },
        //渲染分页
        renderPagination() {
            const paginationProps = {
                props: this.pagination,
                style: {
                    textAlign: 'center'
                },
                on: {
                    showSizeChange: this.handleSizeChange,
                    change: this.handlePageChange
                }
            }
            return <a-pagination {...paginationProps} />
        },
        //渲染tabs
        renderTabs() {
            const tabsProps = {
                props: {
                    defaultActiveKey: '1'
                },
            }
            return (
                <div>
                    <a-tabs {...tabsProps}>
                        <a-tab-pane key="1">
                            <span slot="tab">
                                <a-icon type="folder" />
                                选择文件
                            </span>
                            {this.renderFileList()}
                        </a-tab-pane>
                        <a-tab-pane key="2">
                            <span slot="tab">
                                <a-icon type="upload" />
                                上传文件
                            </span>
                            <upload type={this.fileType} onUploadedAndSelected={this.handleSelectUploadFile}   onComplete={(data) => { console.log(data) }}></upload>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            )
        },
        // 渲染模态框
        renderModal() {
            const { modalVisible, modalTitle } = this
            const modalProps = {
                props: {
                    visible: modalVisible,
                    title: modalTitle,
                    width: '64%',
                },
                on: {
                    cancel: this.closeModal,
                    ok: this.handleConfirmFile
                },
            }
            return (
                <a-modal {...modalProps}>
                    {this.renderTabs()}
                </a-modal>
            )
        },
        //渲染预览框
        renderPreview() {
            const { confirmFile, defaultValue } = this;
            let currentFile;
            if (confirmFile) {
                currentFile = confirmFile
            } else if (!confirmFile && defaultValue) {
                currentFile = defaultValue
            } else {
                currentFile = null
            }
            if (currentFile) {
                if (currentFile.type === 1) {
                    return (
                        <div class="preview-img-wrap">
                            <div class="title">{currentFile.title}</div>
                            <div class="mask-wrap">
                                <img class="preview-img" src={currentFile.url} alt={currentFile.desc}></img>
                                <div class="img-mask">
                                    <a href={currentFile.url} target="_blank">
                                        <a-icon type="eye" />
                                    </a>
                                    <a-icon type="delete" onClick={this.handleDelete} />
                                    <a-icon type="edit" onClick={this.openModal} />
                                </div>
                            </div>

                        </div>
                    )
                }
                if (currentFile.type === 2) {
                    return (
                        <div class="preview-doc-wrap">
                            <a-icon type="file-text" />
                            <a download href={currentFile.url} target="_blank" class="title">{currentFile.title}</a>
                            <a-icon type="delete" onClick={this.handleDelete} style="margin-left:20px;cursor:pointer" title="删除" />
                            <a-icon type="edit" onClick={this.openModal} />

                        </div>
                    )
                }
                if (currentFile.type === 3) {
                    return (
                        <div class="preview-video-wrap">
                            <div class="title">{currentFile.title}</div>
                            <div class="mask-wrap">
                                <video src={currentFile.url} controls>
                                </video>
                                <div class="icon-wrap">
                                    <a-icon type="delete" onClick={this.handleDelete} />
                                    <a-icon type="edit" onClick={this.openModal} />
                                </div>
                            </div>

                        </div>
                    )
                }
            }

            return null
        }

    },
    mounted() {
        this.fileType = this.fileTypeList[0].value;
        this.getAttachmentList()
    },
    watch: {
        default: function (val) {
            this.defaultValue = val
        },
        fileType: {
            handler: function (val) {
                // if (val == 1) {
                //     this.dataSource = [
                //         {
                //             id: 1,
                //             title: 'Title 1',
                //             url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                //             desc: '我是一张图片',
                //             type: 1
                //         },
                //         {
                //             id: 2,
                //             title: 'Title 1',
                //             url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                //             desc: '我是第二张图片',
                //             type: 1
                //         },
                //         {
                //             id: 3,
                //             title: 'Title 1',
                //             url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                //             desc: '我是第三张图片。',
                //             type: 1
                //         },
                //         {
                //             id: 4,
                //             title: 'Title 1',
                //             url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                //             desc: '我是一张图片',
                //             type: 1
                //         },
                //         {
                //             id: 5,
                //             title: 'Title 1',
                //             url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                //             desc: '我是一张图片',
                //             type: 1
                //         },
                //         {
                //             id: 6,
                //             title: 'Title 1',
                //             url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                //             desc: '我是一张图片',
                //             type: 1
                //         },
                //         {
                //             id: 7,
                //             title: 'Title 1',
                //             url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                //             desc: '我是一张图片',
                //             type: 1
                //         },
                //         {
                //             id: 8,
                //             title: 'Title 1',
                //             url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                //             desc: '我是一张图片',
                //             type: 1
                //         },

                //     ]
                // }
                // if (val == 2) {
                //     this.dataSource = [
                //         {
                //             id: 10,
                //             title: '文档 1',
                //             url: 'https://hengdian.q-huan.link/attachment/20181025/3ef2e879cbe3dbe242f8c63afd0dd90a.xls',
                //             desc: '我是一个文档',
                //             type: 2
                //         },
                //     ]
                // }
                // if (val == 3) {
                //     this.dataSource = [
                //         {
                //             id: 20,
                //             title: '视频 1',
                //             url: 'http://www.w3school.com.cn/i/movie.ogg',
                //             desc: '我是一个视频',
                //             type: 3
                //         },
                //     ]
                // }

            },
            immediate: true
        },

    },
    render(h) {

        const props = {
            on: {
                click: this.openModal
            },

        }
        return (
            <div class="file-picker-btn-wrap">
                {this.confirmFile || (this.defaultValue && this.defaultValue.id) ? null : <a-button {...props}>选择或上传</a-button>}
                {this.$slots.default && this.$slots.default[0]}
                {this.renderPreview()}
                {this.renderModal()}
            </div>
        )

    }
}