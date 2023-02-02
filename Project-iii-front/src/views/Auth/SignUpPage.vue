<template>
    <q-page class="bg-gray window-height window-width row justify-center items-center">
        <div class="column">
            <div class="row">
                <router-link to="/">
                    <h5 class="text-h5 text-negative q-my-md">Long Study networking</h5>
                </router-link>
            </div>
            <div class="row">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input color="negative" square filled clearable v-model="email" type="email"
                                label="Email" />
                            <q-input color="negative" square filled clearable v-model="name" type="text" label="Tên" />
                            <q-input color="negative" square filled clearable v-model="phone" type="text"
                                label="Số điện thoại" />
                            <q-input color="negative" square filled clearable v-model="password" type="password"
                                label="Mật khẩu" />

                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn @click="_register" unelevated color="negative" size="lg" class="full-width"
                            label="Đăng kí" />
                    </q-card-actions>
                    <q-card-section class="text-center q-pa-none">
                        <p class="text-grey-6">Đã có tài khoản?
                            <router-link to="/dang-nhap">
                                <span>
                                    Đăng nhập
                                </span>
                            </router-link>
                        </p>
                    </q-card-section>
                    <p class="text-center text-negative">{{ message }}</p>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
<script>
import { regiserUser, getMe } from "@/apis/auth"
import { useUserStore } from "@/stores/userStore"
import LayoutFake from "@/layouts/LayoutFake.vue"
import { getAllApplicationIn_User } from '@/apis/application'


export default {

    data() {
        return {
            email: "",
            password: "",
            phone: "",
            name: "",
            message: "",
            userStore: useUserStore(),
            prevRoute: null
        }
    },
    created() {
        this.$emit("update:layout", LayoutFake)
        this.prevRoute = this.$router.options.history.state.back

        // this.checkLoggedIn()
    },
    methods: {
        goBack() {
            if (this.prevRoute || this.prevRoute == "/dang-nhap" || this.prevRoute == "/dang-ki") {
                this.$router.push('/')
            } else {
                this.$router.go(-1)
            }
        },

        _register() {
            this.message = ''

            regiserUser({ email: this.email, password: this.password, name: this.name, phone: this.phone }).then(data => {
                if (data) {
                    getMe().then(data => {
                        if (data) {
                            let { email, _id, info, activity, roleNumber, createdAt, updatedAt, } = data.user

                            this.userStore.setState({ email, _id, info, activity, roleNumber, createdAt, updatedAt })

                            this.goBack()

                        } else {
                            this.userStore.$reset()
                        }
                        // this.userStore.setFlagGet();
                    })
                } else {
                    this.message = "Tên đăng nhập/ mật khẩu không tồn tại"
                }

            })
        },

    }

}
</script>
<style lang="scss">

</style>