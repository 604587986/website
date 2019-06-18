export default {
    data() {
        return {
            pagination: {
                showSizeChanger:true,
                pageSizeOptions: ['10', '20', '30', '40', '50'],
                current: 1,
                pageSize: 10,
                showTotal: total => {
                    return `共${total}条`;
                },
            },
        }
    },
}