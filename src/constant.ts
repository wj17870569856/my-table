import type { RowVO, ColumnConfig, Option } from './type';

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
    id: `ID-0${Math.random() * 6000}`,
    name: "新增的商品",
    price: "$101.14"
}

// 表头数据配置
export const columns: ColumnConfig[] = [
    { field: 'seq', title: '序号' },
    { field: 'name', title: '商品名称' },
    { field: 'price', title: '商品价格' },
    { field: 'category', title: '商品分类' },
    { field: 'feature', title: '商品特点' }
];

// 查找下拉框配置
export const options: Option[] = [
    { label: '商品名称', value: 'name' },
    { label: '商品价格', value: 'price' },
    { label: '商品分类', value: 'category' },
    { label: '商品特点', value: 'feature' }
  ];