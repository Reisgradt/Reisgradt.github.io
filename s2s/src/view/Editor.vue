<template lang="pug">
section.editor-block
  .dirs
    ul.list
      li.nav-item(
        v-for='(item, i) in listDir'
        :key='"nav" + i'
        :class='{"file": item.isFile, "dir": !item.isFile}'
      ) {{ item.name }}
  .code
</template>

<script>
import { mapState } from 'vuex';

export default {
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
