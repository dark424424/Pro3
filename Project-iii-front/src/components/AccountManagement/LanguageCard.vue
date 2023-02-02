<template >
    <div>
        <q-card class="q-pa-md ">
            <div class="text-h6 text-weight-bold ">
                <span>Ngoại ngữ</span>
            </div>
            <div>
                <q-btn class="q-my-md" @click="addLang" outline color="negative" icon="add_circle"
                    label="Thêm ngoại ngữ"></q-btn>
            </div>
            <div class="q-gutter-xs">
                <div class="" v-for="(language, index) in languages" :key="'language-' + index">
                    <q-card v-if="!language.isEdit" class="q-pa-md ">
                        <div class="row q-gutter-md justify-between">
                            <div class="">
                                <div class="">
                                    <span class="text-weight-bold">{{ language.name }}</span>
                                    -
                                    <span class="">{{ language.level }}</span>
                                </div>
                                <div>
                                    <span>
                                        Chứng nhận: <i>{{ language.certificate }}</i>
                                    </span>
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="col-2 row justify-end items-centerq-gutter-sm">

                                    <q-icon color="grey-6" class="cursor-pointer" @click="turnEditMode(index)"
                                        name="edit" size="20px"></q-icon>
                                </div>
                            </div>
                        </div>

                    </q-card>
                    <q-card v-else class="q-pa-md bg-grey-2">
                        <div v-show="language.name">
                            <span class="text-subtitle1 text-weight-bold">Sửa Ngoại Ngữ</span>
                        </div>
                        <div v-show="!language.name">
                            <span class="text-subtitle1 text-weight-bold">Thêm Ngoại Ngữ</span>
                        </div>
                        <q-separator class="q-my-md"></q-separator>
                        <div class="row">
                            <div class="col-6 q-pr-xs">

                                <q-select :options="optionsLanguage" bg-color="white" outlined color="deep-orange"
                                    dense v-model="language.name" label="Ngoại ngữ"
                                    :rules="[val => !!val || 'Thông tin bắt buộc']" />
                            </div>
                            <div class="col-6">
                                <q-select :options="optionsCertificate" bg-color="white" outlined color="deep-orange"
                                    dense v-model="language.level" label="Trình độ"
                                    :rules="[val => !!val || 'Thông tin bắt buộc']" />
                            </div>
                        </div>
                        <div class="row">
                            <q-input bg-color="white" outlined color="deep-orange" dense type="text"
                                v-model="language.certificate" label="Chứng nhận (link ảnh/ link chứng nhận,...)"
                                :rules="[val => !!val || 'Thông tin bắt buộc']" />
                        </div>
                        <div class=" q-mb-md q-gutter-sm row justify-end items-center">

                            <q-btn :disable="language.saving" color="grey-6" class="cursor-pointer" flat unelevated
                                icon="delete" @click="deleteLang(index)"></q-btn>
                            <q-btn :disable="language.saving" @click="cancel(index)" unelevated outline color="grey-6"
                                size="md" label="Hủy"></q-btn>
                            <q-btn :disable="language.saving" @click="save(index)" unelevated color="negative" size="md"
                                label="Lưu"></q-btn>
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
import { jobDictionary } from '@/assets/dictionary/job';



export default {

    data() {
        return {
            userStore: useUserStore(),
            $q: useQuasar(),
            languages: [],
            optionsCertificate: ["Sơ cấp", "Trung cấp", "Cao cấp", "Bản địa"],
            optionsLanguage: jobDictionary.languague

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
        deleteLang(index) {
            this.languages.splice(index, 1)
            let makeFilterLanguague = this.languages.map(item => {
                delete item.isEdit,
                    delete item.isShowDesc
                delete item.editorRef
                delete item.saving
                return (item)
            })
            this.userStore.getUserState.info.foreignLanguage = makeFilterLanguague
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
            let { name, level } = this.languages[index]

            if (name && level) {
                this.languages[index].saving = true
                let makeFilterLanguague = this.languages.map(item => {
                    delete item.isEdit,
                        delete item.isShowDesc
                    delete item.editorRef
                    delete item.saving
                    return (item)
                })
                this.userStore.getUserState.info.foreignLanguage = makeFilterLanguague
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
                    this.languages[index].isEdit = false
                    this.languages[index].saving = false
                    this.languages[index].isShowDesc = false

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
            this.languages[index].isEdit = false
            this.languages[index].isShowDesc = false

            if (!this.languages[index]._id) {
                this.languages.splice(index, 1)
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
            this.languages[index].isShowDesc = !this.languages[index].isShowDesc
        },
        addLang() {
            let makeLanguage = {
                name: "",
                level: "",
                certificate: "",
                // bộ 4 đi kèm bên dưới
                isEdit: true,
                isShowDesc: false,
                editorRef: ref(null),
                saving: false,
            }
            this.languages.unshift(makeLanguage)
        },
        init() {
            this.languages = this.userStore.getUserState.info.foreignLanguage.map(item => {
                item.isEdit = false;
                item.isShowDesc = false;
                item.saving = false;
                item.editorRef = ref(null);
                return (item)
            })

            // console.log(this.educations);
        },
        turnEditMode(index) {
            this.languages[index].isEdit = true
        }
    }
}
</script>
<style lang="">
    
</style>