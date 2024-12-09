import type { RowVO } from './type';

// 增加的一条数据、实际项目中该数据为动态的，暂时写死
export const addRow:RowVO = {
    category:  "小零食",
    feature: "好吃不贵",
    id: `ID-0${Math.random() * 5000}`,
    name: "新插入的商品",
    price: "$101.14"
}

// 往列表最后一条数据、实际项目中该数据为动态的，暂时写死
export const lastRow:RowVO = {
    category:  "水果",
    feature: "又大又红",
    id: `ID-0${Math.random() * 5000}`,
    name: "新增的商品",
    price: "$101.14"
}