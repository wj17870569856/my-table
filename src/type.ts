import { type Ref } from 'vue';
// 定义 RowVO 类型(行数据类型)
export interface RowVO {
    seq?: number
    id: string
    name: string
    price: string
    category: string
    feature: string
}

// 定义查找返回的类型
export interface UseFindReturn {
    selectedField: Ref<keyof RowVO>; // selectedField 的类型是 RowVO 的字段名
    searchContent: Ref<string>;
    foundRows: Ref<RowVO[]>;
    currentIndex: Ref<number>;
    searchTable: () => void;
    searchNext: () => void;
    highlightAndScrollToRow: (row: RowVO) => void;
}

// 定义列配置的类型
export interface ColumnConfig {
    field: string;
    title: string;
}

// 定义查找下拉选项的类型
export interface Option {
    label: string;
    value: string;
}