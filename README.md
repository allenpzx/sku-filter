### sku-filter
[![NPM](https://nodei.co/npm/sku-filter.png)](https://nodei.co/npm/sku-filter/)

##### 使用场景: 

商品详情页一般有 `Product => SKUS<Array> => types<Array> `1对n对n的关系

初始化把已有的SKUs渲染出来的时候, 需要遍历嵌套的数据

每次点击直接对原始数据进行过滤操作，也需要遍历嵌套的数据

这些会造成很多不必要的遍历操作

实际上我们后续只会对`types<Array> `的数据进行交互，

选择的条件满足一个SKU的时候根据对应关系把这个SKU找到即可



所以我们在初始化遍历原始数据的时候建立对应关系，后续只操作types, 当选择条件已满，返回符合条件的那个唯一SKU



##### SKU

```json
{
    "id": 106, 
    "name": null, 
    "description": null, 
    "price": {
        "level1": "10", 
        "level2": "5"
    }, 
    "type": {
        "颜色": "红", 
        "大小": "S", 
        "性别": "男"
    }, 
    "image": "default_point_shop_product_sku.jpg", 
    "stock": "99999995", 
    "point_shop_product_id": "3"
}
```



##### Map about Product => SKUS

```json
{
    "code": 1, 
    "data": {
        "id": 3, 
        "min_price": {
            "level1": "10", 
            "level2": "5"
        }, 
        "name": "aa", 
        "description": "bb", 
        "image": "1ac9d492.png", 
        "created_at": "2018-08-10 13:31:25", 
        "updated_at": "2018-10-12 17:01:33", 
        "deleted_at": null, 
        "category_id": "1", 
        "sliders": [
            "d6a4a433.png", 
            "c37daee5.jpg"
        ], 
        "vip_level_slug": "level1", 
        "max_price": {
            "level1": "10", 
            "level2": "5"
        }, 
        "type": [
            "颜色", 
            "大小", 
            "性别"
        ], 
        "is_virtual": true, 
        "used_num": "110", 
        "details": "<p>cc</p>", 
        "limit_num": "0", 
        "partner_shop_id": "58", 
        "is_recommend": true, 
        "category_sort": "0", 
        "all_sort": "0", 
        "recommend_sort": "0", 
        "is_online": true, 
        "is_collected": true, 
        "all_stock": 129999951, 
        "skus": [
            {
                "id": 106, 
                "name": null, 
                "description": null, 
                "price": {
                    "level1": "10", 
                    "level2": "5"
                }, 
                "type": {
                    "颜色": "红", 
                    "大小": "S", 
                    "性别": "男"
                }, 
                "image": "default_point_shop_product_sku.jpg", 
                "stock": "99999995", 
                "point_shop_product_id": "3"
            }, 
            {
                "id": 107, 
                "name": null, 
                "description": null, 
                "price": {
                    "level1": "10", 
                    "level2": "5"
                }, 
                "type": {
                    "颜色": "红", 
                    "大小": "XL", 
                    "性别": "男"
                }, 
                "image": "default_point_shop_product_sku.jpg", 
                "stock": "9999991", 
                "point_shop_product_id": "3"
            }, 
            {
                "id": 108, 
                "name": null, 
                "description": null, 
                "price": {
                    "level1": "10", 
                    "level2": "5"
                }, 
                "type": {
                    "颜色": "绿", 
                    "大小": "XL", 
                    "性别": "女"
                }, 
                "image": "default_point_shop_product_sku.jpg", 
                "stock": "9999966", 
                "point_shop_product_id": "3"
            }, 
            {
                "id": 109, 
                "name": null, 
                "description": null, 
                "price": {
                    "level1": "10", 
                    "level2": "5"
                }, 
                "type": {
                    "颜色": "红", 
                    "大小": "SL", 
                    "性别": "女"
                }, 
                "image": "default_point_shop_product_sku.jpg", 
                "stock": "9999999", 
                "point_shop_product_id": "3"
            }
        ], 
        "partner_shop": {
            "id": 58, 
            "name": "测试品牌1", 
            "created_at": "2018-08-09 10:48:23", 
            "updated_at": "2018-08-09 10:48:23", 
            "support_phone": null, 
            "support_web_link": null, 
            "url_to_some_news": null, 
            "checkbox_text_en": null, 
            "checkbox_text_cn": null, 
            "lunch_website_button_text": null, 
            "support_details": null, 
            "logo_image": "9b2b75f6.png", 
            "description": "测试品牌1简介", 
            "detail": "测试品牌1详情", 
            "discount": [ ]
        }
    }
}
```



##### 如何使用

###### 安装 `npm install --save sku-filter`

###### 引入 `import SKUFilter from "sku-filter"`



1. 实例化

    ```javascript
    const skus = new SKUFilter({data: skus<Array>});
    ```

2. 初始化数据

   ``` javascript
   const init = skus.initial();
   ```

3. 过滤数据 输入已选条件(sku.types)

    ```javascript
    const result = skus.filter(conditions<Array>); // [{颜色: '红'}]
    ```



```javascript
@param {Array} let skus = new SKUFilter({data: skus}); 必填

@param {Funtion} initial() => {
    skus: skus<Array>, // 所有的sku [{颜色: "红", 大小: "S", 性别: "男"}]
    sku_types: sku_types<Array>, // 所有的sku类型key ["颜色", "大小", "性别"]
    convenient_render<Map> // 方便渲染的格式 {"颜色" => [红, 黑], "大小" => [L, XL], "性别" => [男, 女]}
}

@param {Function} filter(conditions: Array) => {
        selected_types<Array>, // 已选类型 ["颜色", "大小", "性别"]

        selected_detail<String>, // 已选的具体参数 每次点击的时候显示已选的参数 "颜色: 红 "

        match_skus<Array>, // 符合条件的SKU[{颜色: "红", 大小: "XL", 性别: "男"}]

        mismatch_skus<Array>, // 不符合条件的SKU[{颜色: "红", 大小: "XL", 性别: "男"}]

        render_list<Array>, // 比如 [{颜色: "红"}, {大小: "XL"}...]视图更新方便

        final_sku<Object>, // 符合全部已选条件的sku {颜色: "红", 大小: "XL", 性别: "男"} || null

        target<Object>, // 加入购物车或者立即购买需要提交的完整的SKU
            /* {
                     description: null,
                     id: 107,
                     image: "default_point_shop_product_sku.jpg",
                     name: null,
                     point_shop_product_id: "3",  
                     price: {level1: "10", level2: "5"},
                     stock: "9999991",
                     type: {颜色: "红", 大小: "XL", 性别: "男"}
            	}
            */
}


@example 

 1. 初始化SKU

    const skus = new SKUFilter({data: skus<Array>})

 2. 可选三种方法

    1) const init = skus.initial();

    2) const result = skus.filter(conditions<Array>) // [{颜色: '红'}]
                         
```