import type { RowVO, ColumnConfig, Option } from './type';

// 随机生成一条插入的数据
export function generateAddItem():RowVO {
    return {
        category:  `小零食_${(Math.random() * 500).toFixed()}`,
        feature: `好吃不贵_${(Math.random() * 500).toFixed()}`,
        id: `ID-0${Math.random() * 5000}`,
        name: `新插入的商品_${(Math.random() * 500).toFixed()}`,
        price: `$${(Math.random() * 500).toFixed(1)}`
    }
}

// 随机生成添加到最后的数据
export function generateLastItem():RowVO {
    return {
        category:  `水果_${(Math.random() * 600).toFixed()}`,
        feature: `又大又红_${(Math.random() * 600).toFixed()}`,
        id: `ID-0${Math.random() * 6000}`,
        name: `新增的商品商品_${(Math.random() * 600).toFixed()}`,
        price: `$${(Math.random() * 600).toFixed(1)}`
    }
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