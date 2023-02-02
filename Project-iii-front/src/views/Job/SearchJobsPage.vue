<template >
  <div class="bg-grey-1 ">

    <CarouselBanner :arrayImage="array"></CarouselBanner>
    <div class="row p-container">
      <div class="q-mt-xl full-width row ">

        <div class="col-8 q-pr-md">

          <div v-if="!loading" class="">
            <div class=" row justify-between">
              <div class="q-ml-md">
                <span class="text-subtitle1"><strong>{{ totalResult }}</strong> việc làm phù hợp</span>
              </div>
              <div class=" flex flex-center q-mr-md">
                <q-pagination v-if="totalResult != 0" v-model="current" :max="totalResult / 50 + 1" :max-pages="6"
                  boundary-numbers outline color="negative" active-design="unelevated" active-color="negative"
                  active-text-color="white" />
              </div>
            </div>

            <q-list separator class="fit">
              <q-item dense>
                <q-item-section>

                  <CardJobDetail class="q-my-xs" v-for="(item, index) in searchResult" :key="item.info.name + index"
                    :isMinimize="false" :isHot="false" :jobDetail="item"></CardJobDetail>
                </q-item-section>
              </q-item>
              <div class=" flex flex-center">
                <q-pagination v-model="current" v-if="totalResult != 0" :max="totalResult / 50 + 1" :max-pages="6"
                  boundary-numbers outline color="negative" active-design="unelevated" active-color="negative"
                  active-text-color="white" />
              </div>
            </q-list>

          </div>
          <div v-else class="col q-gutter-sm ">
            <div class="" v-for="(item, index) in Array(20)" :key="'vr-list-' + index">
              <div class="row ">
                <q-skeleton type="rect" width="150px" height="150px"></q-skeleton>
                <div class="q-mx-sm">
                  <q-skeleton type="text" height="32px" width="300px"></q-skeleton>
                  <q-skeleton type="text" height="32px" width="200px"></q-skeleton>
                  <q-skeleton type="text" height="32px" width="200px"></q-skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 q-gutter-xs">
          <div v-for="(item, index) in Array(4)" :key="index">
            <a href="https://www.youtube.com/" target="_blank">
              <q-img  ratio="0.8" fit="fill"
              :src="'https://loremflickr.com/720/1280/advertisement/all?random='+index" />
            </a>
          </div>
            
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { searchJob } from "@/apis/search"
import CardJobDetail from "@/components/CardJobDetail.vue"
import CarouselBanner from "@/components/CarouselBanner.vue"
import { useSearchStore } from "@/stores/searchStore"
import { ref } from 'vue'
import Drawer from "@/layouts/Drawer.vue"


export default {
  components: { CardJobDetail, CarouselBanner },
  data() {
    let searchStore = useSearchStore();
    let searchResult = [];
    let totalResult = 0;
    let array = [
      "https://loremflickr.com/1280/720/banner?lock=23423",
      'https://loremflickr.com/1280/720/banner?lock=55346',
      "https://loremflickr.com/1280/720/banner?lock=12455",
      "https://loremflickr.com/1280/720/banner?lock=75543"
    ]
    return {
      searchStore, searchResult, totalResult, array, current: ref(1), loading: true
    }
  },

  watch: {
    "searchStore.toggle"(newValue) {
      let filterProvince = this.searchStore.filter['info.workingAddress.province'] ? this.searchStore.filter['info.workingAddress.province'] : ""
      let filterTypeJob = this.searchStore.filter['info.type.name'] ? this.searchStore.filter['info.type.name'] : ""
      if (filterTypeJob) {
        filterTypeJob = "--nganh--" + filterTypeJob
      }
      if (filterProvince) {
        filterProvince = "--tai--" + filterProvince
      }
      if (filterProvince || filterTypeJob || this.searchStore.text) {
        this.$router.push(`/viec-lam?q=${this.searchStore.text}${filterProvince}${filterTypeJob}&pageNumber=${this.searchStore.pageNumber}`)
      } else {
        this.$router.push(`/viec-lam?pageNumber=${this.searchStore.pageNumber}`)
      }
      
      this._getSearch({ text: this.searchStore.text, filter: this.searchStore.filter, pageNumber: this.searchStore.pageNumber })
    },
    current(newValue, oldValue) {
      this.searchStore.setPageNumberValue(newValue - 1)
     
      this.searchStore.setToggle()
    }
  },
  created() {

    this.$emit("update:layout", Drawer)
    let pageNumber = this.$route.query.pageNumber;
    if (!pageNumber) {
      pageNumber = 0
    }
    let text = '';
    let filter = {}
    let q = this.$route.query.q;
    if (q) {
      let arr = q.split(/--tai--|--nganh--/)
      text = arr[0];
      let index = 1;
      if (arr[index] && q.includes('--tai--')) {
        let any =  arr[index].split(',')
        filter["info.workingAddress.province"] =any
        this.searchStore.filter['info.workingAddress.province'] = any
        index++;
      }
      
      if (arr[index] && q.includes('--nganh--')) {
        let any =  arr[index].split(',')
        filter["info.type.name"] =  any
        this.searchStore.filter['info.type.name'] =  any

      }
    }
    // console.log(filter)
    // let arrray = q.split("--tai--")
    // console.log(pageNumber,arrray);
    this._getSearch({ text: text, filter: filter, pageNumber: pageNumber })

  },
  methods: {
    _getSearch({ text, filter, pageNumber }) {
      this.loading = true;
      // console.log(pageNumber);
      searchJob({ text, filter, pageNumber, limit: 50 }).then(data => {
        if (data) {
          this.searchResult = data.data
          this.totalResult = data.total;
        }
        // console.log(data);
        this.loading = false;
        // console.log(this.searchResult);
      })
    }
  }
}
</script>
<style lang="scss">
.p-container {}
</style>