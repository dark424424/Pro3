<template >
    <div v-if="jobDetail">
        <div v-if="isMinimize" class="minimize-card ">
            <q-card class="my-card fit row no-wrap selected-card ">
                <div>
                    <router-link cursor-pointer :to="'/cong-ty/' + jobDetail.companyId.info.name">
                        <q-img fit="contain" class='col-1' loading="lazy" width='100px' ratio="1"
                            :src="jobDetail.companyId.info.logo" />
                    </router-link>
                </div>
                <q-card-section class="col-7">
                    <router-link :to="'/viec-lam/' + jobDetail.info.name + '---' + jobDetail.companyId._id">
                        <div class="color-negative text-weight-bold text-length2">
                            {{ jobDetail.info.name }}
                        </div>
                        <q-tooltip :delay="100" anchor="center right" self="center middle">
                            {{ jobDetail.info.name }}
                        </q-tooltip>
                    </router-link>
                    <router-link cursor-pointer :to="'/cong-ty/' + jobDetail.companyId.info.name">
                        <span class="hover text-caption text-length">{{ jobDetail.companyId.info.name }}</span>
                        <q-tooltip :delay="100" anchor="center middle" self="center end">
                            {{ jobDetail.companyId.info.name }}
                        </q-tooltip>
                    </router-link>
                </q-card-section>
                <q-card-section v-if="isHot">
                    <q-chip label="HOT" square dense color="red" class="col-2 text-caption" text-color="white">
                    </q-chip>
                </q-card-section>
            </q-card>
        </div>
        <div v-else class="big-card">

            <q-card class="my-card fit row no-wrap  ">
                <div>
                    <router-link cursor-pointer :to="'/cong-ty/' + jobDetail.companyId.info.name">
                        <q-img fit="contain" class='col-1' loading="lazy" width='150px' ratio="1"
                            :src="jobDetail.companyId.info.logo" />
                    </router-link>
                </div>
                <q-card-section class="col-7">
                    <router-link :to="'/viec-lam/' + jobDetail.info.name + '---' + jobDetail.companyId._id">
                        <div class="color-negative text-subtitle2 text-weight-bold">{{ jobDetail.info.name }}</div>
                        <q-tooltip :delay="100" anchor="center right" self="center middle">
                            {{ jobDetail.info.name }}
                        </q-tooltip>
                    </router-link>
                    <router-link cursor-pointer :to="'/cong-ty/' + jobDetail.companyId.info.name">
                        <span class="hover text-caption text-length">{{ jobDetail.companyId.info.name }}</span>
                        <q-tooltip :delay="100" anchor="center middle" self="center end">
                            {{ jobDetail.companyId.info.name }}
                        </q-tooltip>
                    </router-link>
                    <div>

                        <span class="text-caption gray-color" v-for="(item, index) in jobDetail.info.workingAddress"
                            :key="index">{{ item.province }}</span>
                    </div>
                    <div>
                        <span class="text-caption gray-color">Cập nhật: {{
                                $moment(jobDetail.updatedAt).format("DD-MM-YYYY")
                        }} - </span>
                        <span class="text-caption gray-color">Còn: <strong>{{
                                $moment(jobDetail.info.outdate).diff($moment(), 'days') + 1
                        }}</strong> ngày để ứng
                            tuyển</span>

                    </div>
                    <div>
                        <template v-for="(tag, index) in jobDetail.info.keyword">
                            <q-chip v-if="index <= 2" clickable @click="onClickTag" :label="tag" :key="index"
                                class='text-caption' outline square dense color="red" text-color="white">
                            </q-chip>
                        </template>
                        <q-chip class="text-caption" v-if="jobDetail.info.keyword.length > 2"
                            :label="'+' + (jobDetail.info.keyword.length - 3)" clickable outline square dense
                            color="red" text-color="white">
                            <q-tooltip :delay="0" anchor="center right" self="top end">
                                <template v-for="(tag, index) in jobDetail.info.keyword" :key="'tag-'+index">
                                    <div v-if="index > 2">
                                        {{ tag }}

                                    </div>
                                </template>
                            </q-tooltip>
                        </q-chip>
                    </div>
                    <div>
                        <template v-for="(tag, index) in jobDetail.info.type">
                            <q-chip v-if="index < 2" clickable @click="onClickTag" :label="tag.name" :key="index"
                                class='text-caption' outline square dense color="red" text-color="white">
                            </q-chip>
                        </template>
                        <q-chip class="text-caption" v-if="jobDetail.info.type.length >= 3"
                            :label="'+' + (jobDetail.info.type.length - 2)" clickable outline square dense color="red"
                            text-color="white">
                            <q-tooltip :delay="0" anchor="center right" self="top end">
                                <template v-for="(tag, index) in jobDetail.info.type" :key="'tag-' + index">
                                    <div v-if="index >= 2">
                                        {{ tag.name }}
                                    </div>
                                </template>
                            </q-tooltip>
                        </q-chip>
                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="col-2" style="width:100px">
                        <span class="color-salary" v-if="jobDetail.info.salaryRate.isVisible == true">${{
                                jobDetail.info.salaryRate.from + " - $" +
                                jobDetail.info.salaryRate.to
                        }}</span>
                        <span class="color-salary" v-else>Thương lượng</span>
                    </div>
                </q-card-section>

            </q-card>

        </div>
    </div>
</template>
<script>
import { JobDetailEx } from "@/example/jobDetailExample"
// import moment from 'moment'
export default {
    props: {
        isMinimize: Boolean,
        jobDetail: Object,
        isHot: Boolean
    },
    setup(props) {
        // console.log(props)
        return {
            isMinimize: props.isMinimize,
            jobDetail: props.jobDetail,
            isHot: props.isHot,
            onClickTag(evt) {
                //TO DO: redirect sang search skill đó
                console.log(evt.path[0].textContent)
            }
        }
    },

}
</script>


<style lang="scss" scoped>
.gray-color {
    color: gainsboro;
}

.minimize-card {
    width: 440px;
    height: 100px;
}


.big-card {
    // width: 620px;
}

;


.text-length {
    display: block;
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.text-length2 {
    display: block;
    width: 260px;
    height: 40px;
    overflow: hidden;
    white-space: break-spaces;
    text-overflow: ellipsis;
}

.color-salary {

    color: $warning;
    font-size: 12px;
    text-align: right;
}


// .color-negative {
//     color: red;
// }
.hover:hover {
  transition: 200ms all;
  color: $warning
}

.color-negative:hover {
    color: $negative;
    transition: ease-in-out 200ms;
}
</style>