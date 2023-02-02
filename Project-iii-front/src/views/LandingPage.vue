<template>
  <div class="bg-grey-1">

    <div class="col">

      <CarouselBannerVue :arrayImage="array"></CarouselBannerVue>
      <q-page padding>
        <h5 class="text-weight-bold">Top công ty nổi bật</h5>
        <div v-if="!loadingTopCompany" class="fit row wrap justify-center">
          <div  v-for="(company, index) in companyTop"
            :key="'top-company-' + index" class="col-2 q-pr-md  ">
            <q-card  non-selectable class="fit my-card hover my-top-company " style="width:100%;">
            <router-link :to="'/cong-ty/' + company.info.name">
              <span class="q-focus-helper"></span>
              <q-card-section  >
                <q-img class="bg-grey-6" fit='fill' loading="lazy" width="100%" :ratio="1" :src="company.info.logo">
                </q-img>
                <div class="q-mt-sm text-weight-bold text-subtitle2 text-center">
                  {{ company.info.name }}
                </div>
              </q-card-section>
            </router-link>
          </q-card>
        </div>
          
        </div>
        <div v-else class="row q-gutter-md">
          <div v-for="(fake, index) in Array(6)" :key="index+ 'fake'" class="col justify-center items-center">
            <q-card class=" col">
              <q-card-section  vertical align="center">

                <q-skeleton type="rect" width="180px" height="120px"></q-skeleton>
                
                <q-skeleton type="text" height="32px" width="100px"></q-skeleton>
                <!-- <q-skeleton type="text" height="32px" width="180px"></q-skeleton> -->
              </q-card-section>
            
            </q-card>
          </div>
        </div>
        <h5 class="text-weight-bold">Việc làm tốt nhất</h5>
        <CarouselJob :key="keyRenderUI" :arrayJob="bestJobs" :isHot="true"></CarouselJob>
        <div id="container-carousel-top-area">
          <h5 class="text-weight-bold">Các ngành nghề trọng điểm</h5>
          <CarouselTopArea></CarouselTopArea>
        </div>
        <section id="banner">
          <router-link to="https://www.facebook.com/?ref=tn_tnmn" target="_blank">
            <q-img fit="cover" loading="lazy" width="100%" height="400px"
              src="https://intphcm.com/data/upload/banner-la-gi.jpg"></q-img>
          </router-link>
        </section>
        <h5 class="text-weight-bold">Việc làm gợi ý</h5>
        <CarouselJob :key="keyRenderUI" :arrayJob="bestJobs" :isHot="false"></CarouselJob>

        <h5 class="">Việc làm nổi bật ngành
          <strong>
            <router-link to="https://www.facebook.com/?ref=tn_tnmn">
              IT- phần mềm
            </router-link>
          </strong>
        </h5>
        <CarouselJob :arrayJob="popularJobs1" :isHot="false" :key="keyRenderUI"></CarouselJob>

        <h5 class="">Việc làm nổi bật ngành <strong>
            <router-link to="https://www.facebook.com/?ref=tn_tnmn">
              Tư vấn
            </router-link>
          </strong> </h5>
        <CarouselJob :arrayJob="popularJobs2" :isHot="false" :key="keyRenderUI"></CarouselJob>
      </q-page>

    </div>
  </div>
</template>

<script >
import CarouselBannerVue from '@/components/CarouselBanner.vue';
import CardJobVue from '@/components/CardJobDetail.vue';
import CarouselJob from '@/components/CarouselJob.vue';
import { ref } from 'vue'
import { JobDetailEx } from "@/example/jobDetailExample"
import CarouselTopArea from "@/components/CarouselTopArea.vue"
import DrawerVue from '@/layouts/Drawer.vue';
import { searchJob, searchCompany } from '@/apis/search';

export default {
  components: { CardJobVue, CarouselBannerVue, CarouselJob, CarouselTopArea },
  data() {
    const array = [
      "https://img.thuthuatphanmem.vn/uploads/2018/10/16/anh-bao-ve-moi-truong-hay-nhat_101321624.jpg",
      'https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-bao-ve-moi-truong.jpg',
      "https://kiemtientuweb.com/ckfinder/userfiles/images/bao-ve-moi-truong/bao-ve-moi-truong-2.jpg",
      "https://upanh123.com/wp-content/uploads/2020/09/hinh-anh-bao-ve-moi-truong4.jpg"
    ]
    const logo = "https://inkythuatso.com/uploads/images/2021/09/logo-techcombank-inkythuatso-10-15-11-46.jpg"
    const companyTop = []
    return {
      array, companyTop, popularJobs1: [], popularJobs2: [], bestJobs: [], keyRenderUI: 0, loadingTopCompany: false,
    }
  },

  created() {

    this.$emit("update:layout", DrawerVue)
    this._getPopularJobs1();
    this._getPopularJobs2()
    this._getBestJobs()
    this._getTopCompany()
  },
  methods: {
    _getTopCompany() {
      this.loadingTopCompany = true
      searchCompany({ keyword: "", pageNumber: 0, limit: 6 }).then(data => {
        if (data) {
          // console.log(data);
          this.companyTop = data.data
        } else {

        }
        this.loadingTopCompany = false
      })
    },
    _getSliceArr(arr) {
      let new_arr = [];
      let from = 0;
      let range = 9;
      while (from < arr.length) {
        new_arr.push(arr.slice(from, from + range))
        from = from + range;
      }
      return new_arr
    },
    _getPopularJobs1() {
      searchJob({
        text: "Kỹ thuật - Công nghệ",
        filter: {
          // "info.type.field": ""
        },
        pageNumber: 0,
        limit: 90,
      }).then(data => {
        this.popularJobs1 = this._getSliceArr(data.data);
        this.keyRenderUI++;
      }
      )
    },
    _getPopularJobs2() {
      searchJob({
        text: "Dịch vụ",
        filter: {
          // "info.type.field": ""
        },
        pageNumber: 0,
        limit: 90,
      }).then(data => {
        this.popularJobs2 = this._getSliceArr(data.data);
        this.keyRenderUI++;
      }
      )
    },
    _getBestJobs() {
      searchJob({
        text: "",
        filter: {},
        pageNumber: 0,
        limit: 90,
      }).then(data => {
        this.bestJobs = this._getSliceArr(data.data);
        this.keyRenderUI++;
      }
      )
    },
  }
}
</script>


<style lang="scss" scoped>
.hover *:hover{
  transition: 200ms all;
  color: $warning
}
.my-top-company:hover {
  border-color: aquamarine;
  border-width: 1px;
}

#container-carousel-top-area {}

#banner {
  margin-top: 40px
}
</style>
