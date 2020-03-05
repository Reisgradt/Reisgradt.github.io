<template lang="pug">
section.init-block
  div.port-input
    //- Label
    label.port-input__label(for='port-val') Enter the local server port:
    div.port-input__group
      //- Input
      input.port-input__input(
        type='number'
        placeholder='Port'
        v-model='userPort'
      )
      //- Btn
      button.port-input__btn(
        @click='connect'
      ) Start
    p 
      | or 
      a(href='assets/server.py' download) download the local server 
      | to get started

    //- Loader
    div.port-input__loader(
      :style='{"display": isConnection ? "block" : "none"}'
    )
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    Error
  },
  data() {
    return {
      isConnection: false
    };
  },
  methods: {
    ...mapMutations(['updatePort', 'updateErr']),
    ...mapActions(['getDirs']),
    connect() {
      this.isConnection = true;

      this.getDirs().then(status => {
        this.isConnection = false;

        if (status) {
          this.updateErr();
          this.$router.push({ name: 'editor' });
        }
      });
    }
  },
  computed: {
    ...mapState(['port']),
    userPort: {
      get() {
        return this.port;
      },
      set(value) {
        this.updatePort(parseInt(value));
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.init-block
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  position: relative

  &:before
    content: ''
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    z-index: -1

    background: url('../assets/img/bg-init.jpg') center / cover no-repeat
    filter: blur(2px)

.port-input
  background-color: #fff
  border-radius: 5px
  padding: 15px 30px
  position: relative
  overflow: hidden

  &__label
    display: block
    font-weight: bold
    font-size: 1.2rem

  &__btn
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

  &__group
    display: flex
    justify-content: space-between

  &__loader
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    background-color: rgba(255, 255, 255, 0.7)

    &:before
      content: ''
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)

      border-radius: 50%
      border: none
      border-left: 2px solid rgb(86, 50, 214)
      width: 40px
      height: 40px

      animation: rotate 1s linear infinite

  & &__label
    margin-bottom: 15px

  & &__group
    margin-bottom: 10px

  &__group &__input
    margin-right: 10px
    flex-grow: 1

@keyframes rotate
  0%
    transform: translate(-50%, -50%) rotate(0deg)
  100%
    transform: translate(-50%, -50%) rotate(360deg)
</style>
