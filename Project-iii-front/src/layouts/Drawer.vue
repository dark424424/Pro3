<template>
  <q-layout view="hHh Lpr lff" style="min-height: 100vh" >
    <q-header elevated class="bg-dark">
      <q-toolbar class="row no-wrap fit ">
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title class="col-2">
          <router-link to="/">
            <span class="text-white">
              JobService
            </span>
          </router-link>
        </q-toolbar-title>
        <SearchFormVue class="col-10"></SearchFormVue>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500" bordered :mini="miniState"
      @mouseover="miniState = false" @mouseout="miniState = true" class="bg-grey-3">
      <q-list>

        <template v-for="(menuItem, index) in menuList" :key="'something'+index">
          <q-item @click="navigate(menuItem.link)" clickable active-class="text-negative"
            :active="menuItem.name === link" v-ripple>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>

      </q-list>
    </q-drawer>



    <q-page-container >
      <q-page class="q-pb-xl bg-grey-1">

        <slot></slot>
      </q-page>
    </q-page-container>

    <q-footer class="bg-dark text-white ">
      <Footer ></Footer>
    </q-footer>

  </q-layout>

</template>
  
<script >
// import { ref, onMounted } from 'vue'
import SearchFormVue from "@/components/SearchForm.vue"
import { useSearchStore } from "@/stores/searchStore"
import { useUserStore } from "@/stores/userStore"
import { logout } from "@/apis/auth"
import Footer from "./Footer.vue"

export default {
  components: {
    SearchFormVue,
    Footer,
  },
  data() {
    return {
      drawer: false,
      miniState: true,
      menuList: [],
      link: this.$route.name,
      searchStore: useSearchStore(),
      userStore: useUserStore(),
    }
  },
  watch: {
    "$route.name"(newValue, oldValue) {
      // console.log(newValue);
      this.link = newValue;
    },
    "userStore.getUserState._id"(newValue, oldValue) {
        this.setDrawer()
    }

  },
  created() {
    this.setDrawer()

  },
  methods: {
    navigate(link) {
      if (link == 'logout') {
        // logout().then(data => {
        //   if (data) {
            localStorage.removeItem("session")
            this.userStore.$reset();
          // }
        // })
      } else {

        this.$router.push(link)
      }
      // console.log("navigate")
    },
    setDrawer() {
      if (this.userStore.getUserState._id) {
        this.menuList = [
          {
            icon: `img:${this.userStore.getUserState.info.avatar}`,
            label: 'C?? nh??n',
            separator: false,
            link: "/tong-quan-tai-khoan",
            name: "Account Management"
          },
          {
            icon: 'business',
            label: 'H??? s?? c??ng ty',
            separator: false,
            link: "/tong-quan-tai-khoan/cong-ty-cua-toi",
            name: "Profile Company Page"

          },
          {
            icon: 'work',
            label: 'H??? s?? vi???c l??m',
            separator: true,
            link: "/tong-quan-tai-khoan/viec-lam-cua-toi",
            name: "Account My Company"

          },
          {
            icon: 'dashboard',
            label: 'Trang ch???',
            separator: false,
            link: "/",
            name: "Landing Page"

          },
          {
            icon: 'search',
            label: 'Vi???c l??m',
            separator: false,
            link: "/viec-lam?",
            name: "Search Job"

          },
          {
            icon: 'business',
            label: 'C??ng ty',
            separator: true,
            link: "/cong-ty?",
            name: "Search Company"

          },
          {
            icon: 'logout',
            label: '????ng xu???t',
            separator: true,
            link: "logout",
            name: "Logout"

          },
        ]
      } else {
        this.menuList = [
          {
            icon: 'app_registration',
            label: '????ng k??',
            separator: false,
            link: "/dang-ki",
            name: "Sign Up Page"
          },
          {
            icon: 'login',
            label: '????ng nh???p',
            separator: true,
            link: "/dang-nhap",
            name: "Sign In Page"

          },
          {
            icon: 'dashboard',
            label: 'Trang ch???',
            separator: false,
            link: "/",
            name: "Landing Page"

          },
          {
            icon: 'search',
            label: 'Vi???c l??m',
            separator: false,
            link: "/viec-lam?",
            name: "Search Job"

          },
          {
            icon: 'business',
            label: 'C??ng ty',
            separator: true,
            link: "/cong-ty?",
            name: "Search Company"

          },
        ]
      }
    }
  }
}
// // const drawer = ref(false);
// // const miniState = ref(true);
// // const menuList = ref([]);
// // const link = ref()
// // console.log(link)

// // const navigate = () => {
// //   console.log("navigate")
// // }

// onMounted(() => {
//     menuList.value =
// })

</script>
