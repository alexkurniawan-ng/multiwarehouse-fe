<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Multiwarehouse App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Welcome <span class="text-bold">{{ fullName }}</span>
        </q-item-label>
        <template v-if="isAdmin">
          <EssentialLink
            v-for="link in adminLinks"
            :key="link.title"
            type="a"
            :to="link.link"
            v-bind="link"
          />
        </template>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          type="a"
          :to="link.link"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const adminsMenu = [
  {
    title: 'Warehouse',
    caption: 'List of warehouse',
    icon: 'chat',
    link: { name: 'PageWarehouseList' }
  },
]

const linksData = [
  {
    title: 'Product',
    caption: 'Browser products',
    icon: 'school',
    link: { name: 'PageProductList' }
  },
  {
    title: 'Cart',
    caption: 'Checkout page',
    icon: 'record_voice_over',
    link: { name: 'PageCart'}
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Profile',
    caption: 'Edit Profile',
    icon: 'public',
    link: { name: 'PageProfile' }
  },
  {
    title: 'Logout',
    caption: 'Logout from App',
    icon: 'code',
    // icon: 'favorite',
    link: { name: 'PageAuthenticationLogout' }
  }
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      adminLinks: adminsMenu,
      isAdmin: false,
      fullName: '',
    }
  },
  mounted() {
    this.isAdmin = localStorage.getItem('roles') !== 'user'
    this.$store.dispatch('authentication/check')
      .then((response) => {
        window.localStorage.setItem('fullName', response.fullName);
        this.fullName = response.fullName;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.$router.push({ name: 'PageAuthenticationLogout' });
          this.NotifyResponseError(err.response, 'data');
        }
        if (err.response.status === 403) {
          this.$router.push({ name: 'PageAuthenticationLogout' });
          this.NotifyResponseErrorWithCaption('Email not found');
        }
        if (err.response.status === 404) {
          this.$router.push({ name: 'PageAuthenticationLogout' });
          this.NotifyResponseError(err.response, 'data');
        }
      });
  }
}
</script>
