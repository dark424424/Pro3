<template >
    <div class="text-weight-bold text-h6 q-mb-lg ">
        Việc làm bạn sẽ thích
    </div>
    <div v-if="!loading" class="q-gutter-sm">
        <CardJobDetail v-for="(job, index) in listJob" :key="'recommend-' + index" :jobDetail="job" :isMinimize="true"
            :isHot="false"></CardJobDetail>
    </div>
    <div v-else>
        <q-card v-for="(item, index) in Array(10)" :key="index" class="q-pa-sm">
            <div class="row">
                <q-skeleton type="rect" width="80px" height="80px"></q-skeleton>
                <div class="q-mx-sm">
                    <q-skeleton type="text" height="24px" width="200px"></q-skeleton>
                    <!-- <q-skeleton type="text" height="24px" width="150px"></q-skeleton> -->
                    <q-skeleton type="text" height="24px" width="150px"></q-skeleton>
                </div>
            </div>

        </q-card>
    </div>



</template>






<script>
import CardJobDetail from '@/components/CardJobDetail.vue'
import { searchJob } from "@/apis/search"
import { useUserStore } from "@/stores/userStore"

export default {
    components: {
        CardJobDetail
    },
    data() {
        return {
            listJob: [],
            userStore: useUserStore(),
            loading: true,
        }
    },
    methods: {
        getRecommendJobs() {
            this.loading = true;
            if (this.userStore.getUserState._id) {
                let positionPresent = this.userStore.getUserState.info.positionPresent + " ";
                let levelPresent = this.userStore.getUserState.info.levelPresent + " ";
                let typeWorking = "";
                this.userStore.getUserState.info.typeWorking.forEach(type => {
                    typeWorking += (type.field + " " + type.name + " ");
                })

                let skills = "";
                this.userStore.getUserState.info.skills.forEach((skill) => {
                    skills += (skill + " ")
                })

                let experiences = "";
                this.userStore.getUserState.info.experiences.forEach((experience) => {
                    experiences += (experience.position + " ")
                })

                let text = positionPresent + skills + levelPresent + typeWorking + experiences
                // console.log(text)
                searchJob({ text, filter: {}, pageNumber: 0, limit: 10 }).then(data => {
                    if (data) {
                        this.listJob = data.data;
                        this.loading = false;
                    }
                })
            }
        }
    },
    watch: {
        "userStore.getUserState._id"(newValue, oldValue) {
            // console.log(this.userStore.getUserState._id)
            this.getRecommendJobs()
        }
    },
    created() {
        this.getRecommendJobs()
    }
}
</script>
<style lang="scss">

</style>