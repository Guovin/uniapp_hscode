<template>
  <view class="home">
        <!-- logo区域 -->
		<view class="logo_container">
			<span class="logo" @click="goHome">
			<span class="hs">HSCode</span>搜索
			</span>
		</view>
          <!-- 搜索区域 -->
          <!-- <input  placeholder="搜索" placeholder-class="iconfont iconsousuo"  v-model="key" @confirm="inputChange"  class="uni-input" type="text" confirm-type="search">
          </input> -->
		  <u-search margin="100px auto 15px auto"
		   :show-action="true" v-model="key" action-text="搜索" @search="inputChange" 
		   @custom="inputChange" :action-style="actionStyle" :animation="true" height="80"></u-search>
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
		//搜索确认按钮样式
		actionStyle:{
			'background-color':'white',
			'border-radius': '8px',
			'font-size':'15px',
			'font-color':'#3C3E49',
			'height':'30px',
			'line-height':'30px'
		}	
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
      },
	  //返回首页
	  goHome(){
		  this.$Router.push('/pages/home/Home')
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