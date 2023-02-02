<template >
    <div v-if="loading">
        <div class="row q-gutter-lg">
            <q-card class="col items-center q-gutter-xs card-loading" v-for="(item, index ) in Array(6)" :key="'vr-field-' + index">
               

                    <q-skeleton type="rect" size="100px"></q-skeleton>
                    
                    <q-skeleton type="text" width="200px" height="40px"></q-skeleton>
                    
                    <q-skeleton type="text" width="120px" height="40px"></q-skeleton>
              


            </q-card>
        </div>
    </div>
    <div v-else>
        <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated
            control-color="negative" arrows height="250px" class="bg-grey-1">

            <q-carousel-slide v-for="(items, index) in topAreaWithCount" :key="'slide' + index" :name="index + 1"
                class="row no-wrap ">
                <div class="row q-gutter-lg ">
                    <q-card v-for="(item, index1) in items" :key="index1" class="my-card  cursor-pointer q-hoverable ">
                        <span class=""></span>
                        <div class=" card-container">
                            <q-card-section class="icon-img">
                                <q-icon color="red-14" :name="item.icon" size="60px" />
                            </q-card-section>

                            <q-card-section class="field-container q-py-none text-center">
                                <router-link :to="'/viec-lam?q='+ item.field" >
                                    <span class="text-hover-field text-subtitle1 text-weight-bold">{{ item.field
                                    }}</span>
                                </router-link>
                            </q-card-section>

                            <q-card-section class=" q-pt-none">
                                <span class="text-subtitle2 text-gray">
                                    {{ item.count }} việc làm
                                </span>
                            </q-card-section>
                        </div>
                    </q-card>
                </div>
            </q-carousel-slide>

        </q-carousel>
    </div>

</template>
<script>
import { ref } from 'vue'
import { jobDictionary } from "@/assets/dictionary/job"
import { getCountInField } from "@/apis/job"
export default {
    data() {

        return { topAreaWithCount: [], slide: ref(1), loading: true };
    },
    created() {
        this.getTopAreaWithCount();
    },
    methods: {
        getTopAreaWithCount() {
            this.loading = true
            // GỌI API 
            jobDictionary.type.forEach((type, index) => {
                getCountInField({ field: type.field }).then(count => {
                    if (!this.topAreaWithCount[Math.floor(index / 6)]) {
                        this.topAreaWithCount[Math.floor(index / 6)] = []
                    }
                    this.topAreaWithCount[Math.floor(index / 6)].push(
                        {
                            field: type.field,
                            count: count,
                            icon: "attach_money"
                        }
                    )
                    if (index == jobDictionary.type.length - 1) {
                        this.loading = false;
                    }
                    // console.log(this.topAreaWithCount)
                })
            })
        }
    }


}
</script>
<style lang="scss" scoped>
.card-loading {
    width: 200px;
    height: 200px;
}

.text-gray {
    color: rgb(250, 82, 82)
}

.field-container {
    inline-size: 250px;
    overflow: hidden;
}

.card-container {

    width: 200px;
    height: 200px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
}

.text-hover-field:hover {
    color: #F2C037;
    transition: all 200ms
}
</style>