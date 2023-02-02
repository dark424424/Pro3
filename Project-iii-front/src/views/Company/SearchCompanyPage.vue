<template>
    <div class="bg-grey-1 q-pt-xl" :style="{ minHeight: '100vh' }">
        <div class="p-container">
            <div class="q-gutter-sm">

                <div class="text-h5 text-weight-bold">KHÁM PHÁ VĂN HÓA CÔNG TY</div>
                <div class="">Tìm hiểu văn hoá công ty và chọn cho bạn nơi làm việc phù hợp nhất.</div>
                <q-form @submit="onSubmit" class=" row  justify-start items-center ">
                    <q-input class="search-ba q-pr-sm" outlined name="text" style="width: 600px" :dense="true"
                        input-class="text-body2" bg-color="grey-3" color="negative" v-model="text"
                        placeholder="Nhập tên công ty">
                        <template v-slot:append>
                            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-btn label="Tìm" type="submit" unelevated color="negative" />
                </q-form>
                <div v-if="!loading">
                    <q-card flat class="q-pa-md q-gutter-xs">
                        <div class="text-h6 text-weight-medium">Kết quả tìm kiếm</div>
                        <div>
                            <span>
                                Chúng tôi tìm thấy
                            </span>
                            <span class="text-warning">
                                {{ " " + count + " " }}

                            </span>
                            <span>
                                kết quả phù hợp với từ khóa
                            </span>
                            <span>
                                <strong>

                                    {{ ' "' + searchTextAfter + '"' }}
                                </strong>
                            </span>
                        </div>
                        <q-pagination v-if="count != 0" v-model="pageNumber" :max="count / 30 + 1" :max-pages="6"
                            boundary-numbers outline color="negative" active-design="unelevated" active-color="negative"
                            active-text-color="white" />
                        <div class="row">
                            <q-card-section class="col-6 q-pr-xs" v-for="(company, index) in data"
                                :key="'company-' + index">
                                <div class="row q-gutter-md">
                                    <div class="col-3">
                                        <q-img :src="company.info.logo"></q-img>
                                    </div>
                                    <div class="col-8">
                                        <div>
                                            <router-link :to="'/cong-ty/' + company.info.name">
                                                <span class="hover cursor-pointer text-bold">{{ company.info.name
                                                }}</span>
                                            </router-link>
                                        </div>
                                        <div class="text-caption">
                                            <span v-for="(area, indexArea) in company.info.workingArea"
                                                :key="'area-' + indexArea">
                                                <span v-if="indexArea < company.info.workingArea.length - 1">
                                                    {{ area.name + ", " }}
                                                </span>
                                                <span v-else>
                                                    {{ area.name }}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>
                        </div>
                    </q-card>
                </div>
                <div v-else>
                    <div class="row q-pa-md fit ">
                        <div class="col-4" v-for="item, index in Array(10)" :key="index + 'lloading'">
                            <div class="row q-my-xs">
                                <q-skeleton type="rect" width="100px" height="100px"></q-skeleton>
                                <div class="q-mx-sm">
                                    <q-skeleton type="text" height="32px" width="100px"></q-skeleton>
                                    <q-skeleton type="text" height="32px" width="180px"></q-skeleton>
                                    <q-skeleton type="text" height="32px" width="180px"></q-skeleton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DrawerVue from '../../layouts/Drawer.vue'
import { searchCompany } from "../../apis/search"
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
    data() {
        return {
            text: "",
            $q: useQuasar(),
            count: 0,
            data: [],
            pageNumber: ref(1),
            searchTextAfter: "",
            loading: true,
        }
    },
    watch: {
        "$route.query.keyword"(newValue, oldValue) {
            if (newValue != oldValue) {
                this.getCompanyByKeyword();
            }
        },
        pageNumber(newValue, oldValue) {
            if (newValue != oldValue) {
                this.$router.push(`/cong-ty?keyword=${this.text}&pageNumber=${this.pageNumber - 1}`)
                this.getCompanyByKeyword();
            }
        }
    },
    created() {
        this.$emit("update:layout", DrawerVue)
        this.getCompanyByKeyword()

    },
    methods: {
        onSubmit() {
            let { keyword } = this.$route.query
            if (keyword != this.text) {
                this.$router.push(`/cong-ty?keyword=${this.text}`)
            }
        },
        getCompanyByKeyword() {
            this.loading = true;
            let { keyword, pageNumber } = this.$route.query
            if (!keyword) {
                keyword = ""
            }
            if (!pageNumber) {
                pageNumber = 0
            }
            this.text = keyword;
            searchCompany({ keyword, pageNumber, limit: 30 }).then(companies => {
                if (companies) {

                    this.count = companies.total;
                    this.data = companies.data;
                    this.searchTextAfter = keyword
                }
                this.$q.notify({
                    message: 'Tìm kiếm hoàn thành',
                    color: 'green-6',
                    position: "bottom-right",
                    icon: 'check_circle',
                })
                this.loading = false
                // console.log(companies)
            })
        }
    }
}
</script>
<style lang="scss">
.hover:hover {
    transition: all 200ms;
    color: $warning;
}
</style>