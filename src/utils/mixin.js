export default {
    methods: {
        mixin_format_img: function (url,size) {
            if (url) {
                var i = url.lastIndexOf('.');
                var a = url.slice(0, i);
                var b = url.slice(i);
                return a + size + b
            } else {
                return ''
            }
        },
        mixin_jump:function(route){
            this.$router.push(route)
        }
    }
}