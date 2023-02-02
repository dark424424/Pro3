<template >
    <div class=" bg-grey-1" style="min-height: 100vh;">
        <div class="p-container ">
            <div>
                <q-img :src="companyData.info.bannerImage" fit="cover" style="width: 100%; height: 40vh;">
                </q-img>
            </div>
            <div class="bg-white q-px-lg">
                <div class='row q-pt-lg'>

                    <div class="col-2">
                        <q-avatar size="150px" class="bg-white margin-negative-50 shadow-2">
                            <img :src="companyData.info.logo" />
                        </q-avatar>
                    </div>
                    <div class="col-8">
                        <div class="text-bold text-h6">
                            <span>{{ companyData.info.name }}</span>
                        </div>
                        <div class="">
                            <span>Link giới thiệu: </span>
                                <span ><a class="hover" target="_blank" :href="companyData.info.aboutLink">{{companyData.info.aboutLink}}</a></span>
                        </div>
                    </div>

                </div>
                <div>
                    <q-card flat class="q-mt-lg">
                        <q-tabs v-model="tab" dense class="text-grey" active-color="negative" indicator-color="negative"
                            align="left" narrow-indicator>
                            <q-tab class="q-mt-xs" name="company" label="Về chúng tôi" />
                            <q-tab class="q-mt-xs" name="otherjob" label="Việc làm từ công ty" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="tab" animated>
                            <q-tab-panel name="company">
                                <div class="tab-panel-container">
                                    <TabIntroCompanyVue :companyData="companyData">
                                    </TabIntroCompanyVue>
                                </div>
                            </q-tab-panel>

                            <q-tab-panel name="otherjob">
                                <div class="tab-panel-container">
                                    <TabOtherJobsVue :otherJobs="otherJobs"></TabOtherJobsVue>
                                </div>
                            </q-tab-panel>
                        </q-tab-panels>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DrawerVue from '../../layouts/Drawer.vue'
import TabOtherJobsVue from '../../components/Tabs/TabOtherJobs.vue'
import TabIntroCompanyVue from '../../components/Tabs/TabIntroCompany.vue'

import { getCompanyByName } from "../../apis/company"
import { getJobOfCompany } from "../../apis/job"

import { ref } from 'vue'

export default {
    components: {
        TabOtherJobsVue, TabIntroCompanyVue
    },
    data() {
        return {
            // loading: false,
            otherJobs: [],
            tab: ref('company'),
            companyData: {
                _id: "",
                info: {
                    benefits: [],
                    desc: "",
                    imageIntro: [],
                    location: [],
                    logo: "",
                    name: "",
                    phone: "",
                    size: "",
                    video: "",
                    workingArea: [],
                    bannerImage: ''
                }
            }
        }
    },
    created() {
        this.$emit("update:layout", DrawerVue)
        this.initCompany()
    },
    methods: {
        initCompany() {
            getCompanyByName(this.$route.params.companyName).then(data => {
                if (data) {
                    this.companyData = data
                } else {
                    this.$router.push(`/cong-ty`)
                }

            })
            getJobOfCompany({companyName: this.$route.params.companyName}).then(data=>{
                if(data){
                    // this.otherJobs  = data
                    this.otherJobs = data.filter(job=> new Date(job.info.outdate) >= new Date(Date.now()))
                }
            })
        }
    }

}
</script>
<style lang="scss">
.margin-negative-50 {
    margin-top: -50%;
}
.hover:hover {
    transition: all 200ms;
    color: $warning;
    text-decoration: underline;
}
</style>