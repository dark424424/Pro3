<template>
    <div v-if="loading">

    </div>
    <div v-else>
        <div class="q-my-lg">
            <q-card>
                <q-tabs v-model="tab" dense class="text-grey" active-color="negative" indicator-color="negative"
                    align="left" narrow-indicator>
                    <q-tab class="q-mt-xs" name="info" label="Thông tin" />
                    <q-tab class="q-mt-xs" name="company" label="Công ty" />
                    <q-tab class="q-mt-xs" name="otherjob" label="Việc làm khác từ công ty" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="info" class="tab-panel-container">
                        <TabDetailJobVue :loading="loading" :jobDetail="jobDetail" :companyData="companyData">
                        </TabDetailJobVue>
                    </q-tab-panel>

                    <q-tab-panel name="company">
                        <div class="tab-panel-container">
                            <TabIntroCompanyVue :loading="loading" :jobDetail="jobDetail" :companyData="companyData">
                            </TabIntroCompanyVue>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="otherjob">
                        <div class="tab-panel-container">
                            <TabOtherJobsVue :otherJobs="otherJobs" :loading="loading"></TabOtherJobsVue>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </div>
    </div>

</template>
<script>
import { ref } from 'vue'
import TabDetailJobVue from '@/components/Tabs/TabDetailJob.vue'
import TabIntroCompanyVue from '@/components/Tabs/TabIntroCompany.vue'
import TabOtherJobsVue from '@/components/Tabs/TabOtherJobs.vue'
import {getOtherJobOfCompany} from "@/apis/job"

export default {
    components: {
        TabDetailJobVue, TabIntroCompanyVue, TabOtherJobsVue
    },
    props: {
        jobDetail: Object,
        companyData: Object,
        loading: Boolean,
      
    },
    data() {
        return {
            tab: ref('info'), 
            otherJobs: [],
        }
    },
    created(){
        this._getOtherJobs({jobName_companyId: this.$route.params.jobName_companyId })
    },
    methods:{
        _getOtherJobs({ jobName_companyId }) {
            getOtherJobOfCompany({ jobName_companyId }).then(data => {
                this.otherJobs = data.filter(job=> new Date(job.info.outdate) >= new Date(Date.now()))
                // console.log(this.otherJobs)
            })
        }
    }

}
</script>
<style lang="scss">
.info-detail-card {
    background-color: #fff0f0
}

.info-detail-card-title {
    color: #949697
}
</style>