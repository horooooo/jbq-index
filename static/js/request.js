import store from '@/store/index'

export default {
    doRequest(method, url, data, header) {
        // 如果data为空
        if (!data) var data = []
        if (!header) var header = {'content-type': 'application/x-www-form-urlencoded'}
        return new Promise((resolve, reject) => {
            uni.request({
                method: method,
                url: 'https://api.jbqjykj.com/api' + url,
                data: data,
                header: header,
                success: function(result) {
                    // resolve调用后，即可传递到调用方使用then或者async+await同步方式进行处理逻辑
					if(result.data.status == 401 || result.data.status == 403){
						uni.showToast({
							title: '登录失败，请重新登录！',
							mask: true,
							icon: 'none'
						})
						uni.reLaunch({
							url: '/pages/login',
						});
					} else {
						resolve(result.data)
					}
                },
                fail: function(e) {
                    console.log('error in...')
                    // reject调用后，即可传递到调用方使用catch或者async+await同步方式进行处理逻辑
                    reject(e)
                },
            })
        })

    },
    
}