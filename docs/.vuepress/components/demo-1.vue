<template>
  <p class="demo">
    {{ title }}
  </p>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:""
    }
  },
  data () {
    return {
      // msg: 'Hello this is <demo-1>'
    }
  }
}
</script>
<style lang="stylus" scoped>
  .demo
    border 1px solid #F56C6C !important
</style>
