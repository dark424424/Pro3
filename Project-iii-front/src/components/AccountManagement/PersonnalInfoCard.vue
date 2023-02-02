<template >
    <div>

        <q-card class="q-pa-md ">
            <div class="text-h6 text-weight-bold row justify-between ">
                <span>Thông Tin Cá Nhân</span>
                <q-icon color="grey-6" class="cursor-pointer" @click="turnEditMode" name="edit" size="24px"></q-icon>
            </div>
            <q-separator class="q-my-sm"></q-separator>
            <div v-if="!isEdit">
                <div @click="turnEditMode" class="cursor-pointer">
                    <div class="row">
                        <div class="col-6 row">
                            <div class="col-4">
                                Email
                            </div>
                            <div class="col-8 text-weight-bold">
                                {{ userStore.getUserState.email || "Chưa cập nhật" }}
                            </div>
                        </div>
                        <div class="col-6 row">
                            <div class="col-4">
                                Điện thoại
                            </div>
                            <div class="col-8 ">
                                {{ userStore.getUserState.info.phone || "Chưa cập nhật" }}
                            </div>
                        </div>
                    </div>
                    <q-separator class="q-my-sm"></q-separator>
                </div>
                <div>
                    <div class="row">
                        <div class="col-6 row">
                            <div class="col-4">
                                Ngày sinh
                            </div>
                            <div class="col-8 ">
                                {{ $moment(userStore.getUserState.info.dob).format('DD-MM-YYYY') || "Chưa cập nhật" }}
                            </div>
                        </div>
                        <div class="col-6 row">
                            <div class="col-4">
                                Quốc gia
                            </div>
                            <div class="col-8 ">
                                {{ userStore.getUserState.info.country || "Chưa cập nhật" }}
                            </div>
                        </div>
                    </div>
                    <q-separator class="q-my-sm"></q-separator>
                </div>
                <div>
                    <div class="row">
                        <div class="col-6 row">
                            <div class="col-4">
                                Thành phố
                            </div>
                            <div class="col-8 ">
                                {{ userStore.getUserState.info.city || "Chưa cập nhật" }}
                            </div>
                        </div>
                        <div class="col-6 row">
                            <div class="col-4">
                                Quận/Huyện
                            </div>
                            <div class="col-8 ">
                                {{ userStore.getUserState.info.district || "Chưa cập nhật" }}
                            </div>
                        </div>
                    </div>
                    <q-separator class="q-my-sm"></q-separator>
                </div>
                <div>
                    <div class="row">
                        <div class="col-6 row">
                            <div class="col-4">
                                Phường/Xã
                            </div>
                            <div class="col-8 ">
                                {{ userStore.getUserState.info.ward || "Chưa cập nhật" }}
                            </div>
                        </div>
                        <div class="col-6 row">
                            <div class="col-4">
                                Địa chỉ
                            </div>
                            <div class="col-8 ">
                                {{ userStore.getUserState.info.address || "Chưa cập nhật" }}
                            </div>
                        </div>
                    </div>
                    <q-separator class="q-my-sm"></q-separator>
                </div>
            </div>
            <div v-else>
                <div class="row q-mb-md">
                    <div class="col-6">
                        <div class="q-pr-sm">
                            <q-input color="deep-orange" dense type="text" outlined v-model="userStore.getUserState.email"
                                label="Email" disable />
                        </div>
                    </div>
                    <div class="col-6">
                        <q-input color="deep-orange" dense outlined type="tel" v-model="phone" label="Số điện thoại" />
                    </div>
                </div>
                <div class="row ">
                    <div class="col-6">
                        <div class="q-pr-sm">
                            <q-input color="deep-orange" dense outlined v-model="date" mask="date" :rules="['date']">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date :options="optionsFn" v-model="date">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="negative" flat />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <div class="col-6">
                        <q-select :options="optionsCountry" color="deep-orange" dense outlined v-model="country"
                            label="Quốc gia" />
                    </div>
                </div>
                <div class="row q-mb-md">
                    <div class="col-6">
                        <div class="q-pr-sm">
                            <q-select color="deep-orange" :options="optionProvince" dense type="text" outlined
                                v-model="province" label="Thành phố/Tỉnh" :disable="(country !== 'Việt Nam')" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div>
                            <q-select color="deep-orange" :options="optionDistrict" dense type="text" outlined
                                v-model="district" label="Quận/Huyện"
                                :disable="(country !== 'Việt Nam') || !province" />
                        </div>
                    </div>
                </div>
                <div class="row q-mb-md">
                    <div class="col-6">
                        <div class="q-pr-sm">
                            <q-select color="deep-orange" :options="optionWard" dense type="text" outlined v-model="ward"
                                label="Phường/Xã" :disable="(!(country == 'Việt Nam') || !province || !district)" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div>
                            <q-input color="deep-orange" dense type="text" outlined v-model="address" label="Địa chỉ"
                                :disable="(!(country == 'Việt Nam') || !province || !district || !ward)" />
                        </div>
                    </div>
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
import { locationDictionary } from "@/assets/dictionary/location"

export default {
    data() {
        return {
            userStore: useUserStore(),
            isEdit: false,
            saving: false,
            $q: useQuasar(),
            optionsCountry: ["Việt Nam", "Nước ngoài"],
            optionProvince: [],
            optionDistrict: [],
            optionWard: [],
            phone: "",
            date: "",
            country: "",
            province: "",
            district: "",
            ward: "",
            address: "",
        }
    },
    created() {
        this.init();

        this.getOptionProvince()

    },
    watch: {
        // "optionDistrict"(newValue, oldValue){
        //     console.log(newValue, oldValue)
        // },
        // "optionWard"(newValue, oldValue){
        //     console.log(newValue, oldValue)
        // },
        // khởi tạo
        "userStore.getUserState._id"(newValue, oldValue) {
            if (newValue) {

                this.init()
            }

        },
        //check thay đổi sau
        "province"(newValue, oldValue) {

            if (newValue != oldValue && oldValue) {

                this.district = "";
                this.ward = "";


                this.getOptionDistrict()
            }
        },
        "district"(newValue, oldValue) {
            if (newValue != oldValue) {

                this.ward = "";
                this.getOptionWard()
            }
        }

    },
    methods: {
        init() {
            if (this.userStore.getUserState._id) {
                this.phone = this.userStore.getUserState.info.phone
                this.date = this.userStore.getUserState.info.dob
                this.country = this.userStore.getUserState.info.country
                this.province = this.userStore.getUserState.info.city
                this.district = this.userStore.getUserState.info.district
                this.ward = this.userStore.getUserState.info.ward
                this.address = this.userStore.getUserState.info.address
                this.getOptionDistrict();
                this.getOptionWard()


            }

        },
        getOptionDistrict() {
            if (this.province) {
                locationDictionary.forEach(province => {
                    if (province.name == this.province) {
                        this.optionDistrict = province.level2s.map(district => {
                            return district.name
                        })
                    }
                })
            }

        },
        getOptionWard() {
            if (this.province && this.district) {
                locationDictionary.forEach(province => {
                    if (province.name == this.province) {
                        province.level2s.forEach(district => {
                            if (district.name == this.district) {
                                this.optionWard = district.level3s.map(ward => {
                                    return ward.name
                                })
                            }
                        })
                    }
                })
            }
        },
        getOptionProvince() {
            this.optionProvince = locationDictionary.map(province => {
                return (province.name)
            })
        },
        optionsFn(date) {
            let newDate = this.$moment(new Date()).format("YYYY/MM/DD")
            return date < newDate
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
            if (this.country == this.optionsCountry[0]) {
                this.userStore.getUserState.info.address = this.address;
                this.userStore.getUserState.info.ward = this.ward;
                this.userStore.getUserState.info.district = this.district;
                this.userStore.getUserState.info.city = this.province;
            } else {
                this.userStore.getUserState.info.address = "Quốc tế";
                this.userStore.getUserState.info.ward = "Quốc tế";
                this.userStore.getUserState.info.district = "Quốc tế";
                this.userStore.getUserState.info.city = "Quốc tế";
            }
            this.userStore.getUserState.info.country = this.country;
            this.userStore.getUserState.info.dob = this.date;
            this.userStore.getUserState.info.phone = this.phone;
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