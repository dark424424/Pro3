<template >
    <div>
        <q-card class="q-pa-md ">
            <div class="text-h6 text-weight-bold row justify-between q-mb-md">
                <span>Lĩnh vực hoạt động</span>

            </div>
            <div>
                <q-btn v-show="!isEdit" class="q-my-md" @click="turnEditMode" outline color="negative" icon="add_circle"
                    label="Thêm lĩnh vực"></q-btn>
            </div>

            <q-card flat>
                <div>
                    <div v-show="isEdit" class="q-mb-md">
                        <div class="row">
                            <div class="col-8">
                                <q-select :options="optionTypeWorkings" bg-color="white" outlined color="deep-orange"
                                    dense max-values="3" multiple type="text" v-model="typeWorking"
                                    label="Lĩnh vực (tối đa 3)" input-debounce="0" @filter="filterFn" use-input />
                            </div>
                            <div class="col-3 row justify-end q-gutter-xs">

                                <q-btn :disable="saving" @click="cancel" unelevated outline color="grey-6" size="md"
                                    label="Hủy"></q-btn>
                                <q-btn :disable="saving" @click="save" unelevated color="negative" size="md"
                                    label="Thêm"></q-btn>
                            </div>
                        </div>
                    </div>
                    <q-chip removable class="text-caption" v-for="(typeWorking, index) in typeWorkings"
                        :key="'typeWorking-' + index" :label="typeWorking.label" @remove="(state) => remove(index)"
                        square color="red" text-color="white"></q-chip>
                </div>
            </q-card>
        </q-card>

    </div>
</template>
<script>
import { useUserStore } from '@/stores/userStore';
import { updateUserInfo } from "@/apis/user"
import { useQuasar } from 'quasar'
import { jobDictionary } from '../../assets/dictionary/job';
export default {
    data() {
        return {
            userStore: useUserStore(),
            isEdit: false,
            saving: false,
            optionTypeWorkings: [],
            $q: useQuasar(),
            typeWorkings: [],
            typeWorking: [],
            initOptionWorkings: [],
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
        remove(index) {
            this.typeWorkings.splice(index, 1)
            this.userStore.getUserState.info.typeWorking = this.typeWorkings.map(element => {
                let field_working = element.value.split('---');
                return ({
                    field: field_working[0],
                    name: field_working[1],
                })
            })
            updateUserInfo(this.userStore.getUserState.info).then(data => {
                if (data) {
                    // console.log(data)
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

                this.typeWorking = []
            })
        },
        filterFn(val, update) {
            update(() => {
                if (val === '') {
                    this.optionTypeWorkings = this.initOptionWorkings
                }
                else {
                    const needle = val.toLowerCase()
                    this.optionTypeWorkings = this.initOptionWorkings.filter(
                        v => v.label.toLowerCase().indexOf(needle) > -1
                    )
                }
            })
        },

        init() {
            jobDictionary.type.forEach(field => {
                field.workings.forEach(working => {
                    this.initOptionWorkings.push({
                        value: field.field + "---" + working,
                        label: working
                    })
                })
            })
            // console.log(this.userStore.getUserState.info.typeWorking)
            this.typeWorkings = this.userStore.getUserState.info.typeWorking.map(item => {
                let newItem = {
                    value: item.field + "---" + item.name,
                    label: item.name,
                    isNotRemoveable: false
                }
                return newItem;
            });
            this.optionTypeWorkings = this.initOptionWorkings

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
            this.typeWorking = [];
        },
        save() {
            //to do
            if (this.typeWorking.length > 0) {
                this.saving = true
                // lấy của user ra đã
                this.userStore.getUserState.info.typeWorking.forEach(everyType => {
                    // check vòng for trùng lặp giá trị
                    this.typeWorking = this.typeWorking.filter(type => {
                        return (type.label !== everyType.name)

                    })

                })
                if (this.typeWorking.length <= 0) {
                    this.isEdit = false;
                    this.saving = false;
                    this.$q.notify({
                        message: 'Vui lòng điền thêm kĩ năng trước khi lưu',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'report',
                    })
                } else {
                    let arr = this.typeWorking.map(element => {
                        let field_working = element.value.split('---');
                        return ({
                            field: field_working[0],
                            name: field_working[1],
                        })
                    })
                    this.userStore.getUserState.info.typeWorking = this.userStore.getUserState.info.typeWorking.concat(arr)
                    this.typeWorkings = this.typeWorkings.concat(this.typeWorking.map(item => {
                        let newItem = {
                            value: item.value,
                            label: item.label,
                            isNotRemoveable: false
                        }
                        return newItem;
                    }))
                    updateUserInfo(this.userStore.getUserState.info).then(data => {
                        if (data) {
                            // console.log(data)
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
                        this.typeWorking = []
                    })
                }
                // chuyển đổi lại dạng

            } else {
                this.isEdit = false;
                this.$q.notify({
                    message: 'Vui lòng điền thêm kĩ năng trước khi lưu',
                    color: 'deep-orange-6',
                    position: "bottom-right",
                    icon: 'report',
                })
            }

        },
    }

}
</script>
<style lang="scss">

</style>