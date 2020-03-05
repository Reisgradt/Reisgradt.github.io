<template lang='pug'>
section.err-block(
  :class='{"err-block__open": text.length > 0}'
) {{ text }}
</template>

<script>

export default {
  props: {
    text: String
  }
}
</script>

<style lang='sass' scoped>
.err-block
  position: absolute
  left: 50%
  top: 0
  transform: translate(-50%, -100%)
  transition: 1s

  padding: 5px 10px
  background-color: rgb(236, 22, 22)

  display: none

.err-block__open
  transform: translate(-50%, 0)
  display: block
</style>