# 数据请求

## 首页 /market/index

- slider
- newsList
- overviewModule(software,hardware,solution) {id,overviewType}
- providerList

## 产品详情页 /market/product

ajax：
- product {productId}
- provider {product[providerId]、isSimple}
- productRecommend {productId、product[providerId]}



## 搜索页 /market/product/search

- productTechnology


## 服务商 /market/provider

ajax：
- provider {state.providerId、isSimple}
- productList {state.providerId、state.pageNo、state.pageSize}

## 服务商入驻注册页 /market/provider/register

