<template >
    <div>
        <div v-for="(application, index) in applicationList" :key="'job-apply-' + index">
            <div v-if="application.status.value == getHiredValue">
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
                                {{ indexLocation < application.jobId.info.workingAddress.length - 1 ? location.province
                                        + ', ' : location.province
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
                                <span>{{" - "}}</span>
                                <span>
                                    {{ application.jobId.info.salaryRate.to }}

                                </span>
                                <span>
                                    $
                                </span>
                            </div>
                            <div v-else>
                                <span>
                                    Thương lượng
                                </span>
                            </div>
                        </div>
                        <div class="text-grey-6">
                            <span>
                                Đã tạo {{ " " }}
                            </span>
                            <span v-if="$moment().diff($moment(application.createdAt), 'days') > 0">
                                {{ $moment().diff($moment(application.createdAt), 'days') + "ngày trước" }}
                            </span>
                            <span v-else>
                                trong hôm nay
                            </span>
                        </div>
                    </div>
                    <div class="col-2 col">
                        <div v-if="!application.candidateComment" class="col q-gutter-xs ">
                            <q-btn @click="popUpComment(index)" class="fit" color="negative" outline
                                label="Ý kiến"></q-btn>
                        </div>
                        <div v-if="application.candidateComment || application.companyComment" class="float-right">
                            <q-icon v-show="!application.isShowDesc" color="grey-6" class="cursor-pointer"
                                @click="toggleDesc(index)" name="expand_more" size="24px"></q-icon>
                            <q-icon v-show="application.isShowDesc" color="grey-6" class="cursor-pointer"
                                @click="toggleDesc(index)" name="expand_less" size="24px"></q-icon>
                        </div>
                    </div>
                </div>
               
                <div v-show="application.isShowDesc" class="row bg-grey-1 q-pa-md q-mt-sm">
                    <div v-if="application.candidateComment" class="col-6 q-pr-xs col" >
                        <div class=" q-gutter-xs row ">
                            <span > 
                                Ứng viên 
                            </span>
                            <q-rating v-model="application.candidateComment.rate" disable :max="5" size="16px" />
                            </div>
                            <div>
                               
                            </div>
                            <div class="text-grey-6">
                                <i>
                                    {{application.candidateComment.content}}
                                </i>
                            </div>
                    </div>
                   
                    <div v-if="application.companyComment" class="col-6 col">
                        <div class=" q-gutter-xs row ">
                            <span > 
                               Công ty
                            </span>
                            <q-rating v-model="application.companyComment.rate" disable :max="5" size="16px" />
                            </div>
                            <div>
                               
                            </div>
                            <div class="text-grey-6">
                                <i>
                                    {{application.companyComment.content}}
                                </i>
                            </div>
                    </div>
                </div>
                <q-separator class="q-my-md"></q-separator>
            </div>
        </div>
        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Hãy nêu ý kiến của bạn</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div>
                        <q-rating v-model="rating" :max="5" size="32px" />
                    </div>
                    <div  style="max-width: 400px; max-height: 600px">
                        <q-input maxlength="600" autogrow color="negative" dense v-model="comment" autofocus @keyup.enter="prompt = false" />
                    </div>
                </q-card-section>

                <q-card-actions align="right" class="text-negative">
                    <q-btn flat label="Đóng" v-close-popup />
                    <q-btn flat label="Thêm" v-close-popup @click="addComment" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import { userComment } from '../../apis/application'

import { applicationDictionary } from "../../assets/dictionary/application"
import { useQuasar } from "quasar"

export default {
    props: { applicationList: Array },
    data() {
        return {
            $q: useQuasar(),
            getHiredValue: applicationDictionary.status.getHired.value,
            indexComment: null,
            comment: null,
            rating: 1,
            prompt: false
        }
    },
    
    methods: {
        toggleDesc(index){
            this.applicationList[index].isShowDesc = !this.applicationList[index].isShowDesc
        },
        addComment() {
            if(this.comment){
                userComment({comment: {content: this.comment, rate: this.rating}, id: this.applicationList[this.indexComment]._id })
                .then(data=>{
                    if(data){
                        this.applicationList[this.indexComment].candidateComment = data
                        this.$q.notify({
                        message: 'Đăng ý kiến thành công',
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                    }else{
                        this.$q.notify({
                        message: 'Đăng ý kiến thất bại',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                    }
                    this.indexComment = null
                    this.comment = null
                    this.rating = 1
                })
            }else{
                this.$q.notify({
                        message: 'Vui lòng điền cảm nhận',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
            }
        },
        popUpComment(index) {
            this.prompt = true
            this.indexComment = index
            // console.log(this.applicationList[index])
        }
    }

}
</script>
<style lang="">
    
</style>