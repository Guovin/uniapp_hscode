// router/modules/home.js
const home = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/home/Home',
      aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
      name: 'home',
        meta: {
	        title: '首页',
	    },
    },
    {
	    path: '/pages/table/Table',
        name: 'table',
        meta: {
	        title: '搜索结果',
	    },
	},
	{
	    path: '/pages/detail/Detail',
	    name: 'detail',
	    meta: {
	        title: '详情',
	    },
	},
]
export default home