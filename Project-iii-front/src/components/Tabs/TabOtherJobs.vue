<template >
    <div class="q-mx-lg q-mt-sm q-mb-lg col q-gutter-lg justify-between">
        <div v-if="(otherJobs.length>0) ">
            <div v-for="(job, index) in otherJobs" :key="'other-jobs-'+index" class="q-mb-sm card-other-jobs full-width	">
                <div>

                    <div class=" text-weight-bold text-subtitle1">
                        <router-link :to="('/viec-lam/'+job.info.name+'---'+job.companyId)">
                            <span class="other-job-name">{{job.info.name}}</span>
                    </router-link>
                </div>
                <div class="row q-mb-xs">
                    <div class="other-job-salary">
                        <span v-if ="job.info.salaryRate.isVisible">
                            {{job.info.salaryRate.from}}$ -  {{job.info.salaryRate.to}}$
                        </span>
                        <span v-else>$ Thương lượng</span>
                    </div>
                    <q-separator class="q-mx-sm" vertical></q-separator>
                    <div class="">
                        <span v-for="(location, index) in job.info.workingAddress" :key="'locations-'+index">{{location.province}}<span v-if="index<job.info.workingAddress.length-1">, </span></span>
                   </div>
                   <q-separator class="q-mx-sm" vertical></q-separator>
                   <div class="">
                       <span >{{"Còn " + ($moment(job.info.outdate).diff($moment(), 'days')+1) +" ngày" }}</span>
                   </div>
                </div>
                </div>
                <q-separator></q-separator>
            </div>
        </div>
        <div v-else>
            Hiện không có công việc nào khác
        </div>
    </div>
</template>
<script>
export default {
    props: {
        otherJobs: Array
    },
    data() {
    },
    // created(){
    //     this._getOtherJobs({jobName_companyId: this.$route.params.jobName_companyId })
    // },
    // methods:{
    //     _getOtherJobs({ jobName_companyId }) {
    //         getOtherJobOfCompany({ jobName_companyId }).then(data => {
    //             this.otherJobs = data;
    //             console.log(this.otherJobs)
    //         })
    //     }
    // }
}
</script>
<style lang="scss">
    .other-job-name:hover {
        color: #cfa24d;
        transition: 200ms all;
    }
    .other-job-salary{
        color: #cfa24d;
    }
</style>