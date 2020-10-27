<template>
  <view class="detail">
	  <!-- logo区域 -->
	  <img src="../../static/assets/logo.png" class="home_img">
	  <p><span>HS</span>编码查询</p>
	    <!-- 搜索区域 -->
	    <input placeholder="请输入商品名称或商品编码" v-model="key" @confirm="inputChange" class="uni-input">
	    </input>
    <!-- 卡片视图区域 -->
      <!-- 表格区域 -->
     <!-- <u-table> -->
		  <!-- 表头区域 -->
		 <!-- <u-tr class="u-tr">
		  		<u-th class="u-th">商品编号</u-th>
		  		<u-th class="u-th">编号描述</u-th>
		  		<u-th class="u-th">普通税率</u-th>
		  		<u-th class="u-th">优惠税率</u-th>
		  				<u-th class="u-th">出口税率</u-th>
		  				<u-th class="u-th">出口退税率</u-th>
		  				<u-th class="u-th">消费税率</u-th>
						<u-th class="u-th">增值税率</u-th>
		  	</u-tr> -->
		  			<!-- 表格数据区域 -->
		  			<!-- <u-tr class="u-tr" v-for="(info,index) in goodList" :key="index">
		  					<u-td class="u-td">{{info.hscode}}</u-td>
		  					<u-td class="u-td">{{info.hscode_name}}</u-td>
		  					<u-td class="u-td">{{info.ordinary}}</u-td>
		  					<u-td class="u-td">{{info.most_discount}}</u-td>
		  					<u-td class="u-td">{{info.export_rate}}</u-td>
							<u-td class="u-td">{{info.export_retax}}</u-td>
		  					<u-td class="u-td">{{info.customs_rate}}</u-td>
		  					<u-td class="u-td">{{info.add_tax_rate}}</u-td>
		  				</u-tr> -->
        <!-- <el-table-column prop="hscode" label="商品编号">
        </el-table-column>
        <el-table-column prop="hscode_name" label="编号描述">
        </el-table-column>
        <el-table-column prop="ordinary" label="普通税率">
        </el-table-column>
        <el-table-column prop="most_discount" label="优惠税率">
        </el-table-column>
        <el-table-column prop="export_rate" label="出口税率">
        </el-table-column>
        <el-table-column prop="export_retax" label="出口退税率">
        </el-table-column>
        <el-table-column prop="customs_rate" label="消费税率">
        </el-table-column>
        <el-table-column prop="add_tax_rate" label="增值税率">
        </el-table-column>
        <el-table-column prop="unit_1" label="法定计量单位">
        </el-table-column>
        <el-table-column prop="unit_1_name" label="法定计量单位名称">
        </el-table-column>
        <el-table-column prop="unit_2" label="法定第二计量单位">
        </el-table-column>
        <el-table-column prop="unit_2_name" label="法定第二计量单位名称">
        </el-table-column>
        <el-table-column prop="regulatory_code" label="监管代码">
        </el-table-column>
        <el-table-column prop="ciq_code" label="检疫代码">
        </el-table-column>
        <el-table-column prop="element_require" label="申报要素要求">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column> --> 
      <!-- </u-table> -->
	  <!-- 卡片视图区 -->
	    <u-card box-shadow="true" border :title="title">
	    		<view class="" slot="body">
	  			<view v-for="(list,index) in goodList" :key="index">
	    			<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
	    				<view class="u-body-item-title u-line-2">
	  					<span  style="font-size: 16px;color: red;font-weight: 500;">{{list.hscode}}</span>
	  					<span style="font-weight: bolder;font-size: 20px;" class="span_block">{{list.ordinary}}</span>
	  					<span style="font-size:14px;color: #6E6E6E;" class="span_block">出口退税率：<span style="font-weight: 500;">{{list.export_retax}}</span></span>
	  				</view>
	    			</view>
	  			</view>
	    		</view>
	    	</u-card>
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
		//商品名称
		title:''
      }
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
	  }
    },
    mounted() {
      this.getListByHsCode()
    }
  }
</script>

<style scoped>
</style>