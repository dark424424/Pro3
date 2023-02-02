<template>
  <div v-if="(arrayJob.length > 0)">
    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated
      control-color="negative" navigation arrows height="400px" class="bg-grey-1">
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="xs" icon="circle" color="negative" unelevated flat dense @click="onClick" />
        <q-btn v-else size="xs" :icon="btnProps.icon" color="accent" unelevated flat dense @click="onClick" />
      </template>

      <q-carousel-slide v-for="(items, index) in arrayJob" :key="'slide' + index" :name="index + 1"
        class="column no-wrap fit ">
        <div class="row justify-start items-center q-gutter-sm ">
          <CardJobDetailVue v-for="(item, index1) in items" :key="'detail' + index1" :isMinimize="true" :isHot="isHot"
            :jobDetail="item"></CardJobDetailVue>
        </div>

      </q-carousel-slide>

    </q-carousel>
  </div>
  <div v-else>
    <div class="row justify-center items-center q-gutter-md">
      <q-card v-for="(item, index) in Array(9)" :key="index" class="q-pa-sm">
        <div class="row">
          <q-skeleton type="rect" width="100px" height="100px"></q-skeleton>
          <div class="q-mx-sm">
            <q-skeleton type="text" height="32px" width="300px"></q-skeleton>
            <q-skeleton type="text" height="32px" width="200px"></q-skeleton>
            <q-skeleton type="text" height="32px" width="200px"></q-skeleton>
          </div>
        </div>

      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CardJobDetailVue from '@/components/CardJobDetail.vue';
export default {
  components: { CardJobDetailVue },
  props: {
    arrayJob: Array,
    isHot: Boolean
  },
  data() {
    // console.log(props.arrayJob);

    return {
      slide: ref(1),
      // arrayJob: this.arrayJob,
      // isHot: this.isHot
    }
  }
}
</script>


<style lang="scss" scoped>

</style>