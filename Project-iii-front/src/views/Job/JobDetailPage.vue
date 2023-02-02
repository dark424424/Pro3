<template >
    <div class=" bg-grey-1">
        <div>
            <CarouselBanner :key="keyUpdateUI" :arrayImage="companyData.info.imageIntro"></CarouselBanner>
        </div>
        <div class=" p-container">
            <CardJobInfoVue :key="keyUpdateUI" :loading="loading" :jobDetail="jobDetail" :companyData="companyData">
            </CardJobInfoVue>
            <TabJobInfoVue :key="keyUpdateUI" :loading="loading" :jobDetail="jobDetail" :companyData="companyData">
            </TabJobInfoVue>
            <div v-if="(similarJob.length>0)">

                <div class="text-h5 q-mt-xl">Công việc tương tự</div>
                <div class="row">
                    <div class="q-my-xs row q-gutter-xs col-10">
                        <div v-for="(job, index) in similarJob" :key="'similar-job-' + index">
                            <CardJobDetailVue :isMinimize="true" :isHot="false" :jobDetail="job"></CardJobDetailVue>
                        </div>
                    </div>

                    <div class="q-my-xs col-2">
                        
                        <q-img
                            src="https://marketplace.canva.com/EAE8gd5ikZM/1/0/960w/canva-t%C3%ADm-nh%E1%BA%A1t-v%C3%A0-tr%E1%BA%AFng-th%E1%BB%9Di-trang-bi%E1%BB%83u-ng%E1%BB%AF-d%E1%BB%8Dc-quay-l%E1%BA%A1i-l%C3%A0m-vi%E1%BB%87c-3BtVdlXMH_M.jpg"></q-img>
                    </div>



                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { getJobByNameAndCompanyId, updateViewNumber } from "@/apis/job"
import { searchJob } from "@/apis/search"
import CarouselBanner from "@/components/CarouselBanner.vue"
import CardJobInfoVue from '@/components/JobDetail/CardJobInfo.vue'
import TabJobInfoVue from '@/components/JobDetail/TabJobInfo.vue'
import DrawerVue from "@/layouts/Drawer.vue"
import CardJobDetailVue from "@/components/CardJobDetail.vue"
import { useUserStore } from '../../stores/userStore'

export default {
    components: {
        CarouselBanner, CardJobInfoVue, TabJobInfoVue, CardJobDetailVue
    },
    data() {
        let companyData = {
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
        let jobDetail = {
            info: {
                desc: "",
                benefits: [],
                emailReceive: [],
                keyword: [],
                languageRecruitment: [],
                level: {
                    name: "",

                },
                name: "",
                outDate: "",
                requirement: '',
                salaryRate: {
                    isVisible: false,
                    from: 0,
                    to: 0,
                },
                type: [],
                workingAddress: [],

            },
            createdAt: "",
            updatedAt: "",
            viewed: 0,
            _id: "",
        }
        return { userStore: useUserStore(),companyData, jobDetail, keyUpdateUI: 0, loading: true, othersJob: [], similarJob: [] }
    },
    created() {
        this.$emit("update:layout", DrawerVue)
        this._getJobDetail({ jobName_companyId: this.$route.params.jobName_companyId })
        if(this.userStore.getUserState._id){
            updateViewNumber()
        }

    },
    watch: {
        "$route.params.jobName_companyId"(newValue, oldValue) {
            if(newValue && newValue !== oldValue  && this.$route.name =="Job detail"){
                this._getJobDetail({ jobName_companyId: newValue })
            }

        }
    },
    methods: {
        _getJobDetail({ jobName_companyId }) {
            // console.log(jobName_companyId)
            getJobByNameAndCompanyId({ jobName_companyId }).then(data => {
                if(data){
                    this.jobDetail.info = data.info;
                this.jobDetail.updatedAt = data.updatedAt;
                this.jobDetail.createdAt = data.createdAt;
                this.jobDetail.viewed = data.viewed;
                this.jobDetail._id = data._id;
                this.companyData = data.companyId
                this.loading = false
                // this.arr = data.companyId.info.imageIntro.slice();
                this.keyUpdateUI++;
                let text = data.info.name;
                data.info.keyword.forEach(keyword => {
                    text = text + " " + keyword
                })
                this._getRecommendJobs({ text });
                }
                else{
                    this.$router.push(`/viec-lam`)
                }


            })
        },
        _getRecommendJobs({ text }) {
            // let jobName_companyId = this.$route.params.jobName_companyId.split('---')
            searchJob({ text, filter: {}, limit: 6, pageNumber: 0 }).then(data => {
                this.similarJob = data.data
            })
        },

    },

}
</script>
<style lang="scss">

</style>