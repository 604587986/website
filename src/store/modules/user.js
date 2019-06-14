
import { login } from '@/api/user'
const user = {
    state: {
        info: {}
    },
    actions: {
        login({ commit }, data) {
            login(data).then(res => {
                console.log(res);
            })
        }
    }
}
export default user