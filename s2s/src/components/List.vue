<template lang="pug">
ul.list
  li.nav-item(
    v-for='(item, i) in items'
    :key='"item" + i'
    :class='{"file": item.isFile, "dir": !item.isFile, "dir-opened": item.isOpen}'
  )
    span.nav-name(
      @click='toggleItem(item)'
    ) {{ item.name }}
    List(
      v-if='item.isOpen'
      :items='item.nested'
      :basePath='`${basePath}${item.name}/`'
    )

</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'List',
  props: {
    items: {
      type: Array,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions(['toggleDir', 'updateContent']),
    toggleItem(item) {
      const path = `${this.basePath}${item.name}`;

      if (item.isFile) {
        this.updateContent(path)
      } else {
        this.toggleDir(path);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.list
  list-style-type: none
  padding-left: 10px

.nav-item
  margin-bottom: 10px
  cursor: pointer

  &:last-child
    margin-bottom: 0

.nav-name
  display: inline-block

  & ~ .list
    margin-top: 10px

.file:before,
.dir:before,
.dir-opened:before
  content: ''
  width: 15px
  height: 15px
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  margin-right: 5px
  display: inline-block


.file:before
  background-image: url('../assets/img/text-file.svg')

.dir:before
  background-image: url('../assets/img/next.svg')
  transition: .3s

.dir-opened:before
  transform: rotate(90deg)
</style>
