<template>
    <div class="bg-gray window-height window-width row justify-center items-center">
        <div class="column">
            <div class="row">
                <router-link to="/">
                    <h5 class="text-h5 text-negative q-my-md">Thai networking</h5>
                </router-link>
            </div>
            <div class="row">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input color="negative" square filled clearable v-model="email" type="email"
                                label="Email" />
                            <q-input color="negative" square filled clearable v-model="password" type="password"
                                label="Mật khẩu" />
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn @click="_login_" unelevated color="negative" size="lg" class="full-width"
                            label="Đăng nhập" />
                    </q-card-actions>
                    <q-card-section class="text-center q-pa-none">
                        <p class="text-grey-6">
                            <router-link to="/quen-mat-khau">
                                <span>
                                    Quên mật khẩu
                                </span>
                            </router-link>
                            <q-separator vertical inset />
                            <router-link to="/dang-ki">
                                <span>
                                    Tạo tài khoản
                                </span>
                            </router-link>
                        </p>

                    </q-card-section>
                    <p class="text-center text-negative">{{ message }}</p>
                </q-card>
            </div>
        </div>
    </div>
</template>
<script>
import { login, getMe } from "@/apis/auth"

import { useUserStore } from "@/stores/userStore"
import LayoutFake from "@/layouts/LayoutFake.vue"
import { getAllApplicationIn_User } from '@/apis/application'
export default {
    data() {
        return {
            email: "",
            password: "",
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
        _login_() {
            this.message = ''
            login({ email: this.email, password: this.password }).then(dataLog => {
                if (dataLog) {
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