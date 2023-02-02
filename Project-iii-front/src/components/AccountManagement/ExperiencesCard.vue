<template >
    <div>
        <q-card class="q-pa-md ">
            <div class="text-h6 text-weight-bold ">
                <span>Kinh Nghiệm Làm Việc</span>
            </div>
            <div>
                <q-btn class="q-my-md" @click="addExperience" outline color="negative" icon="add_circle"
                    label="Thêm kinh nghiệm làm việc"></q-btn>
            </div>
            <div class="q-gutter-xs">
                <div class="" v-for="(experience, index) in experiences" :key="'experience-' + index">
                    <q-card v-if="!experience.isEdit" class="q-pa-md ">
                        <div class="row q-gutter-md">
                            <div class="col-2">
                                <div class="">
                                    <div class="text-center text-negative text-h6">
                                        {{ ($moment(experience.to).diff(experience.from, 'months') < 1) ? "Dưới 1 " :
                                                ($moment(experience.to).diff(experience.from, 'months'))
                                        }} </div>
                                            <div class=" text-center">tháng</div>
                                    </div>
                                </div>
                                <div class="col-7">
                                    <div>
                                        <span class="text-weight-bold">{{ experience.position }}</span>
                                    </div>
                                    <div>
                                        <span class="">{{ experience.company }}</span>
                                    </div>
                                    <div>
                                        <span class="">{{ $moment(experience.from).format("MM/YYYY") }}</span> -
                                        <span v-show="!experience.isWorking">{{ $moment(experience.to).format("MM/YYYY")
                                        }}</span>
                                        <span v-show="experience.isWorking">Hiện tại</span>

                                    </div>
                                </div>
                                <div class="col-2 row justify-end items-centerq-gutter-sm">
                                    <q-icon v-show="!experience.isShowDesc" color="grey-6" class="cursor-pointer"
                                        @click="toggleDesc(index)" name="expand_more" size="24px"></q-icon>
                                    <q-icon v-show="experience.isShowDesc" color="grey-6" class="cursor-pointer"
                                        @click="toggleDesc(index)" name="expand_less" size="24px"></q-icon>
                                    <q-icon color="grey-6" class="cursor-pointer" @click="turnEditMode(index)"
                                        name="edit" size="20px"></q-icon>
                                </div>
                            </div>
                            <div v-show="experience.isShowDesc">
                                <q-separator class="q-my-md"></q-separator>
                                <q-card flat>
                                    <q-card-section v-html="experience.desc" />
                                </q-card>
                            </div>
                    </q-card>
                    <q-card v-else class="q-pa-md bg-grey-2">
                        <div v-show="experience.position">
                            <span class="text-subtitle1 text-weight-bold">Sửa Kinh Nghiệm Làm Việc</span>
                        </div>
                        <div v-show="!experience.position">
                            <span class="text-subtitle1 text-weight-bold">Thêm Kinh Nghiệm Làm Việc</span>
                        </div>
                        <q-separator class="q-my-md"></q-separator>
                        <div class="row">
                            <div class="col-6 q-pr-xs">

                                <q-input bg-color="white" outlined color="deep-orange" dense type="text"
                                    v-model="experience.position" label="Chức danh"
                                    :rules="[val => !!val || 'Thông tin bắt buộc']" />
                            </div>
                            <div class="col-6">
                                <q-input bg-color="white" outlined color="deep-orange" dense type="text"
                                    v-model="experience.company" label="Công ty"
                                    :rules="[val => !!val || 'Thông tin bắt buộc']" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4 q-pr-xs">
                                <q-input bg-color="white" outlined color="deep-orange" label="Từ" dense
                                    v-model="experience.from" mask="date" :rules="['date']">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="experience.from">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="negative" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-4 q-pr-xs">
                                <q-input bg-color="white" outlined color="deep-orange" label="Đến" dense
                                    v-model="experience.to" mask="date" :rules="['date']">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="experience.to">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="negative" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-4 ">

                                <q-toggle v-model="experience.isWorking" color="red" />
                                <span>
                                    Công việc hiện tại
                                </span>

                            </div>
                        </div>
                        <div class="row">

                            <div class="q-mb-md">
                                <form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
                                    <q-editor ref="editorRef" @paste="evt => onPaste(evt, index)"
                                        v-model="experience.desc" />
                                </form>
                            </div>
                        </div>
                        <div class=" q-mb-md q-gutter-sm row justify-end items-center">

                            <q-btn :disable="experience.saving" color="grey-6" class="cursor-pointer" flat unelevated
                                icon="delete" @click="deleteEx(index)"></q-btn>
                            <q-btn :disable="experience.saving" @click="cancel(index)" unelevated outline color="grey-6"
                                size="md" label="Hủy"></q-btn>
                            <q-btn :disable="experience.saving" @click="save(index)" unelevated color="negative"
                                size="md" label="Lưu"></q-btn>
                        </div>
                    </q-card>

                </div>
            </div>
        </q-card>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/userStore';
import { updateUserInfo } from "@/apis/user"
import { ref } from "vue"
import { useQuasar } from 'quasar'

export default {

    data() {
        return {
            userStore: useUserStore(),
            $q: useQuasar(),
            experiences: [],


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
    },
    methods: {
        deleteEx(index) {
            this.experiences.splice(index, 1)
            let makeFilterExperience = this.experiences.map(item => {
                delete item.isEdit,
                    delete item.isShowDesc
                delete item.editorRef
                delete item.saving
                return (item)
            })
            this.userStore.getUserState.info.experiences = makeFilterExperience
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
            })

        },
        save(index) {
            let { position, company, desc, from, to } = this.experiences[index]

            if (position && company && desc && from && to) {
                this.experiences[index].saving = true
                let makeFilterExperience = this.experiences.map(item => {
                    delete item.isEdit,
                        delete item.isShowDesc
                    delete item.editorRef
                    delete item.saving
                    return (item)
                })
                this.userStore.getUserState.info.experiences = makeFilterExperience
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
                    this.experiences[index].isEdit = false
                    this.experiences[index].saving = false
                    this.experiences[index].isShowDesc = false

                })
            } else {
                this.$q.notify({
                    message: 'Hãy điền đầy đủ thông tin',
                    color: 'deep-orange-6',
                    position: "bottom-right",
                    icon: 'report',
                })
            }

        },
        cancel(index) {
            this.$q.notify({
                message: 'Đã hủy',
                color: 'deep-orange-6',
                position: "bottom-right",
                icon: 'report',
            })
            this.experiences[index].isEdit = false
            this.experiences[index].isShowDesc = false

            if (!this.experiences[index]._id) {
                this.experiences.splice(index, 1)
            }
        },

        onPaste(evt, index) {

            // Let inputs do their thing, so we don't break pasting of links.
            if (evt.target.nodeName === 'INPUT') return
            let text, onPasteStripFormattingIEPaste
            evt.preventDefault()
            if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
                text = evt.originalEvent.clipboardData.getData('text/plain')
                this.$refs.editorRef[index].runCmd('insertText', text)
            }
            else if (evt.clipboardData && evt.clipboardData.getData) {
                text = evt.clipboardData.getData('text/plain')
                this.$refs.editorRef[index].runCmd('insertText', text)
            }
            else if (window.clipboardData && window.clipboardData.getData) {
                if (!onPasteStripFormattingIEPaste) {
                    onPasteStripFormattingIEPaste = true
                    this.$refs.editorRef[index].runCmd('ms-pasteTextOnly', text)
                }
                onPasteStripFormattingIEPaste = false
            }
        },
        toggleDesc(index) {
            this.experiences[index].isShowDesc = !this.experiences[index].isShowDesc
        },
        addExperience() {
            let makeExperience = {
                position: "",
                company: "",
                from: "",
                to: "",
                desc: "",
                isWorking: false,
                isEdit: true,
                isShowDesc: false,
                editorRef: ref(null),
                saving: false,
            }
            this.experiences.unshift(makeExperience)
        },
        init() {
            this.experiences = this.userStore.getUserState.info.experiences.map(item => {
                item.isEdit = false
                item.isShowDesc = false
                item.saving = false,
                    item.editorRef = ref(null)
                return (item)
            })
            // console.log(this.experiences);
        },
        turnEditMode(index) {
            this.experiences[index].isEdit = true
        }
    }
}
</script>
<style lang="">
    
</style>