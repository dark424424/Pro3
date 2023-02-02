<template>
    <div class="bg-grey-1">
        <div class="p-container q-mt-md ">
            <div class=" row q-gutter-lg">
                <div class="col-7">
                    <AccountJob></AccountJob>
                </div>
                <div class="col-4">
                    <RecommendJob />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RecommendJob from '@/components/AccountManagement/RecommendJob.vue'
import DrawerVue from '@/layouts/Drawer.vue'
import AccountJob from "@/components/AccountJob/index.vue"
import { useUserStore } from '@/stores/userStore';


export default {
    data() {
        return {
            userStore: useUserStore(),
           
        }
    },
    components: {
        RecommendJob,
        AccountJob,
    },
    watch: {
        "userStore.getUserState._id"(newValue, oldValue) {
            this.redirectIfAuthenFail()
        },
    },
    created() {

        this.redirectIfAuthenFail()
        this.$emit("update:layout", DrawerVue)

    },
    methods: {
        redirectIfAuthenFail() {
            if (this.userStore.getUserState._id) {

            } else {
                this.$router.push('/dang-nhap')

            }
        }
    }
}
</script>
<style lang="">
    
</style>