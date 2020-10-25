<template>
  <view class="table">
	  <!-- logo区域 -->
	  <img src="../../static/assets/logo.png" class="home_img">
	  <p><span>HS</span>编码查询</p>

	    <!-- 搜索区域 -->
	    <input placeholder="请输入商品名称或商品编码" v-model="key" @confirm="inputChange" class="uni-input">
	    </input>
    <!-- 卡片视图区域 -->
      <!-- 表格区域 -->
      <u-table>
		  <!-- 表头区域 -->
		  <u-tr class="u-tr">
		  		<u-th class="u-th">商品编号</u-th>
		  		<u-th class="u-th">商品名称</u-th>
		  		<u-th class="u-th">计量单位</u-th>
		  		<u-th class="u-th">出口退税率(%)</u-th>
				<u-th class="u-th">监管条件</u-th>
				<u-th class="u-th">检验检疫</u-th>
				<u-th class="u-th">更多信息</u-th>
		  	</u-tr>
			<!-- 表格数据区域 -->
			<u-tr class="u-tr" v-for="(list,index) in keyList" :key="index">
					<u-td class="u-td">{{list.hscode}}</u-td>
					<u-td class="u-td">{{list.product_name}}</u-td>
					<u-td class="u-td">{{list.unit}}</u-td>
					<u-td class="u-td">{{list.export_retax}}</u-td>
					<u-td class="u-td">{{list.supervision_code}}</u-td>
					<u-td class="u-td">{{list.ciq_code}}</u-td>
					<u-td class="u-td"><button @click="showDetail(list.hscode)">详情</button></u-td>
				</u-tr>
      </u-table>
      <!-- 分页功能区域 -->
      
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
        // hscode
        hscode: '',
        // hscode搜索列表
        hscodeList: [],
        //url
        urlKey: '',
		//被点击行的hscode
		rowHscode:'',
		//回到顶部
		scrollTop:0,
		//详情对象的Hscode
		detailHscode:''
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
      showDetail(hscode) {
		this.detailHscode = hscode
        this.$Router.push({
          path: '/pages/detail/Detail',
          query: {
            hscode: this.detailHscode
          }
        })
      },

	  //输入框change事件
	  inputChange() {
	    this.getListByKey()
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
</style>