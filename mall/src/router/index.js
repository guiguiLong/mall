import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ('../pages/home')

const Index = () =>
    import ('../pages/index')

const Product = () =>
    import ('../pages/product')

const Detail = () =>
    import ('../pages/detail')

const Cart = () =>
    import ('../pages/cart')

const Login = () =>
    import ('../pages/login')

const Order = () =>
    import ('../pages/order')

const OrderList = () =>
    import ('../pages/orderList')

const OrderConfirm = () =>
    import ('../pages/orderConfirm')

const OrderPay = () =>
    import ('../pages/orderPay')

const AliPay = () =>
    import ('../pages/alipay')

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Home,
        redirect: '/index',
        children: [{
                path: 'index',
                component: Index
            },
            {
                path: 'product/:id',
                component: Product
            }, {
                path: 'detail/:id',
                component: Detail
            }
        ]
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/cart',
        component: Cart
    }, {
        path: '/order',
        component: Order,
        children: [{
                path: 'list',
                component: OrderList
            },
            {
                path: 'confirm',
                component: OrderConfirm
            },
            {
                path: 'pay',
                component: OrderPay
            },
            {
                path: 'alipay',
                component: AliPay
            }
        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router