<template >
    <div v-if="loading">
        <div class="card-container ">
            <q-card class="my-card row  items-center q-px-sm">
                <q-card-section class="col-2">
                    <div>
                        <q-skeleton type="rect" size="140px" />
                    </div>
                </q-card-section>
                <q-card-section class='col-7 col'>
                    <div class="text-h5 text-weight-medium"> <q-skeleton type="text" /></div>
                    <div>
                        <!-- <router-link  cursor-pointer :to="'/cong-ty/'+companyData.info.name"> -->
                        <span class="jd-company-name">
                            <q-skeleton type="text" />
                        </span>
                        <!-- </router-link> -->
                    </div>
                    <div>
                        <q-skeleton type="text" />
                    </div>
                    <div class="jd-salary">
                        <q-skeleton type="text" />
                    </div>
                    <div class="jd-gray-color">
                        <q-skeleton type="text" />
                    </div>
                </q-card-section>
                <q-card-section class='col-3'>
                    <div class='row q-gutter-x-xs  justify-end'>
                        <q-skeleton type="QBtn" />
                        <q-skeleton type="QBtn" />

                    </div>

                </q-card-section>
            </q-card>
        </div>
    </div>
    <div v-else>
        <div class="card-container ">
            <q-card class="my-card row  items-center q-px-sm">
                <q-card-section class="col-2">
                    <div class="jd-img">

                        <q-img fit="contain" :src="companyData.info.logo" loading="lazy" :ratio="1" />
                    </div>
                </q-card-section>
                <q-card-section class='col-7 col'>
                    <div class="text-h5 text-weight-medium">{{ jobDetail.info.name }}</div>
                    <div>
                        <router-link cursor-pointer :to="'/cong-ty/' + companyData.info.name">
                            <span class="jd-company-name">
                                {{ companyData.info.name }}
                            </span>
                        </router-link>
                    </div>
                    <div>
                        Địa điểm làm việc:
                        <span v-for="(location, index) in jobDetail.info.workingAddress" :key="'locations-' + index">{{
                                location.province
                        }}<span v-if="index < jobDetail.info.workingAddress.length - 1">,
                            </span></span>
                    </div>
                    <div class="jd-salary">
                        <span v-if="jobDetail.info.salaryRate.isVisible">
                            {{ jobDetail.info.salaryRate.from }}$ - {{ jobDetail.info.salaryRate.to }}$
                        </span>
                        <span v-else>$ Thương lượng</span>
                    </div>
                    <div class="jd-gray-color">
                        <span>{{ jobDetail.viewed }} lượt xem - </span>
                        <span v-if="!hasOutdate">hết hạn trong {{
                                $moment(jobDetail.info.outdate).diff($moment(), 'days') + 1
                        }} ngày
                        </span>
                        <span v-else>Đã hết hạn</span>
                    </div>
                </q-card-section>
                <q-card-section class='col-3'>
                    <div class='row q-gutter-x-xs  justify-end'>
                        <q-btn v-if="!hadFollowedJob" @click="toggleFavouriteJobs" unelevated outline color="black"
                            size="md" icon="favorite_border" />
                        <q-btn v-else @click="toggleFavouriteJobs" unelevated color="negative" size="md"
                            icon="favorite" />
                        <q-btn @click="applyJob" :loading="loadingButton" :disable="hasApplied || hasOutdate" unelevated
                            color="negative" padding="xs lg" size="md" label="Nộp đơn" />

                    </div>
                    <div v-if="hasApplied || hasOutdate" class="text-negative row justify-end">
                        <span>
                            {{ message }}
                        </span>
                    </div>

                </q-card-section>
            </q-card>
        </div>
    </div>

</template>
<script>
import { doFollowJob } from '@/apis/user';
import { apply, getByUserWithJob } from '@/apis/application';

import { useUserStore } from '@/stores/userStore';
export default {
    props: {
        jobDetail: Object,
        companyData: Object,
        loading: Boolean
    },
    data() {

        return {
            hadFollowedJob: false,
            userStore: useUserStore(),
            hasApplied: false,
            hasOutdate: false,
            loadingButton: false,
            message: "",
        }
    },
    created() {
        if (new Date(this.jobDetail.info.outdate) < new Date(Date.now())) {
            // this.hasApplied = true;
            this.hasOutdate = true;
            // this.message = "Đã hết hạn"
        }
        if(this.userStore.getUserState._id){
            getByUserWithJob({jobId: this.jobDetail._id }).then(data=>{
                if(data){
                    this.hasApplied = true;
                    this.message = "Bạn đã nộp hồ sơ"
                }else{

                }
            })
        }
        // console.log(this.userStore.getUserState._id)
        // console.log(this.jobDetail._id);
        if (this.userStore.getUserState.activity.jobSaved.find(item => this.jobDetail._id === item)) {
            this.hadFollowedJob = true
        }
    },
    methods: {
        applyJob() {
            if (!this.checkUserLoggedIn()) {
                // console.log("Nhảy login")
                this.$router.push('/dang-nhap')
            } else {
                this.loadingButton = true
                this.hasApplied = true;
                apply({ jobName: this.jobDetail.info.name, companyId: this.companyData._id }).then(data => {
                    if (data) {
                        data.jobId = this.jobDetail
                        this.hasApplied = true;
                        this.message = "Bạn đã nộp hồ sơ"

                    } else {
                        this.hasApplied = false;
                        this.message = "Hãy thử lại"
                    }
                    this.loadingButton = false;
                })
            }

        },
        toggleFavouriteJobs() {
            if (!this.checkUserLoggedIn()) {
                this.$router.push('/dang-nhap')
            } else {
                this.hadFollowedJob = !this.hadFollowedJob
                doFollowJob({ jobName_companyId: this.$route.params.jobName_companyId }).then(data => {
                    // console.log(data)
                    if (data.like.find(item => this.jobDetail._id === item)) {
                        this.hadFollowedJob = true
                    } else {
                        this.hadFollowedJob = false
                    }
                })
            }

        },
        checkUserLoggedIn() {
            if (this.userStore.getUserState._id) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>
<style lang="scss">
.card-container {
    width: 100%;
    // background: red;
    margin-top: -140px;
}

.jd-company-name {
    color: #C10015;
    transition: all 200ms;
    font-weight: 700;
}

.jd-company-name:hover {
    color: #cfa24d
}

.jd-salary {
    color: #cfa24d;
}

.jd-gray-color {
    color: #a4a4a4
}
</style>