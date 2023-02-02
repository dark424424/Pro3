<template>
    <div class="" style="">

        <q-form @submit="onSubmit" class=" fit row no-wrap justify-start items-center ">
            <q-input class="search-ba q-pr-sm" filled name="text" style="width: 400px" :dense="true"
                input-class="text-body2" bg-color="grey-3" color="negative" v-model="searchStore.text"
                placeholder="Tìm kiếm công việc, kĩ năng,...">
                <template v-slot:append>
                    <q-icon v-if="searchStore.text !== ''" name="close" @click="searchStore.text = ''"
                        class="cursor-pointer" />
                </template>
            </q-input>
            <q-select class="q-pr-sm" label="Nơi làm việc (tối đa 2)" name="workingLocations" clearable
                model-value="workingLocations" max-values="2" :dense="true" bg-color="grey-3" color="negative" outlined
                v-model="workingLocations" multiple :options="workingLocationsOptions" style="width: 250px" />
            <q-select class="q-pr-md" label="Ngành nghề (tối đa 2)" name="workingAreas" clearable
                model-value="workingAreas" max-values="2" :dense="true" bg-color="grey-3" color="negative" outlined
                v-model="workingAreas" multiple :options="workingAreasOptions" style="width: 250px" />
            <q-btn label="Tìm kiếm" type="submit" color="negative" />
        </q-form>

    </div>
</template>
  
<script >
import { ref } from 'vue'
import { useSearchStore } from "@/stores/searchStore"
import { jobDictionary } from "@/assets/dictionary/job"
import { provinceDictionary } from "@/assets/dictionary/location"
export default {
    setup() {
        const searchStore = useSearchStore();
        const workingLocations = ref([])
        const workingAreas = ref([])
        let array = [];
        jobDictionary.type.forEach(field => {
            field.workings.forEach(working => {
                array.push({
                    value: field.field + "---" + working,
                    label: working
                })
            })
        })
        let array2 = provinceDictionary.map(province => {
            let label = province.replace(/Thành phố |Tỉnh /gi, "")
            return ({
                value: province,
                label: label
            })
        })

        const workingLocationsOptions = array2
        const workingAreasOptions = array

        return {
            searchStore, workingAreas, workingLocations, workingLocationsOptions, workingAreasOptions
        }
    },
    methods: {
        onSubmit(evt) {
            console.log(this.workingAreas)
            let filter = {

            }
            if (this.workingAreas != null) {
                if (this.workingAreas.length) {
                    filter['info.type.name'] = []
                    this.workingAreas.forEach(working => {
                        let field_working = working.value.split('---')
                        filter['info.type.name'].push(field_working[1])
                    })
                }
            }
            if (this.workingLocations != null) {
                if (this.workingLocations.length) {
                    filter['info.workingAddress.province'] = []
                    this.workingLocations.forEach(province => {
                        filter['info.workingAddress.province'].push(province.value)
                    })
                }
            }
            this.searchStore.setFilterValue(filter)
            this.searchStore.pageNumber = 0;
            let filterProvince = this.searchStore.filter['info.workingAddress.province'] ? this.searchStore.filter['info.workingAddress.province'] : ""
            let filterTypeJob = this.searchStore.filter['info.type.name'] ? this.searchStore.filter['info.type.name'] : ""
            if (filterTypeJob) {
                filterTypeJob = "--nganh--" + filterTypeJob
            }
            if (filterProvince) {
                filterProvince = "--tai--" + filterProvince
            }
            if(filterProvince || filterTypeJob || this.searchStore.text){
                this.$router.push(`/viec-lam?q=${this.searchStore.text}${filterProvince}${filterTypeJob}`)
            }else{
                this.$router.push(`/viec-lam`)
            }
            this.searchStore.setToggle();
            // TRiigger
            // GỌI FUNC 
        }
    }
}











</script>

<style scoped>

</style>
  