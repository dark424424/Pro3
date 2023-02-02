import * as VueRouter from "vue-router"



const routes = [
    {
        path: '/dang-nhap',
        name: "Sign In Page",
        component: () => import("../views/Auth/SignInPage.vue"),

    },
    {
        path: '/dang-ki',
        name: "Sign Up Page",
        component: () => import("../views/Auth/SignUpPage.vue"),

    },
    {
        path: '/',
        name: "Landing Page",
        component: () => import("../views/LandingPage.vue")

    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: () => import('../views/NotFound/NotFound.vue')
    },
    {
        path: '/viec-lam',
        name: "Search Job",
        component: () => import('../views/Job/SearchJobsPage.vue'),
    },

    {
        path: '/viec-lam/:jobName_companyId',
        name: "Job detail",
        component: () => import('../views/Job/JobDetailPage.vue'),
    },
    {
        path: '/quen-mat-khau',
        name: "Forgot Password Page",
        component: () => import('../views/Auth/ForgotPassword.vue')
    },
    {
        path: '/tong-quan-tai-khoan',
        name: "Account Management",
        component: () => import("../views/Account/AccountManagementPage.vue"),
        

    },
    {
        path:"/tong-quan-tai-khoan/viec-lam-cua-toi",
        name: "Account My Company",
        component: ()=> import('../views/Account/AccountApplication.vue')
    },
    {
        path:"/cong-ty",
        name: "Search Company",
        component: ()=> import('../views/Company/SearchCompanyPage.vue')
    },
    {
        path:"/cong-ty/:companyName",
        name: "Company Detail",
        component: ()=> import('../views/Company/CompanyDetailPage.vue')
    },
    {
        path: '/test',
        name: "Test",
        component: () => import('../views/TestPage.vue')
    },

]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
    scrollBehavior(to, from, savedPosition) {
        // console.log(to, from);
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})





export default router