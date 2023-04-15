<template>
  <div class="root-content">
    <el-row>
      <el-col v-for="url in urls" :key="url" :span="12">
        <monitor-item :url="url" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue'
import MonitorItem from '@/components/MonitorItem.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    MonitorItem
  },
  setup() {
    const state = reactive({
      urls: []
    })

    onMounted(() => {
      // TODO 获取设备对应连接地址列表
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.root-content {
  width: 100%;
  height: 100%;
}
</style>
