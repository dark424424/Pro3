<template >
    <div>
        <div class="q-mb-md  row justify-between">
            <div>

                <span>
                    Tổng
                </span>
                <strong>
                    {{ jobSaved.length }}
                </strong>
                <span>
                    việc
                </span>
            </div>
            <div>
                
                <q-pagination v-if="(jobSaved.length/showPerPage) > 1" v-model="pageNumber" :max="jobSaved.length/showPerPage  +1" :max-pages="6"
                    boundary-numbers outline color="negative" active-design="unelevated" active-color="negative"
                    active-text-color="white" />
            </div>
        </div>
        <div v-for="(application, index) in jobSaved" :key="'job-apply-' + index">
            <div v-if="index/showPerPage < pageNumber && pageNumber - 1 <= index/showPerPage">
                <div class="row q-gutter-md">
                    <div class="col-2">
                        <q-img :src="application.companyId.info.logo"></q-img>
                    </div>
                    <div class="col-7">
                        <div>
                            <router-link :to="'/viec-lam/' + application.info.name + '---' + application.companyId._id">
                                <span class="text-weight-bold cursor-pointer">{{ application.info.name }}</span>
                            </router-link>
                        </div>
                        <div>
                            <span class="text-grey-6 ">{{ application.companyId.info.name }}</span>
                        </div>
                        <div class="text-grey-6">
                            <span v-for="(location, indexLocation) in application.info.workingAddress"
                                :key="index + '-' + location.province + '-' + indexLocation">
                                {{ indexLocation < application.info.workingAddress.length - 1 ? location.province + ', '
                                        : location.province
                                }} </span>
                        </div>
                        <div class="text-warning">
                            <div v-if="application.info.salaryRate.isVisible">
                                <span>
                                    {{ application.info.salaryRate.from + "$" + " - " + application.info.salaryRate.to +
                                            "$"
                                    }}
                                </span>
                            </div>
                            <div v-else>
                                <span>
                                    Thương lượng
                                </span>
                            </div>
                        </div>
                        <div class="text-grey-6">
                            <span v-if="$moment(application.info.outdate).diff($moment(), 'days') > 0">
                                Còn {{ $moment(application.info.outdate).diff($moment(), 'days') + " ngày ứng tuyển" }}
                            </span>
                            <span v-else>
                                 Đã hết hạn tuyển
                            </span>
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
import { ref } from "vue"

export default {
    props: { jobSaved: Array, showPerPage: Number },
    data() {
     
        return {
            
            pageNumber: ref(1),
        }
    }

}
</script>
<style lang="">
    
</style>