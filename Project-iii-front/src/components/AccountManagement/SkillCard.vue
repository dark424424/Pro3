<template >
    <div>
        <q-card class="q-pa-md ">
            <div class="text-h6 text-weight-bold row justify-between q-mb-md">
                <span>Kĩ Năng</span>

            </div>
            <div>
                <q-btn v-show="!isEdit" class="q-my-md" @click="turnEditMode" outline color="negative" icon="add_circle"
                    label="Thêm kĩ năng"></q-btn>
            </div>

            <q-card flat>
                <div>
                    <div v-show="isEdit" class="q-mb-md">
                        <div class="row">
                            <div class="col-8">
                                <q-select :options="optionSKills" bg-color="white" outlined color="deep-orange" dense
                                    max-values="3" multiple type="text" v-model="skill" label="Kĩ năng (tối đa 3)"
                                    input-debounce="0" @filter="filterFn" use-input />
                            </div>
                            <div class="col-3 row justify-end q-gutter-xs">

                                <q-btn :disable="saving" @click="cancel" unelevated outline color="grey-6" size="md"
                                    label="Hủy"></q-btn>
                                <q-btn :disable="saving" @click="save" unelevated color="negative" size="md"
                                    label="Thêm"></q-btn>
                            </div>
                        </div>
                    </div>
                    <q-chip removable class="text-caption" v-for="(skill, index) in skills" :key="'skill-' + index"
                        :label="skill.name" @remove="(state) => remove(index)" square color="red"
                        text-color="white"></q-chip>
                </div>
            </q-card>
        </q-card>

    </div>
</template>
<script>
import { useUserStore } from '@/stores/userStore';
import { updateUserInfo } from "@/apis/user"
import { useQuasar } from 'quasar'
import { jobDictionary } from '@/assets/dictionary/job';
export default {
    data() {
        return {
            userStore: useUserStore(),
            isEdit: false,
            saving: false,
            optionSKills: [],
            $q: useQuasar(),
            skills: [],
            skill: [],
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
            this.skills.splice(index, 1)
            this.userStore.getUserState.info.skills = this.skills.map(element => element.name)
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
            
                this.skill = []
            })
        },
        filterFn(val, update) {
            update(() => {
                if (val === '') {
                    this.optionSKills = jobDictionary.skills
                }
                else {
                    const needle = val.toLowerCase()
                    this.optionSKills = jobDictionary.skills.filter(
                        v => v.toLowerCase().indexOf(needle) > -1
                    )
                }
            })
        },

        init() {
            this.skills = this.userStore.getUserState.info.skills.map(item => {
                let newItem = {
                    name: item,
                    isNotRemoveable: false
                }
                return newItem;
            });
            this.optionSKills = jobDictionary.skills

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
            this.skill = [];
        },
        save() {
            if (this.skill.length > 0) {
                this.saving = true
                this.userStore.getUserState.info.skills.forEach(everySkill => {
                    if (this.skill.includes(everySkill)) {
                        this.skill.splice(this.skill.indexOf(everySkill), 1)
                    }
                })
                this.userStore.getUserState.info.skills = this.userStore.getUserState.info.skills.concat(this.skill)
                this.skills = this.skills.concat(this.skill.map(item => {
                    let newItem = {
                        name: item,
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
                    this.skill = []
                })
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