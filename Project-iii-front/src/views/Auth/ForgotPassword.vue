<template>
    
    <div class="bg-gray p-container  col justify-center items-center">
        <div class="row">
                <router-link to="/">
                    <h5 class="text-h5 text-negative q-my-md">Long Study networking</h5>
                </router-link>
            </div>
        <q-stepper v-model="step" ref="stepper" animated done-color="deep-orange" active-color="negative"
            inactive-color="black">
            <q-step :name="1" title="Lấy lại mật khẩu" icon="settings" :done="step > 1">
                <div class="">
                    <q-input color="negative" square filled clearable v-model="email" type="email" label="Email" />
                    <q-btn  disable='loading' @click="_getBackPassword" unelevated color="negative" size="md"
                        class="full-width q-mt-md" label="Lấy lại mật khẩu" />
                </div>
            </q-step>

            <q-step :name="2" title="Thông báo" caption="Optional" icon="add_comment" :done="step >= 2">
                {{ message }}<span v-if="!success" class="cursor-pointer text-weight-bold" @click="tryAgain">thử
                    lại</span>
            </q-step>


            <!-- <template v-slot:navigation>
                <q-stepper-navigation>
                    <q-btn @click="$refs.stepper.next()" color="deep-orange"
                        :label="step === 3 ? 'Finish' : 'Continue'" />
                    <q-btn v-if="step > 1" flat color="deep-orange" @click="$refs.stepper.previous()" label="Back"
                        class="q-ml-sm" />
                </q-stepper-navigation>
            </template> -->
        </q-stepper>
    </div>
</template>
<script>
import { ref } from 'vue'
import { forgotPassword } from "@/apis/auth"
export default {
    setup() {
        return {
            step: ref(1)
        }
    },
    data() {
        return {
            email: "",
            message: "Không tồn tại",
            success: false,
            loading: false
        }
    },

    methods: {
        _getBackPassword() {
            this.loading = true
            forgotPassword({ email: this.email }).then(data => {
                this.step = 2
                this.loading = false
                if (data) {
                    this.success = true
                    this.message = "Hãy kiểm tra hòm thư " + this.email + " của bạn"
                } else {
                    this.success = false
                    this.message = "Email không tồn tại. Xin hãy "
                }
            })
        },
        tryAgain() {
            this.step = 1
        }
    }
}
</script>
<style lang="scss">

</style>