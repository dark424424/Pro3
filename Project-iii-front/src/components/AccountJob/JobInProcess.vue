<template >
    <div>
        <div v-for="(application, index) in applicationList" :key="'job-apply-' + index">
            <div v-if="application.status.value == interviewValue">
                <div class="row q-gutter-md">
                    <div class="col-2">
                        <q-img :src="application.companyId.info.logo"></q-img>
                    </div>
                    <div class="col-7">
                        <div>
                            <router-link
                                :to="'/viec-lam/' + application.jobId.info.name + '---' + application.companyId._id">
                                <span class="text-weight-bold cursor-pointer">{{ application.jobId.info.name }}</span>
                            </router-link>
                        </div>
                        <div>
                            <span class="text-grey-6 ">{{ application.companyId.info.name }}</span>
                        </div>
                        <div class="text-grey-6">
                            <span v-for="(location, indexLocation) in application.jobId.info.workingAddress"
                                :key="index + '-' + location.province + '-' + indexLocation">
                                {{ indexLocation < application.jobId.info.workingAddress.length - 1 ? location.province + ', '
                                        : location.province
                                }} </span>
                        </div>
                        <div class="text-warning">
                            <div v-if="application.jobId.info.salaryRate.isVisible">
                                <span>
                                    {{ application.jobId.info.salaryRate.from }}
                                </span>
                                <span>
                                    $
                                </span>
                                <span>{{ " - " }}</span>
                                <span>
                                    {{ application.jobId.info.salaryRate.to }}

                                </span>
                                <span>
                                    $
                                </span>
                            </div>
                            <div v-else>
                                <span>
                                    Th????ng l?????ng
                                </span>
                            </div>
                        </div>
                        <div class="text-grey-6">
                            <span>
                                ???? t???o {{ " " }}
                            </span>
                            <span v-if="$moment().diff($moment(application.createdAt), 'days') > 0">
                                {{ $moment().diff($moment(application.createdAt), 'days') + "ng??y tr?????c" }}
                            </span>
                            <span v-else>
                                trong h??m nay
                            </span>
                        </div>
                        <div class="text-negative" v-if="application.jobId.info.recruitmentProcess.length > 0">
                            <i>??ang ti???n h??nh: {{ interviewValue + "." + (application.status.note.value + 1) + ' '+application.status.note.name}}</i>
                        </div>
                        <div class="text-negative" v-else>
                            <i>??ang ti???n h??nh: {{ interviewValue + ". Ph???ng v???n(li??n h??? ????? h???i k?? h??n v??? quy tr??nh)" }}</i>
                        </div>
                    </div>
                    <div class="col-2">

                    </div>
                </div>
                <q-separator class="q-my-md"></q-separator>
            </div>
        </div>
    </div>
</template>
<script>
import { applicationDictionary } from "../../assets/dictionary/application"


export default {
    props: { applicationList: Array },
    data() {
        return {
            interviewValue: applicationDictionary.status.interview.value

        }
    },

}
</script>
<style lang="">
    
</style>