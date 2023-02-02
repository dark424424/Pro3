<template >
    <div>
        <q-card v-if="!isEdit">
            <div class="row q-pa-md ">
                <div class="">
                    <q-img fit="cover" loading="lazy" width='150px' ratio="1"
                        :src="userStore.getUserState.info.avatar" />
                </div>
                <div class="col q-ml-md q-gutter-sm">
                    <div class="text-weight-bold text-h6">
                        {{ userStore.getUserState.info.name }}
                    </div>
                    <div>
                        <span @click="turnEditMode" class="cursor-pointer">

                            Chức Danh: {{ userStore.getUserState.info.positionPresent || " Chưa cập nhật" }}/
                            {{ userStore.getUserState.info.levelPresent || " Chưa cập nhật" }}
                        </span>
                    </div>
                    <div>
                        <span @click="turnEditMode" class="cursor-pointer">
                            Số Năm Kinh Nghiệm:
                            {{ userStore.getUserState.info.yearExperienced + " năm" || " Chưa cập nhật" }}
                        </span>
                    </div>
                    <div>
                        <span @click="turnEditMode" class="cursor-pointer">
                            Công Ty Gần Đây Nhất:
                            {{ userStore.getUserState.info.experiences.length > 0 ?
                                    userStore.getUserState.info.experiences[0].company
                                    : " Chưa cập nhật"
                            }}
                        </span>
                    </div>
                    <div>
                        <span @click="turnEditMode" class="cursor-pointer">
                            Bằng Cấp Cao Nhất:
                            {{ userStore.getUserState.info.education.length > 0 ?
                                    userStore.getUserState.info.education[0].certificate
                                    : " Chưa cập nhật"
                            }}
                        </span>
                    </div>
                    <div>
                        <span @click="turnEditMode" class="cursor-pointer">
                            Cho Phép Tìm Kiếm:
                            {{ userStore.getUserState.info.allowSearchInfo ?
                                    "Đang bật"
                                    : "Đang tắt"
                            }}
                        </span>
                    </div>
                    <div class="absolute-right">
                        <div class="q-mr-md q-mt-sm">
                            <q-icon color="grey-6" class="cursor-pointer" @click="turnEditMode" name="edit"
                                size="24px"></q-icon>
                        </div>
                    </div>
                </div>
            </div>
        </q-card>
        <q-card v-else>
            <div class="row q-pa-md ">
                <div class="">
                    <div>
                        <q-img fit="cover" loading="lazy" width='150px' ratio="1" :src="avatar" />
                    </div>
                    <div class="q-mt-xs">

                        <div class="text-center">
                            <q-icon class="cursor-pointer" @click="previewFile" name="edit" size="24px"></q-icon>
                        </div>


                    </div>

                </div>
                <div class="col q-ml-md q-gutter-sm">
                    <div>
                        <q-input color="deep-orange" dense outlined v-model="name" label="Họ tên" />
                    </div>
                    <div>
                        <q-input color="deep-orange" dense outlined v-model="positionPresent" label="Chức danh" />
                    </div>
                    <div>
                        <q-select :options="options" color="deep-orange" dense outlined v-model="levelPresent"
                            label="Cấp bậc" />
                    </div>
                    <div>
                        <q-input color="deep-orange" dense type="number" outlined v-model.number="yearExperienced"
                            label="Số năm kinh nghiệm" />
                    </div>
                    <div class="row justify-between items-center">
                        <div>
                            <span>
                                Cho phép tìm kiếm
                            </span>
                            <q-toggle v-model="allowSearchInfo" color="red" />
                        </div>
                        <div class=" q-mb-md q-gutter-sm ">
                            <q-btn :disable="saving" @click="cancel" unelevated outline color="grey-6" size="md"
                                label="Hủy"></q-btn>
                            <q-btn :disable="saving" @click="save" unelevated color="negative" size="md"
                                label="Lưu"></q-btn>
                        </div>
                    </div>
                </div>
            </div>
        </q-card>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/userStore';
import { updateUserInfo } from "@/apis/user"
import { jobDictionary } from '@/assets/dictionary/job';
import { useQuasar } from 'quasar'
import { uploadImage } from "@/cloudinary"
import { Cloudinary } from 'cloudinary-core'

export default {
    data() {
        return {
            userStore: useUserStore(),
            isEdit: false,
            saving: false,
            options: [],
            $q: useQuasar(),
            avatarFile: null,
            cl: new Cloudinary({ cloud_name: "Long Study-networking", secure: true }),
            myWidget: null,
            avatar: "",
            name: "",
            positionPresent: "",
            levelPresent: "",
            yearExperienced: 0,
            allowSearchInfo: false,
        }
    },
    watch: {
        "userStore.getUserState._id"(newValue, oldValue) {
            if (newValue) {
                this.init()
            }

        },
    },
    created() {
        this.init()
        for (const position in jobDictionary.level) {
            // console.log(`${property}: ${object[property]}`);
            this.options.push(jobDictionary.level[position].name)
        }
        this.myWidget = cloudinary.createUploadWidget({
            cloudName: 'Long-networking',
            uploadPreset: 'gj08ngug'
        }, (error, result) => {
            this.avatarFile = null;
            // console.log(result)
            if (!error && result && result.event === "success") {
                // this.avatarFile = result.info;
                this.avatar = result.info.url
            }
        }
        )

    },
    methods: {
        init() {
            this.avatar = this.userStore.getUserState.info.avatar;
            this.name = this.userStore.getUserState.info.name;
            this.positionPresent = this.userStore.getUserState.info.positionPresent;
            this.levelPresent = this.userStore.getUserState.info.levelPresent;
            this.yearExperienced = this.userStore.getUserState.info.yearExperienced;
            this.allowSearchInfo = this.userStore.getUserState.info.allowSearchInfo;
        },
        turnEditMode() {
            this.isEdit = true
        },
        cancel() {
            this.$q.notify({
                message: 'Đã hủy',
                color: 'deep-orange-6',
                position: "bottom-right",
                icon: 'report',
            })
            this.isEdit = false
        },
        save() {
            this.saving = true
            this.userStore.getUserState.info.avatar = this.avatar
            this.userStore.getUserState.info.name = this.name;
            this.userStore.getUserState.info.positionPresent = this.positionPresent
            this.userStore.getUserState.info.levelPresent = this.levelPresent
            this.userStore.getUserState.info.yearExperienced = this.yearExperienced
            this.userStore.getUserState.info.allowSearchInfo = this.allowSearchInfo
            updateUserInfo(this.userStore.getUserState.info).then(data => {
                if (data) {
                    this.$q.notify({
                        message: 'Cập nhật thành công',
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                } else {
                    this.$q.notify({
                        message: 'Cập nhật thất bại',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'report',
                    })
                }
                this.isEdit = false;
                this.saving = false;
            })
        },

        previewFile() {
            this.myWidget.open()
        }
    }
}
</script>
<style lang="scss">

</style>