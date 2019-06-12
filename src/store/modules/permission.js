import { adminRouter,userRouter } from '@/config/router.config.js'

const permission = {
    state: {
        // addRouters: adminRouter,
        addRouters: userRouter
    }
}
export default permission