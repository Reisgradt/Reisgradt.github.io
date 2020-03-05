<template lang="pug">
#app
  Error(:text='errText')
  router-view
</template>

<script>
import { mapState } from 'vuex';

import Error from './components/Error';

export default {
  name: 'App',
  components: { Error },
  computed: {
    ...mapState(['errText'])
  }
};
</script>

<style lang="sass">
#app
  height: 100%
</style>
