/**
* TODO: 过滤SKU
*
* @param {Array} new skuFilter({data: skus});
*
* @param {Funtion} initial() => {
*    skus: <Array>, // 所有的sku[{颜色: "红", 大小: "S", 性别: "男"}, {颜色: "红", 大小: "XL", 性别: "女"}]
*    sku_types: <Array>, // 所有的sku类型key["颜色", "大小", "性别"]
*    convenient_render: <Map> // 方便渲染的格式{"颜色" => [红, 黑], "大小" => [L, XL], "性别" => [男, 女]}
* }
*
* @param {Function} filter(conditions<Array>) => {
*        selected_types<Array>, // 已选类型 ["颜色", "大小", "性别"]
*        selected_detail<String>, // 已选的具体参数 每次点击的时候显示已选的参数 "颜色: 红 大小: XL "
*        match_skus<Array>, // 符合条件的sku [{颜色: "红", 大小: "XL", 性别: "男"}]
*        mismatch_skus<Array>, // 不符合条件的sku [{颜色: "红", 大小: "XL", 性别: "男"}]
*        render_list<Array>, // 更新视图方便, 符合条件的参数 [{颜色: "红"}, {大小: "XL"}, {性别: "男"}]
*        final_sku<Object>, // 符合全部已选条件的sku {颜色: "红", 大小: "XL", 性别: "男"} || null
*        target<Object>, //  加入购物车或者立即购买 需要提交的完整sku {
*                            description: null,
*                            id: 107,
*                            image: "default_point_shop_product_sku.jpg",
*                            name: null,
*                            point_shop_product_id: "3",
*                            price: {level1: "10", level2: "5"},
*                            stock: "9999991",
*                            type: {颜色: "红", 大小: "XL", 性别: "男"}
*                          }
* }
*
* @example 
* 1. 获得实例
*    const skus = new SKUFilter({data: skus<Array>})
* 2. 格式化数据
*    const skus.initial();
* 3. 输入已选条件, 过滤数据
*    const result = skus.filter(conditions<Array>); [{颜色: '红'}]
*    
* @author PengZiXiu
**/
class SKUFilter {

    constructor(props){
        this.data = props.data.slice();
        this.format_skus = [];
        this.sku_types = [];
        this.convenient_render = null;

        this.conditions = [];
        this.selected_types = [];
        this.selected_detail = ``;
        this.match_skus = [];
        this.mismatch_skus = [];
        this.final_sku = null;

        this.target = null;
    }

    // 初始化数据结构
    initial(){
        const skus = this.data; // 原始数据格式 sku => {id: 123456799, types: [{颜色: 红}, {尺码: XL}]}
        if(skus instanceof Array, skus.length > 0){

            let sku_types = new Set(); // 总的类型Key的数组
            let format_sku = new Set(); // 格式化一遍的sku => {颜色: '红', 大小: 'XL'}
            let m = new Map(); // key为类型 value为类型下的参数，没有重复值方便渲染
            skus.map(x=>{
                let obj = {};
                Object.entries(x.type).map(([k, v])=>{
                    sku_types.add(k);
                    obj[k.toString()] = v.toString();

                    m.get(k) ? m.set(k, m.get(k).add(v)) : m.set(k, new Set([v]));
                })
                format_sku.add(obj);
            });
            this.format_skus = [...format_sku];
            this.sku_types = [...sku_types];
            this.convenient_render = m;
            return {skus: [...format_sku], sku_types: [...sku_types], convenient_render: m}

        }else{
          return false
        }
    }

    // 过滤sku
    filter(conditions){

        let match_skus = []; // 符合条件的sku
        let mismatch_skus = []; // 不符合条件的sku
        let selected_types = []; // 已选的类型
        let selected_detail = ``; // 已选的具体参数
        this.format_skus.map((sku, i)=>{
            let all = conditions.every(condition=>{
                const k = Object.keys(condition)[0];
                i === 0 ? (selected_detail += `${k}: ${condition[k]} `) : null;
                selected_types.includes(k) ? null : selected_types.push(k);
                if(sku[k] === condition[k]){
                    return true
                }
            });
            all ? match_skus.push(sku) : mismatch_skus.push(sku);
        })
        this.selected_types = selected_types;
        this.selected_detail = selected_detail;
        this.match_skus = match_skus;
        this.mismatch_skus = mismatch_skus;


        let render_list = []; // 需要渲染的typs[{颜色: '红'}, {尺码: 'XL'}, ......]
        let m = new Map();
        match_skus.map(sku=>{
            Object.entries(sku).map(([k, v])=>{
                let obj = null;
                if(m.get(k)){
                    if(!m.get(k).has(v)){
                        obj = {};
                        obj[k] = v
                    }
                    m.set(k, m.get(k).add(v));
                }else{
                    m.set(k, new Set([v]));
                    obj = {};
                    obj[k] = v;
                }
                obj ? render_list.push(obj) : null;
            })
        })
        

        let final_sku = null; // 最终符合条件的sku.types
        if(conditions.length === this.sku_types.length && this.match_skus.length === 1){
            let isok = this.sku_types.every(type=>{
                let check = null;
                Object.keys(match_skus[0]).map(_type=>{
                    if(type === _type){
                        check = true
                    }
                })
                return check
            })
            isok ? (final_sku = match_skus[0]) : null;
        }
        this.final_sku = final_sku;

        let target = null; // 根据映射关系找到最终的sku
        if(final_sku){
            target = this.data.find(sku=>{
                let isok = Object.entries(final_sku).every(([k,v])=>{
                if(sku.type[k] === v){
                    return true
                }
                })
                return isok
            })
        }

        return {
            selected_types,
            selected_detail,
            match_skus,
            mismatch_skus,
            render_list,
            final_sku,
            target
        }
    }

}

module.exports = SKUFilter