import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import store from './../store'

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

const ProductList = () =>
    import ('../pages/productList')

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const routes = [{
        path: '/',
        component: Home,
        name: 'home',
        redirect: '/index',
        children: [{
                path: 'index',
                name: 'index',
                component: Index
            },
            {
                path: 'product/:id',
                name: 'product',
                component: Product
            }, {
                path: 'detail/:id',
                name: 'detail',
                component: Detail
            }
        ]
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/cart',
        name: 'cart',
        component: Cart
    }, {
        path: '/productList',
        name: 'productList',
        component: ProductList

    }, {
        path: '/order',
        name: 'order',
        component: Order,
        children: [{
                path: 'list',
                name: 'list',
                component: OrderList
            },
            {
                path: 'confirm',
                name: 'confirm',
                component: OrderConfirm
            },
            {
                path: 'pay',
                name: 'pay',
                component: OrderPay
            },
            {
                path: 'alipay',
                name: 'alipay',
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


router.beforeEach((to, from, next) => {
    next();
    if (to.path !== '/login' && VueCookie.get('userId')) {
        axios
            .get("/carts/products/sum")
            .then((res = 0) => {
                store.dispatch("saveCartCount", res);
            })
            .catch((err) => {
                throw err;
            });
        axios
            .get("/user")
            .then((res = {}) => {
                store.dispatch("saveUserName", res.username);
            })
            .catch((err) => {
                throw err;
            });
        axios
            .get("/carts")
            .then((res = {}) => {
                store.dispatch("saveProductInfo", res);
            })
            .catch((err) => {
                throw err;
            });
    }

})
export default router