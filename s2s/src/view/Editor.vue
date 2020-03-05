<template lang="pug">
section.editor-block
  .dirs
    List(
      :items='listDir'
    )
  .code
</template>

<script>
import { mapState } from 'vuex';

import List from '../components/List';

export default {
  components: {
    List
  },
  computed: {
    ...mapState(['listDir'])
  }
};
</script>

<style lang="sass" scoped>
.editor-block
  display: flex
  height: 100%
  align-content: stretch

.dirs
  width: 25%
  background-color: rgb(241, 241, 241)
  max-width: 320px

  padding: 15px 10px

.code
  flex-grow: 1
  padding: 10px

</style>
