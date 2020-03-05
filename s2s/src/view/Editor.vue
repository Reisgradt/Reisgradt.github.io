<template lang="pug">
section.editor-block
  .dirs
    List(
      :items='listDir'
    )
  .code
    textarea.content(
      v-model="fileContent"
    )
    button.code-save(
      @click='save'
    ) Save
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import List from '../components/List';

export default {
  components: {
    List
  },
  methods: {
    ...mapMutations(['updateContent']),
    ...mapActions(['saveFile']),
    save() {
      this.saveFile(this.contentPath);
    }
  },
  computed: {
    ...mapState(['listDir', 'content', 'contentPath']),
    fileContent: {
      get() {
        return this.content;
      },
      set(value) {
        return this.updateContent({text: value});
      }
    }
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
  display: flex
  flex-direction: column

  & .content
    margin-bottom: 15px

.content
  resize: none
  width: 100%
  flex-grow: 1

.code-save
  background-color: rgb(64, 46, 228)
  color: #fff
  display: flex
  justify-content: center
  align-items: center
  width: 50px
  height: 25px
  border: none
  cursor: pointer
  flex-shrink: 0
</style>
