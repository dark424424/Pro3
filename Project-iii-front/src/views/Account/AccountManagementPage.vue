<template>
    <div class="bg-grey-1">

        <div class="p-container q-mt-md ">
            <div class=" row q-gutter-lg">
                <div class="col-7">
                    <div class=" q-gutter-md">
                        <div class="text-weight-bold text-h6 ">
                            Tổng quan
                        </div>
                        <QuickIntroCardVue></QuickIntroCardVue>
                        <PersonnalInfoCardVue></PersonnalInfoCardVue>
                        <TargetDescriptionCardVue></TargetDescriptionCardVue>
                        <TypeWorkingCardVue></TypeWorkingCardVue>
                        <ExperiencesCardVue></ExperiencesCardVue>
                        <StudyCardVue></StudyCardVue>
                        <SkillCardVue></SkillCardVue>
                        <LanguageCardVue></LanguageCardVue>
                    </div>
                </div>
                <div class="col-4">
                    <RecommendJob />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ExperiencesCardVue from '@/components/AccountManagement/ExperiencesCard.vue';
import PersonnalInfoCardVue from '@/components/AccountManagement/PersonnalInfoCard.vue';
import QuickIntroCardVue from '@/components/AccountManagement/QuickIntroCard.vue';
import RecommendJob from '@/components/AccountManagement/RecommendJob.vue';
import SkillCardVue from '@/components/AccountManagement/SkillCard.vue';
import StudyCardVue from '@/components/AccountManagement/StudyCard.vue';
import TargetDescriptionCardVue from '@/components/AccountManagement/TargetDescriptionCard.vue';
import LanguageCardVue from '@/components/AccountManagement/LanguageCard.vue';
import TypeWorkingCardVue from '../../components/AccountManagement/TypeWorkingCard.vue';

import DrawerVue from '@/layouts/Drawer.vue';

import { useUserStore } from '@/stores/userStore';
export default {
    components: {
        RecommendJob,
        QuickIntroCardVue,
        PersonnalInfoCardVue,
        TargetDescriptionCardVue,
        ExperiencesCardVue,
        StudyCardVue,
        SkillCardVue,
        LanguageCardVue,
        TypeWorkingCardVue
    },
    data() {
        return {
            userStore: useUserStore()
        }
    },
    watch: {
        "userStore.getUserState._id"(newValue, oldValue) {
          
            this.redirectIfAuthenFail()
        },
    },
    created() {
        
        this.redirectIfAuthenFail()
        this.$emit("update:layout", DrawerVue)
    },
    methods: {
        redirectIfAuthenFail() {
            if (this.userStore.getUserState._id) {

            } else {
                this.$router.push('/dang-nhap')

            }
        }
    }
}
</script>
<style lang="">
    
</style>