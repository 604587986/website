export default {
    data() {
        return {
            mixinFormItemLayoutShort: {
                labelCol: { xxl: { span: 4 }, xl: { span: 4 }, lg: { span: 6 },md: { span: 4 }, sm: { span: 24 } },
                wrapperCol: { xxl: { span: 8 }, xl: { span: 10 }, lg: { span: 12 },md: { span: 14 }, sm: { span: 24 } }
            },
        }
    },
    methods: {
        mixin_format_img: function (url, size) {
            if (url) {
                var i = url.lastIndexOf('.');
                var a = url.slice(0, i);
                var b = url.slice(i);
                return a + size + b
            } else {
                return ''
            }
        },
        mixin_jump: function (route) {
            this.$router.push(route)
        }
    }
}