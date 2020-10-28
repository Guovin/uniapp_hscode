<template>
  <view class="table">
	  <!-- logo区域 -->
	  <img src="../../static/assets/logo.png" class="home_img">

	    <!-- 搜索区域 -->
          <!-- <input  placeholder="搜索" placeholder-class="iconfont iconsousuo" v-model="key" @confirm="inputChange"  class="uni-input" type="text" confirm-type="search">
          </input> -->
			<u-search margin="80px auto 15px auto"
			 :show-action="true" v-model="key" action-text="搜索" @search="inputChange" 
			 @custom="inputChange" :action-style="actionStyle"></u-search>
			 
	<!-- 卡片视图区 -->
	  <u-card box-shadow="true" border  :head-border-bottom="true" :title="title" title-color="#B25756" title-size="25" :head-style="headStyle">
	  		<view class="" slot="body">
				<view v-for="(list,index) in keyList" :key="index">
	  			<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0" @click="showDetail(list.hscode,list.product_name)">
	  				<view class="u-body-item-title u-line-2">
						<!-- 遍历处理高亮搜索词 -->
						<span v-for="(item,i) in keyLists[index]" :key="i">
						<span v-if="item.show == true" style="font-size: 16px;color: red;font-weight: 500;">{{item.str}}</span>
						<span v-else style="font-size: 16px;font-weight: 500;">{{item.str}}</span>
						</span>
						<span style="font-weight: bolder;font-size: 20px;" class="span_block">{{list.hscode}}</span>
						<span style="font-size:14px;color: #6E6E6E;" class="span_block">出口退税率：<span style="font-weight: 500;">{{list.export_retax}}</span></span>
					</view>
					<u-icon name="arrow-right" style="color: #BBBBBB; position: absolute;left: 95%;"></u-icon>
	  			</view>
				</view>
	  		</view>
	  	</u-card>
      
	<!-- 回到顶部 -->
	<u-back-top :scroll-top="scrollTop"></u-back-top>
	<!-- 顶部提示 -->
	<u-top-tips ref="uTips"></u-top-tips>
  </view>
</template>

<script>
  export default {
    data() {
      return {
		// 关键词
		key: '',
        // 关键词搜索列表
        keyList: [],
		//高亮搜索词列表
		keyLists: [],
        //url
        urlKey: '',
		//回到顶部
		scrollTop:0,
		//卡片标题
		title:'只显示前10条信息',
		//卡片头部样式
		headStyle:{
			'text-align':'center',
			'border-bottom': '#DDDDDD solid 2px',
			'padding-left':'34%'
		},
		//搜索确认按钮样式
		actionStyle:{
			'background-color':'white',
			'border-radius': '8px',
			'font-size':'15px',
			'font-weight':'bold'
		}	
	  }
    },
	
	onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
    methods: {
      // 根据关键词获取数据列表
	getListByKey() {
		//判断查询对象
		this.$Route.query.key === this.key ? this.urlKey = this.$Route.query.key : this.urlKey = this.key
		uni.request({
			url:`https://hscode.vip/api/search?keyword=${this.urlKey}`,
			method:'POST',
			success: (res) => {
					if (res.data.code !== 200) {
					  return this.$refs.uTips.show({
					  				title: res.data.data,
					  				type: 'error',
					  				duration: '2300'
					  			})
					}
					this.$refs.uTips.show({
									title: '查询成功',
									type: 'success',
									duration: '2300'
								})
					this.keyList = res.data.data.list
					this.searchQuestion()
			    },
				fail:(res)=>{
					return this.$refs.uTips.show({
									title: "请求失败",
									type: 'error',
									duration: '2300'
								})
				}
		})
      },
      
      // 点击详情跳转
      showDetail(hscode,title) {
        this.$Router.push({
          path: '/pages/detail/Detail',
          query: {
            hscode: hscode,
			title: title
          }
        })
      },

	  //输入框change事件
	  inputChange() {
	    this.getListByKey()
	  },
	  
	  //搜索词高亮
	  searchQuestion() {
					//将商品名称每一个字拆分成一个数组，数组中包含该字str以及是否符合搜索词而显示条件show
	  				let hilight_word = function(key, word) {
	  					//indexof方法的作用：判断是否包含传入参数，返回大于等于0的值表示包含
	  					let idx = word.indexOf(key);
	  					let t = [];
	  					if (idx > -1) {
	  						if (idx == 0) {
	  							t = hilight_word(key, word.substr(key.length));
	  							t.unshift({
	  								show: true,
	  								str: key,
	  							});
	  							return t;
	  						}
	  						if (idx > 0) {
	  							t = hilight_word(key, word.substr(idx));
	  							t.unshift({
	  								show: false,
	  								str: word.substring(0, idx),
	  							});
	  							return t;
	  						}
	  					}
	  					return [{
	  						show: false,
	  						str: word,
	  					}];
	  				};
	  				let searched = [];
	  				let inputs = this.key;
	  				for (let i = 0; i < this.keyList.length; i++) {
	  					var current_word = this.keyList[i].product_name;
	  					if (current_word.indexOf(inputs) > -1) {
	  						searched.push(hilight_word(inputs, current_word))
	  					}
	  				}
	  				this.keyLists = searched;
	  			}

	},
	
    mounted() {
		//输入框内容默认为上一页输入的内容
		this.key = this.$Route.query.key
		this.getListByKey()
    }
  }
</script>

<style scoped>
.u-border-bottom{
	border-bottom: #DDDDDD solid 2px;
}

.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
		margin:15rpx auto;
	}
</style>