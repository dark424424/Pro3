<template >
    <div class="q-mx-lg q-my-sm row q-gutter-lg justify-between">
        <div class="col-7">
            <div class='q-mb-xl'>
                <div v-if="jobDetail.info.benefits.length > 0">
                    <div class="text-h5 q-mb-xs">Các phúc lợi dành cho bạn</div>
                    <div class="q-mb-xs" v-for="(item, index) in jobDetail.info.benefits" :key="'benefits' + index">
                        <q-icon :name="item.svg" color="black" size="24px" class="q-mr-sm" />
                        <span class="text-weight-medium cursor-pointer">
                            {{ item.label }}
                            <q-tooltip :delay="100" anchor="center end" self="center left">
                            {{ item.desc }}
                        </q-tooltip>
                        </span>
                    </div>
                </div>
            </div>
            <div class='q-mb-xl'>
                <div class="text-h5 q-mb-xs">Mô tả công việc</div>
                <div>
                    <span class="text-justify" v-html="jobDetail.info.desc"></span>
                </div>

            </div>
            <div class='q-mb-xl'>
                <div class="text-h5 q-mb-xs">Yêu cầu công việc</div>
                <div>
                    <span class="text-justify" v-html=" jobDetail.info.requirement"></span>
                </div>

            </div>
            <div class='q-mb-xl'>
                <div class="text-h5 q-mb-xs">Nơi làm việc</div>
                <div v-for="(location, index) in jobDetail.info.workingAddress" :key="'working-address-' + index">
                    <q-icon name="place" color="black" size="24px" class="q-mr-sm" />
                    <span>{{ location.address + ", " }}</span>
                    <span>{{ location.ward + ", " }} </span>
                    <span>{{ location.district + ", " }}</span>
                    <span>{{ location.province }}</span>
                </div>

            </div>
            <div class="q-mb-xl" v-if="jobDetail.info.recruitmentProcess.length > 0">
                <div class="text-h5 q-mb-xs">Quy trình phỏng vấn</div>
                <div v-for="(item, indexJDre) in jobDetail.info.recruitmentProcess" :key="indexJDre+'jd-re'">
                    <span>{{indexJDre + 1  + ". "}}</span>
                    <span>
                        {{ item.name }}
                    </span>
                </div>
            </div>
            <div class='q-mb-xl'>
                <div class="text-h6 q-mb-xs">Từ khóa</div>
                <div class="row">
                    <q-chip :label="companyData.info.name" class='text-caption' outline square dense color="red"
                        text-color="white">
                    </q-chip>
                    <q-chip v-for="(item, index) in jobDetail.info.keyword" :key="'keyword-tag-' + index" :label="item"
                        class='text-caption' outline square dense color="red" text-color="white">
                    </q-chip>
                    <q-chip v-for="(item, index) in jobDetail.info.type" :key="'keyword-tag-' + index"
                        :label="item.name" class='text-caption' outline square dense color="red" text-color="white">
                    </q-chip>
                </div>
            </div>
        </div>
        <div class="col-4 ">
            <div class="info-detail-card col q-pa-md  rounded-borders	">
                <div class="row no-wrap q-my-sm">
                    <q-icon name="calendar_today" color="" size="24px" class="q-mr-sm" />
                    <div>
                        <div>
                            <span class="info-detail-card-title">Ngày tạo</span>
                        </div>
                        <div>
                            <span> {{ $moment((jobDetail.createdAt)).format("DD-MM-YYYY") }}</span>
                        </div>
                    </div>
                </div>
                <q-separator />
                <div class="row no-wrap q-my-sm">
                    <q-icon name="work" color="" size="24px" class="q-mr-sm" />
                    <div>
                        <div>
                            <span class="info-detail-card-title">Cấp bậc</span>
                        </div>
                        <div>
                            <span> {{ jobDetail.info.level.name }}</span>
                        </div>
                    </div>
                </div>
                <q-separator />
                <div class="row no-wrap q-my-sm">
                    <q-icon name="category" color="" size="24px" class="q-mr-sm" />
                    <div>
                        <div>
                            <span class="info-detail-card-title">Phân loại</span>
                        </div>
                        <div>
                            <span v-for="(item, index) in jobDetail.info.type" :key="'type-' + index">
                                {{ item.name }}<span v-if="index < jobDetail.info.type.length - 1">{{ ", " }}</span>
                            </span>
                        </div>
                    </div>

                </div>
                <q-separator />
                <div class="row no-wrap q-my-sm">
                    <q-icon name="manage_accounts" color="" size="24px" class="q-mr-sm" />
                    <div>
                        <div>
                            <span class="info-detail-card-title">Kỹ năng</span>
                        </div>
                        <div>
                            <span v-for="(item, index) in jobDetail.info.keyword" :key="'key-' + index">
                                {{ item }}<span v-if="index < jobDetail.info.keyword.length - 1">{{ ", " }}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <q-separator />
                <div class="row no-wrap q-my-sm">
                    <q-icon name="language" color="" size="24px" class="q-mr-sm" />
                    <div>
                        <div>
                            <span class="info-detail-card-title">Ngôn ngữ sử dụng</span>
                        </div>
                        <div>
                            <span v-for="(item, index) in jobDetail.info.languageRecruitment" :key="'lang-' + index">
                                {{ item }}<span v-if="index < jobDetail.info.languageRecruitment.length - 1">{{ ", "
                                }}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <q-separator />
            </div>
            <div class="col map q-mt-xl">
                <GMapMap v-for="(workingAdd, index) in jobDetail.info.workingAddress" :key="'map-'+index" :center="{ lat: workingAdd.latitude, lng: workingAdd.longitude }" :zoom="100" map-type-id="terrain"
                    style="width: 100%; height: 400px">
                    <GMapMarker :position="{lat: workingAdd.latitude, lng: workingAdd.longitude}"  />
                </GMapMap>
            </div>
        </div>


    </div>
</template>
<script>
export default {
    props: {
        jobDetail: Object,
        companyData: Object,
        loading: Boolean
    },
    data() {

        return {
           
        }
    }
}
</script>
<style lang="">
    
</style>