<template>
  <el-image class="monitor-item" :src="image || ''" fit="fill" />
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, watch} from 'vue'
import Socket from '@/utils/socket'

export default defineComponent({
  name: 'MonitorItem',
  props: {
    url: {
      default: '',
      type: String
    }
  },
  setup(props, context) {
    const {url} = toRefs(props)
    watch(url, val => {
      if (val !== '') {
        console.log(val)
        try {
          const socket = new Socket(val, msg => {
            state.image = msg.image
            state.imageTime = msg.imageTime
          })
          context.emit('change', socket)
        } catch (e) {
          console.log(e)
        }
      }
    }, {immediate: true})
    const state = reactive({
      image: '',
      imageTime: ''
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.monitor-item {
  width: 100%;
  height: 100%;
}
</style>
