<template lang="">
    <div class="" rounded>
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="xs" icon="circle" color="negative" unelevated  flat dense @click="onClick" />
        <q-btn v-else size="xs" :icon="btnProps.icon" color="accent" unelevated  flat dense @click="onClick" />
      </template>
      <q-carousel-slide  v-for="(item, index) in arrayImage" :key="item + 'image-carousel-'+index " :name="index" :img-src="item" />
      </q-carousel>
    </div>
   
  </template>
  
  <script >
  import { ref } from 'vue'
  
  export default {
    name: "CarouselBanner",
    props: {
        arrayImage: Array,
      
    },
    setup (props) {
      // console.log(this.arrayImage)
      return {
        slide: ref(1),
        autoplay: ref(true),
        arrayImage: props.arrayImage,
       
      }
    }
  }
  </script>
  