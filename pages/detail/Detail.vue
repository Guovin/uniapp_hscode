<template>
  <view class="detail">
	  <!-- logo区域 -->
	  <view class="logo_container">
	  	<span class="logo" @click="goHome">
	  	<span class="hs">HSCode</span>搜索
	  	</span>
	  </view>
	    <!-- 搜索区域 -->
          <!-- <input  placeholder="搜索" placeholder-class="iconfont iconsousuo" v-model="key" @confirm="inputChange"  class="uni-input" type="text" confirm-type="search">
          </input> -->
		  <u-search margin="60px auto 15px auto"
		   :show-action="true" v-model="key" action-text="搜索" @search="inputChange" 
		   @custom="inputChange" :action-style="actionStyle" :animation="true"></u-search>
		  
	  <!-- 卡片视图区 -->
	  <view  v-for="(list,index) in goodList" :key="index">
	  <!-- 商品名称 -->
	  <u-card padding="10" box-shadow="true" border title="商品名称" sub-title="点击卡片复制名称" title-color="#6E6E6E" title-size="25"
	   sub-title-color="#2b85e4" sub-title-size="25" :head-style="headStyle" @click="copyName">
	  		<view class="" slot="body">
	  			<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
	  			<view class="u-body-item-title u-line-2">
						<span style="font-size: 30px;font-weight: bolder;color: #fa3534;"  class="span_block">{{title}}</span>
	  			</view>
	  		</view>
	  		</view>
	  	</u-card>
		<!-- 商品编码 -->
	    <u-card padding="10" box-shadow="true" border title="商品编码" sub-title="点击卡片复制编码" title-color="#6E6E6E" 
		title-size="25" sub-title-color="#2b85e4" sub-title-size="25" :head-style="headStyle" @click="copyHscode(list.hscode)">
	    		<view class="" slot="body">
	  			<view>
	    			<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
	    				<view class="u-body-item-title u-line-2">
						<span style="font-size: 30px;font-weight: bolder;"  class="span_block">{{list.hscode}}</span>
	  				</view>
	    			</view>
	  			</view>
	    		</view>
	    	</u-card>
		<!-- 商品分类 -->
		<u-card padding="10" box-shadow="true" border title="商品分类" sub-title="点击卡片复制分类" title-color="#6E6E6E" 
		title-size="25" sub-title-color="#2b85e4" sub-title-size="25"  :head-style="headStyle" @click="copyCate(list.hscode_name)">
				<view class="" slot="body">
				<view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">
						<span style="font-size: 20px;font-weight: bolder;"  class="span_block">{{list.hscode_name}}</span>
					</view>
					</view>
				</view>
				</view>
			</u-card>
		<!-- 计量单位 -->
		<u-card padding="10" box-shadow="true" border title="计量单位" title-color="#6E6E6E" title-size="25" :head-style="headStyle">
				<view class="" slot="body">
				<view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">
						<view>
						<span style="font-size: 13px;font-weight: bold;color: #606266;">法定计量单位名称</span>
						<span style="font-size: 15px;font-weight: bolder;color: #19be6b;" class="span_right">{{list.unit_1_name}}</span>
						</view>
						<view>
						<span style="font-size: 13px;font-weight: bold;color: #606266;">法定计量单位</span>
						<span style="font-size: 15px;font-weight: bolder;color: #19be6b;" class="span_right">{{list.unit_1}}</span>
						</view>
						<view>
						<span style="font-size: 13px;font-weight: bold;color: #606266;">法定第二计量单位名称</span>
						<span style="font-size: 15px;font-weight: bolder;color: #19be6b;" class="span_right" v-if="list.unit_2_name !== '' ">{{list.unit_2_name}}</span>
						<span style="font-size: 15px;font-weight: bolder;color: #909399;" class="span_right" v-else>无</span>
						</view>
						<view>
						<span style="font-size: 13px;font-weight: bold;color: #606266;">法定第二计量单位</span>
						<span style="font-size: 15px;font-weight: bolder;color: #19be6b;" class="span_right" v-if="list.unit_2 !== '' ">{{list.unit_2}}</span>
						<span style="font-size: 15px;font-weight: bolder;color: #909399;" class="span_right" v-else>无</span>
						</view>
					</view>
					</view>
				</view>
				</view>
			</u-card>
			<!-- 税率信息 -->
			<u-card padding="10" box-shadow="true" border title="税率信息" title-color="#6E6E6E" title-size="25" :head-style="headStyle">
					<view class="" slot="body">
					<view>
						<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
							<view class="u-body-item-title u-line-2">
							<view>
							<span style="font-size: 13px;font-weight: bold;color: #606266;">普通税率</span>
							<span style="font-size: 15px;font-weight: bolder;color: #19be6b;" class="span_right">{{list.ordinary}}</span>
							</view>
							<view>
							<span style="font-size: 13px;font-weight: bold;color: #606266;">优惠税率</span>
							<span style="font-size: 15px;font-weight: bolder;color: #19be6b;" class="span_right">{{list.most_discount}}</span>
							</view>
							<view>
							<span style="font-size: 13px;font-weight: bold;color: #606266;">出口税率</span>
							<span style="font-size: 15px;font-weight: bolder;color: #19be6b;" class="span_right">{{list.export_rate}}</span>
							</view>
							<view>
							<span style="font-size: 13px;font-weight: bold;color: #606266;">出口退税率</span>
							<span style="font-size: 15px;font-weight: bolder;color: #19be6b;" class="span_right">{{list.export_retax}}</span>
							</view>
							<view>
							<span style="font-size: 13px;font-weight: bold;color: #606266;">消费税率</span>
							<span style="font-size: 15px;font-weight: bolder;color: #19be6b;" class="span_right">{{list.customs_rate}}</span>
							</view>
							<view>
							<span style="font-size: 13px;font-weight: bold;color: #606266;">增值税率</span>
							<span style="font-size: 15px;font-weight: bolder;color: #19be6b;" class="span_right">{{list.add_tax_rate}}</span>
							</view>
						</view>
						</view>
					</view>
					</view>
				</u-card>
				<!-- 监管条件 -->
				<u-card padding="10" box-shadow="true" border title="监管条件" :sub-title="list.regulatory_code" title-color="#6E6E6E" title-size="25" :head-style="headStyle">
						<view class="" slot="body">
						<view>
							<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">
								<span style="font-size: 15px;color: #909399;" v-if="list.regulatory_code === '' ">暂无</span>
								<view v-else v-for="(code,c) in codeName" :key="c">
								<span style="font-size: 15px;font-weight: bolder;">{{code}}</span>
								<span style="font-size: 15px;font-weight: bold;color: #606266;" class="span_right">{{codeDetail[c]}}</span>
								</view>
							</view>
							</view>
						</view>
						</view>
					</u-card>
					<!-- 检验检疫类别 -->
					<u-card padding="10" box-shadow="true" border title="检验检疫类别" :sub-title="list.ciq_code" title-color="#6E6E6E" title-size="25" :head-style="headStyle">
							<view class="" slot="body">
							<view>
								<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
									<view class="u-body-item-title u-line-2">
									<span style="font-size: 15px;color: #909399;" v-if="list.ciq_code === '' ">暂无</span>
									<view v-else v-for="(ciq,q) in ciqName" :key="q">
									<span style="font-size: 15px;font-weight: bolder;">{{ciq}}</span>
									<span style="font-size: 15px;font-weight: bold;color: #606266;" class="span_right">{{ciqDetail[q]}}</span>
									</view>
								</view>
								</view>
							</view>
							</view>
						</u-card>
					<!-- 申报条件 -->
					<u-card padding="10" box-shadow="true" border title="申报要素" title-color="#6E6E6E" title-size="25" :head-style="headStyle">
							<view class="" slot="body">
							<view>
								<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
									<view class="u-body-item-title u-line-2">
										<span style="font-size: 15px;color: #909399;" v-if="list.element_require === '' ">暂无</span>
										<view v-else v-for="(item,i) in elementList" :key="i">
											<u-row>
												<u-col span="1"><span style="font-size: 15px;color: #909399;">{{i}}</span></u-col>
												<u-col span="11"><span style="font-size: 15px;font-weight: bold;color: #606266;" class="element_right">{{item}}</span></u-col>
											</u-row>
										</view>
									</view>
								</view>
								</view>
							</view>
							</u-card>
			</view>
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
        // 商品详情数据列表
        goodList: [],
		//卡片头部样式
		headStyle:{
			'font-weight':'500'
		},
		title:'',
		hscode:'',
		cate:'',
		//申报要素列表
		elementList:[],
		//搜索确认按钮样式
		actionStyle:{
			'background-color':'white',
			'border-radius': '8px',
			'font-size':'15px',
			'font-color':'#3C3E49',
			'height':'25px',
			'line-height':'25px'
		},
		//回到顶部
		scrollTop:0,
		//监管条件名称列表
		codeName:[],
		//监管条件详情列表
		codeDetail:[],
		//检疫条件名称列表
		ciqName:[],
		//检疫条件详情列表
		ciqDetail:[]
      }
    },
	onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
    methods: {
      // 根据hscode获取数据列表
      getListByHsCode() {
		uni.request({
			url:`https://hscode.vip/api/hscode?hscode=${this.$Route.query.hscode}`,
			method:'POST',
			success: (res) => {
					if (res.data.code !== 200) {
					  return this.$refs.uTips.show({
					  				title: res.data.data,
					  				type: 'error',
					  				duration: '2300'
					  			})
					}
					const arr = []
					arr.push(res.data.data.info)
					this.goodList = arr
					this.title = this.$Route.query.title
					// console.log(this.goodList)
					this.codeList()
					this.ciqList()
					this.getElementList(this.goodList)
					this.changeNumber()
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
	  
	  //生成申报要素列表
	  getElementList(){
		  var element
		  this.goodList.forEach(item =>{
			return element = item.element_require
		  })
		  if(element !== null){
			  const list = element.split(";")
			  var newList = []
			  list.forEach(item =>{
			  			 if(item !== ''){
			  			 	newList.push(item.slice(2))
			  			 }
			  })
			  return this.elementList = newList
		  }
	  },
	  
	  //复制名称
	  copyName(){
		  uni.setClipboardData({
		  				data: this.title
		  			})
	  },
	  //复制编码
	  copyHscode(hscode){
		  uni.setClipboardData({
		  				data: hscode
		  			})
	  },
	  //复制分类
	  copyCate(cate){
		  uni.setClipboardData({
		  				data: cate
		  			})
	  },
	  
	  //返回首页
	  goHome(){
	  		  this.$Router.push('/pages/home/Home')
	  },
	  
	  //处理监管与检疫条件列表
	  codeList(){
		  //处理监管条件
		  var codeLists = []
		  this.goodList.forEach(item =>{
		  	  return codeLists = item.regulatory_code_name
		  })
		  if(codeLists !== null){
			  codeLists.forEach(item =>{
				  let name = item.split(':')
				  this.codeName.push(name[0])
				  this.codeDetail.push(name[1])
			  })
		  }
	  },
	  
	  ciqList(){
		  //处理检疫条件
		  var ciqLists = []
		  this.goodList.forEach(item =>{
		  	  return ciqLists = item.ciq_code_name
		  })
		  if(ciqLists !== null){
			  ciqLists.forEach(item =>{
			  			  let name = item.split(':')
			  			  this.ciqName.push(name[0])
			  			  this.ciqDetail.push(name[1])
			  })
			}
	  },
	  
	  //税率单位换算
	  changeNumber(){
		  this.goodList.forEach(item =>{
			  //保留0位小数
			  item.ordinary = (item.ordinary * 100).toFixed(0) + '%'
			  item.most_discount = (item.most_discount * 100).toFixed(0) + '%'
			  item.export_rate = (item.export_rate * 100).toFixed(0) + '%'
			  item.add_tax_rate = (item.add_tax_rate * 100).toFixed(0) + '%'
			  item.customs_rate = (item.customs_rate * 100).toFixed(0) + '%'
		  })
    }
	},
    mounted() {
      this.getListByHsCode()
    },
  }
</script>

<style scoped>
	
.span_right{
	position: absolute;
	right:0;
}

.element_right{
	/* margin-left: 100%; */
	/* padding-left: 0; */
}

.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
		margin:20rpx auto;
	}
</style>