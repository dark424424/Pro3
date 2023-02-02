<template >
    <div>
        <q-card class="q-pa-md ">
            <div class="text-h6 text-weight-bold row justify-between q-mb-md">
                <span>Mục Tiêu Nghề Nghiệp</span>
                <q-icon color="grey-6" class="cursor-pointer" @click="turnEditMode" name="edit" size="24px"></q-icon>
            </div>
            <div v-if="!isEdit">
                <q-card flat >
                    <q-card-section  v-html="userStore.getUserState.info.desc" />
                </q-card>
            </div>
            <div v-else>
                <div class="q-mb-md">
                    <form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
                        <q-editor ref="editor_ref" @paste="onPaste" v-model="desc" />
                    </form>
                </div>
                <div class=" q-mb-md q-gutter-sm row justify-end ">
                    <q-btn :disable="saving" @click="cancel" unelevated outline color="grey-6" size="md"
                        label="Hủy"></q-btn>
                    <q-btn :disable="saving" @click="save" unelevated color="negative" size="md" label="Lưu"></q-btn>
                </div>
            </div>

        </q-card>

    </div>
</template>
<script>
import { useUserStore } from '@/stores/userStore';
import { updateUserInfo } from "@/apis/user"
import { useQuasar } from 'quasar'
import { ref } from "vue"
export default {
    data() {
        return {
            userStore: useUserStore(),
            isEdit: false,
            saving: false,
            options: [],
            $q: useQuasar(),
            desc: "",
            editorRef: ref(null)
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
        onPaste(evt) {
            // Let inputs do their thing, so we don't break pasting of links.
            if (evt.target.nodeName === 'INPUT') return
            let text, onPasteStripFormattingIEPaste
            evt.preventDefault()
            if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
                text = evt.originalEvent.clipboardData.getData('text/plain')
                this.$refs.editor_ref.runCmd('insertText', text)
            }
            else if (evt.clipboardData && evt.clipboardData.getData) {
                text = evt.clipboardData.getData('text/plain')
                this.$refs.editor_ref.runCmd('insertText', text)
            }
            else if (window.clipboardData && window.clipboardData.getData) {
                if (!onPasteStripFormattingIEPaste) {
                    onPasteStripFormattingIEPaste = true
                    this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
                }
                onPasteStripFormattingIEPaste = false
            }
        },
        init() {
            this.desc = this.userStore.getUserState.info.desc;
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
            this.userStore.getUserState.info.desc = this.desc
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
    }

}
</script>
<style lang="scss">

</style>