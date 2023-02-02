<template >
    <div class="q-mx-lg q-my-sm row q-gutter-lg justify-between">
        <div v-if="companyData" class="text-h5 q-mb-xs">Về chúng tôi</div>
        <div class="row q-mb-xs ">
            <div class="col-6 q-gutter-xs">
                <div v-if="companyData.info.workingArea.length" class="row">
                    <div class="col-3 text-bold">
                        <span>Ngành nghề </span>
                    </div>
                    <div class="col-9">

                        <span v-for="(item, index) in companyData.info.workingArea" :key="'type-' + index">
                            {{ item.name }}<span v-if="index < companyData.info.workingArea.length - 1">{{ ", "
                            }}</span>
                        </span>
                    </div>
                </div>
                <div v-else>
                    Công ty chưa cập nhật ngành nghề
                </div>
                <div class="row" v-if="companyData.info.size.label">
                    <div class="col-3 text-bold">
                        <span>Quy mô </span>
                    </div>
                    <div class="col-9">

                        <span>{{ companyData.info.size.label + " nhân viên" }}</span>
                    </div>

                </div>

                <div class="row" v-for="(location, index) in companyData.info.location"
                    :key="'working-location-' + index">
                    <div class="col-3 text-bold">


                        <span v-if="location.isHeadquarter">Trụ sở chính </span>
                        <span v-else>Chi nhánh </span>
                    </div>
                    <div class="col-9">

                        <span>{{ location.address + ", " }}</span>
                        <span>{{ location.ward + ", " }} </span>
                        <span>{{ location.district + ", " }}</span>
                        <span>{{ location.province }}</span>
                    </div>
                </div>
                <div class="q-mt-md">
                    <div class="text-bold q-mb-xs"><span>Mô tả</span></div>
                    <q-slide-transition>
                        <div v-if="companyData.info.desc.length > 700">
                            <span v-show="!isShowMoreDesc" class="text-justify">{{ companyData.info.desc.slice(0, 700)
                                    + '...'
                            }}</span>
                            <span v-show="isShowMoreDesc" class="text-justify">{{ companyData.info.desc }}</span>
                        </div>
                        <div v-else>
                            <span class="text-justify">{{ companyData.info.desc }}</span>
                        </div>
                    </q-slide-transition>
                    <div v-if="companyData.info.desc.length > 700" class="fit ">
                        <div v-if="companyData.info.desc.length > 700" class="text-center text-bold">
                            <q-icon v-show="!isShowMoreDesc" color="grey-6" class="cursor-pointer"
                                @click="() => isShowMoreDesc = !isShowMoreDesc" name="expand_more" size="36px"></q-icon>
                            <q-icon v-show="isShowMoreDesc" color="grey-6" class="cursor-pointer"
                                @click="() => isShowMoreDesc = !isShowMoreDesc" name="expand_less" size="36px"></q-icon>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 q-pl-lg">
                <q-carousel animated v-model="slide" navigation infinite :autoplay="autoplay" arrows
                    transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
                    @mouseleave="autoplay = true">
                    <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                        <q-btn v-if="active" size="xs" icon="circle" color="negative" unelevated flat dense
                            @click="onClick" />
                        <q-btn v-else size="xs" :icon="btnProps.icon" color="accent" unelevated flat dense
                            @click="onClick" />
                    </template>
                    <q-carousel-slide v-for="(item, index) in companyData.info.imageIntro"
                        :key="item + 'image-intro-' + index" :name="index" :img-src="item" />
                </q-carousel>
            </div>
        </div>
        <div class="fit q-mb-md" v-if="companyData.info.video">
            <div class="text-h5 q-mb-xs">Video giới thiệu</div>

            <div>
                <q-video :ratio="16 / 9" src="https://www.youtube.com/embed/7tz4Ya6gzG4" />
            </div>
        </div>

        <div v-if="companyData.info.benefits.length > 0" class="text-h5  fit row justify-between">
            <div>
                <span>Phúc lợi của công ty</span>
            </div>

        </div>


        <div v-if="companyData.info.benefits.length > 0" class="benefits row fit ">
            <q-card class="col-4 q-pa-xs row" flat v-for="(benefit, index) in companyData.info.benefits"
                :key="'benefit-' + index">
                <q-slide-transition>

                    <div class="q-pa-md col justify-center items-center responsive"
                        v-show="index < 6 || (index >= 6 && isShowMoreBenefits)"
                        :class="'bg-' + colorPallateForBenefits[index % colorPallateForBenefits.length]">
                        <div class="text-center col q-gutter-md">
                            <div>
                                <q-icon size="40px" :name="benefit.svg">
                                </q-icon>

                            </div>
                            <div class="text-bold">
                                <span>{{ benefit.label }}</span>
                            </div>
                            <div class="q-mb-sm">
                                <q-scroll-area style="height: 100px; max-height: 150px;">
                                    <div>
                                        <span>{{ benefit.desc }}</span>
                                    </div>
                                </q-scroll-area>

                                <!-- <span
                            style="max-height: 200px; display:inline-block; white-space:break-spaces; overflow: hidden; text-overflow: ellipsis; ">
                            {{ benefit.desc }}
                        </span> -->
                            </div>
                        </div>
                    </div>
                </q-slide-transition>
            </q-card>

        </div>

        <div v-if="companyData.info.benefits.length > 0" class="fit ">
            <div v-if="companyData.info.benefits.length > 6" class="text-center text-bold">
                <q-icon v-show="!isShowMoreBenefits" color="grey-6" class="cursor-pointer"
                    @click="() => isShowMoreBenefits = !isShowMoreBenefits" name="expand_more" size="36px"></q-icon>
                <q-icon v-show="isShowMoreBenefits" color="grey-6" class="cursor-pointer"
                    @click="() => isShowMoreBenefits = !isShowMoreBenefits" name="expand_less" size="36px"></q-icon>
            </div>
        </div>


    </div>
</template>
<script>
import { ref } from 'vue'


export default {
    props: {
        companyData: {
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

    },
    data() {
        return {
            isShowMoreBenefits: false,
            isShowMoreDesc: false,
            slide: ref(1),
            autoplay: ref(true),
            colorPallateForBenefits: [
                "pink-2",
                "deep-purple-2",
                "blue-2",
                "cyan-2",
                "lime-2",
                "amber-2",
                "deep-orange-2"
            ]
        }
    },


}
</script>
<style lang="scss">
.card-item {

    inline-size: 300px;
    overflow-wrap: break-word;
}
</style>