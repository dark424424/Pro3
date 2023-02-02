<template>
  <div id="app">
    <component v-if="canLoadComponent" :is="layout">
      <router-view v-model:layout="layout" />
    </component>
    <div v-else class="q-gutter-md row justify-center items-center window-height	window-width	">
      <q-spinner-cube color="negative" size="8em" />

    </div>
  </div>
</template>

<script>
import { getMe } from "./apis/auth"
import { getAllApplicationIn_User } from "./apis/application"

import { useUserStore } from "./stores/userStore"
export default {
  name: "App",
  data() {
    return {
      canLoadComponent: false,
      layout: 'div', userStore: useUserStore(),
    }
  },
  async created() {
    await this.checkUserExisted();
  },

  methods: {
    async checkUserExisted() {
      const data = await getMe()
      if (data) {
        let { email, _id, info, activity, roleNumber, createdAt, updatedAt, } = data.user;
        this.userStore.setState({ email, _id, info, activity, roleNumber, createdAt, updatedAt })


      } else {
        this.userStore.$reset()
      }
      this.canLoadComponent = true
    }

  }
} 
</script>
<style lang="scss">

</style>
  