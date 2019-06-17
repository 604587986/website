
import AdminBasicLayout from '@/layouts/AdminBasicLayout'//系统管理员布局
import UserBasicLayout from '@/layouts/UserBasicLayout'//普通管理员布局
import UserPanelLayout from '@/layouts/UserPanelLayout'//普通管理员工作台布局

import RouteView from '@/layouts/RouteView'//封装过的router-view

export const adminRouter = [{
    path: '/',
    name: 'index',
    component: AdminBasicLayout,
    meta: { title: '首页' },
    redirect: '/workbench',
    children: [
        {
            path: '/workbench',
            name: 'workbench',
            component: () => import('@/views/admin/workbench'),
            meta: { title: '工作台', icon: 'gongzuotai' }
        },
        {
            path: '/site',
            name: 'site',
            component: RouteView,
            meta: { title: '站点管理', icon: 'zhandianguanli' },
            redirect: '/site/site-list',
            children: [
                {
                    path: '/site/add-site',
                    name: 'addSite',
                    component: () => import('@/views/admin/site/addSite'),
                    meta: { title: '添加站点' }
                },
                {
                    path: '/site/site-list',
                    name: 'siteList',
                    component: () => import('@/views/admin/site/siteList'),
                    meta: { title: '站点列表' }
                },
                {
                    path: '/site/article-list',
                    name: 'articleList',
                    component: () => import('@/views/admin/site/articleList'),
                    meta: { title: '文章列表' }
                },
                {
                    path: '/site/backup',
                    name: 'backup',
                    component: () => import('@/views/admin/site/backup'),
                    meta: { title: '数据备份' }
                },

            ]
        },
        {
            path: '/attachment',
            name: 'attachment',
            component: RouteView,
            meta: { title: '附件管理', icon: 'fujianguanli' },
            redirect: '/attachment/list',
            children: [
                {
                    path: '/attachment/list',
                    name: 'attachmentList',
                    component: () => import('@/views/admin/attachment/attachmentList'),
                    meta: { title: '附件列表' }
                }
            ]
        },
        {
            path: '/component',
            name: 'component',
            component: RouteView,
            meta: { title: '组件管理', icon: 'zujianguanli' },
            redirect: '/component/list',
            children: [
                {
                    path: '/component/add',
                    name: 'addComponent',
                    component: () => import('@/views/admin/component/addComponent'),
                    meta: { title: '添加组件' }
                },
                {
                    path: '/component/list',
                    name: 'componentList',
                    component: () => import('@/views/admin/component/componentList'),
                    meta: { title: '组件列表' }
                },
            ]
        },
        {
            path: '/template',
            name: 'template',
            component: RouteView,
            meta: { title: '网站模板', icon: 'wangzhanmoban' },
            redirect: '/template/list',
            children: [
                {
                    path: '/template/add',
                    name: 'addTemplate',
                    component: () => import('@/views/admin/template/addTemplate'),
                    meta: { title: '添加模板' }
                },
                {
                    path: '/template/list',
                    name: 'templateList',
                    component: () => import('@/views/admin/template/templateList'),
                    meta: { title: '模板列表' }
                },
            ]
        },
        {
            path: '/authority',
            name: 'authority',
            component: RouteView,
            meta: { title: '权限管理', icon: 'quanxianguanli' },
            redirect: '/authority/user-list',
            children: [
                {
                    path: '/authority/add-user',
                    name: 'addUser',
                    component: () => import('@/views/admin/authority/addUser'),
                    meta: { title: '添加用户' }
                },
                {
                    path: '/authority/user-list',
                    name: 'userList',
                    component: () => import('@/views/admin/authority/userList'),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/authority/add-group',
                    name: 'addGroup',
                    component: () => import('@/views/admin/authority/addGroup'),
                    meta: { title: '添加用户组' }
                },
                {
                    path: '/authority/group-list',
                    name: 'groupList',
                    component: () => import('@/views/admin/authority/groupList'),
                    meta: { title: '用户组列表' }
                },
            ]
        },
    ]
},
{
    path: '*', redirect: '/404', hidden: true
}]

export const userRouter = [{
    path: '/workbench',
    name: 'workbench',
    component: UserPanelLayout,
    meta: { title: '工作台', icon: 'gongzuotai' },
}, {
    path: '/',
    name: 'index',
    component: UserBasicLayout,
    meta: { title: '首页' },
    redirect: '/workbench',
    children: [
        {
            path: '/article',
            name: 'article',
            component: RouteView,
            meta: { title: '文章管理', },
            redirect: '/article/list',
            children: [
                {
                    path: '/article/list',
                    name: 'articleList',
                    component: () => import('@/views/user/article/list'),
                    meta: { title: '文章列表', showInPanel: true,icon:'wenzhangliebiao' },

                },
                {
                    path: '/article/publish',
                    name: 'publishArticle',
                    component: () => import('@/views/user/article/publish'),
                    meta: { title: '发文章', showInPanel: true ,icon:'fawenzhang'},
                },
                {
                    path: '/article/edit',
                    name: 'editArticle',
                    component: () => import('@/views/user/article/edit'),
                    meta: { title: '编辑文章' }
                },
            ]
        },
        {
            path: '/tag',
            name: 'tag',
            component: RouteView,
            meta: { title: '文章标签', },
            redirect: '/tag/list',
            children: [
                {
                    path: '/tag/list',
                    name: 'tagList',
                    component: () => import('@/views/user/tag/list'),
                    meta: { title: '标签列表', showInPanel: true,icon:'biaoqian' },

                },
            ]
        },
        {
            path: '/single-page',
            name: 'singlePage',
            component: RouteView,
            meta: { title: '单页', },
            redirect: '/single-page/list',
            children: [
                {
                    path: '/single-page/list',
                    name: 'singlePageList',
                    component: () => import('@/views/user/singlePage/list'),
                    meta: { title: '单页列表', showInPanel: true ,icon:'danye' },

                },
            ]
        },
        {
            path: '/category',
            name: 'category',
            component: RouteView,
            meta: { title: '分类管理', },
            redirect: '/category/list',
            children: [
                {
                    path: '/category/list',
                    name: 'categoryList',
                    component: () => import('@/views/user/category/list'),
                    meta: { title: '分类列表', showInPanel: true ,icon:'lanmuliebiao' },

                },
            ]
        },
        {
            path: '/links',
            name: 'links',
            component: RouteView,
            meta: { title: '友情链接管理', },
            redirect: '/links/list',
            children: [
                {
                    path: '/links/list',
                    name: 'linksList',
                    component: () => import('@/views/user/links/list'),
                    meta: { title: '友情链接列表', showInPanel: true ,icon:'youqinglianjie' },

                },
            ]
        },
        {
            path: '/carousel',
            name: 'carousel',
            component: RouteView,
            meta: { title: '轮播图管理', },
            redirect: '/carousel/list',
            children: [
                {
                    path: '/carousel/list',
                    name: 'carouselList',
                    component: () => import('@/views/user/carousel/list'),
                    meta: { title: '轮播图列表', showInPanel: true ,icon:'lunbo' },

                },
            ]
        },
        {
            path: '/advertise',
            name: 'advertise',
            component: RouteView,
            meta: { title: '广告管理', },
            redirect: '/advertise/list',
            children: [
                {
                    path: '/advertise/list',
                    name: 'advertiseList',
                    component: () => import('@/views/user/advertise/list'),
                    meta: { title: '广告列表', showInPanel: true ,icon:'guanggao' },

                },
            ]
        },
    ]

}]