<template>
    <div class=" q-gutter-md">
        <div class="text-weight-bold text-h6 ">
            Việc làm của tôi
        </div>
        <q-card>
            <q-tabs outside-arrows v-model="tabBig" dense class="text-grey" active-color="negative"
                indicator-color="negative" align="left" narrow-indicator>
                <q-tab class="q-mt-xs" name="all-jobApplied" label="Việc đã ứng tuyển" />
                <q-tab class="q-mt-xs" name="all-jobSaved" label="Việc đã lưu" />

                <q-separator />
            </q-tabs>
            <q-tab-panels v-model="tabBig" animated>
                <q-tab-panel name="all-jobApplied" class="tab-panel-container">

                    <q-tabs outside-arrows v-model="tab" dense class="text-grey text-small" active-color="negative"
                        indicator-color="negative" align="left" narrow-indicator>
                        <q-tab class="q-mt-xs " name="job-apply" label="Ứng tuyển" />
                        <q-tab class="q-mt-xs" name="job-invite" label="Lời mời phỏng vấn" />
                        <q-tab class="q-mt-xs" name="job-pending" label="Đang chờ" />
                        <q-tab class="q-mt-xs" name="job-in-process" label="Chấp thuận phỏng vấn" />
                        <q-tab class="q-mt-xs" name="job-offer" label="Lời mời làm việc" />
                        <q-tab class="q-mt-xs" name="job-working" label="Đang làm việc" />
                        <q-tab class="q-mt-xs" name="job-reject" label="Từ chối" />

                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="job-apply" class="tab-panel-container">
                            <LoadingCard v-if="jobApplyLoading"></LoadingCard>
                            <JobApply v-else v-model:applicationList="applicationList" :showPerPage="showPerPage">
                            </JobApply>
                        </q-tab-panel>

                        <q-tab-panel name="job-invite">
                            <div class="tab-panel-container">
                                <LoadingCard v-if="jobApplyLoading"></LoadingCard>
                                <JobInvite v-else v-model:applicationList="applicationList" :showPerPage="showPerPage">
                                </JobInvite>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="job-pending">
                            <div class="tab-panel-container">
                                <LoadingCard v-if="jobApplyLoading"></LoadingCard>
                                <JobPending v-else v-model:applicationList="applicationList" :showPerPage="showPerPage">
                                </JobPending>
                            </div>
                        </q-tab-panel>

                        <q-tab-panel name="job-in-process">
                            <div class="tab-panel-container">
                                <LoadingCard v-if="jobApplyLoading"></LoadingCard>
                                <JobInProcess v-else v-model:applicationList="applicationList"
                                    :showPerPage="showPerPage"></JobInProcess>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="job-offer">
                            <div class="tab-panel-container">
                                <LoadingCard v-if="jobApplyLoading"></LoadingCard>
                                <JobOffer v-else v-model:applicationList="applicationList" :showPerPage="showPerPage">
                                </JobOffer>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="job-working">
                            <div class="tab-panel-container">
                                <LoadingCard v-if="jobApplyLoading"></LoadingCard>
                                <JobWorking v-else v-model:applicationList="applicationList" :showPerPage="showPerPage">
                                </JobWorking>
                            </div>
                        </q-tab-panel>

                        <q-tab-panel name="job-reject">
                            <div class="tab-panel-container">
                                <LoadingCard v-if="jobApplyLoading"></LoadingCard>
                                <JobDenied v-else v-model:applicationList="applicationList" :showPerPage="showPerPage">
                                </JobDenied>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </q-tab-panel>
                <q-tab-panel name="all-jobSaved">
                    <div class="tab-panel-container">
                        <LoadingCard v-if="jobSavedLoading"></LoadingCard>
                        <JobSaved v-else v-model:jobSaved="jobSaved" :showPerPage="showPerPage"></JobSaved>
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </div>

</template>

<script>
import { useUserStore } from '@/stores/userStore';
import JobApply from '@/components/AccountJob/JobApply.vue';
import JobInvite from '@/components/AccountJob/JobInvite.vue';
import JobInProcess from '@/components/AccountJob/JobInProcess.vue';
import JobPending from '@/components/AccountJob/JobPending.vue';
import JobOffer from '@/components/AccountJob/JobOffer.vue';
import JobWorking from '@/components/AccountJob/JobWorking.vue';
import JobDenied from '@/components/AccountJob/JobDenied.vue';

import { getAllApplicationIn_User } from '@/apis/application';
import { getUserFavorite } from '@/apis/job';
import JobSaved from './JobSaved.vue';
import LoadingCard from './LoadingCard.vue';


export default {
    components: {
        JobApply,
        JobInvite,
        JobInProcess,
        JobPending,
        JobOffer,
        JobDenied,
        JobWorking,
        JobSaved,
        LoadingCard,
    },

    data() {
        return {
            tabBig: "all-jobApplied",
            tab: 'job-apply',
            applicationList: [],
            jobSaved: [],
            userStore: useUserStore(),
            showPerPage: 6,
            jobApplyLoading: true,
            jobSavedLoading: true,

        }
    },
    // watch: {
    //     "userStore.getUserState._id"(newValue, oldValue) {
    //         if (newValue) {
    //             this.init()
    //         }
    //     },
    // },
    created() {
        this.init()
    },
    methods: {

        init() {
            this.jobApplyLoading = true
            this.jobSavedLoading = true
            getAllApplicationIn_User().then(data => {
                if (data) {
                    this.applicationList = data.map(ele => {
                        ele.isLoading = false;
                        ele.isShowDesc = false;
                        return (ele)
                    })
                }
                this.jobApplyLoading = false;
            })
            getUserFavorite().then(data => {
                if (data) {
                    console.log(data)
                    this.jobSaved = data
                }
                this.jobSavedLoading = false
            })
        },

    }
}
</script>
<style lang="scss">
.text-small .q-tab__label {
    font-size: 0.8em;
}
</style>