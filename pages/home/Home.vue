<template>
  <view class="home">
        <!-- logo区域 -->
        <img src="../../static/assets/logo.png" class="home_img">
        <p><span>HS</span>编码查询</p>
          <!-- 搜索区域 -->
          <input  placeholder="请输入商品名称或商品编码" v-model="key" @confirm="inputChange"  class="uni-input">
          </input>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 关键词
        key: '',
        //控制卡片是否显示
        showCard: false,
      }
    },
    methods: {
      // 根据关键词获取数据列表
      getKey() {
        this.$Router.push({
          path: '/pages/table/Table',
          query: {
            key: this.key
          }
        })
      },
      //输入框change事件
      inputChange() {
        this.getKey()
      }
    }
  }
</script>

<style scoped>

  .home {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  

</style>