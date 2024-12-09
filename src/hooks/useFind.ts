import { ref, type Ref } from 'vue';
import type { VxeTableInstance } from 'vxe-table';
import type { RowVO, UseFindReturn } from '../type';

export function useFind(displayedData: Ref<RowVO[]>, tableRef: Ref<VxeTableInstance | null>): UseFindReturn {
  const selectedField = ref<keyof RowVO>('name');  // 默认选择商品名称
  const searchContent = ref('');
  const foundRows = ref<RowVO[]>([]);
  const currentIndex = ref(-1);

  // 执行模糊查找
  const searchTable = () => {
    const keyword = searchContent.value.trim();
    if (!keyword) return;

    const isChinese = /[\u4e00-\u9fa5]/.test(keyword); // 判断是否包含中文

    // 筛选匹配行，只匹配选择的字段
    foundRows.value = displayedData.value.filter((row) => {
      const value = String(row[selectedField.value]); // 获取要查找的字段值
      const comparisonValue = isChinese ? value : value.toLowerCase(); // 如果是中文不做大小写转换
      const comparisonKeyword = isChinese ? keyword : keyword.toLowerCase(); // 如果是中文不做大小写转换

      return comparisonValue.includes(comparisonKeyword); // 执行模糊查找
    });

    // 如果找到匹配项，则高亮第一项
    if (foundRows.value.length > 0) {
      currentIndex.value = 0;
      highlightAndScrollToRow(foundRows.value[currentIndex.value]);
    }
  };

  // 查找下一个
  const searchNext = () => {
    if (foundRows.value.length === 0) return;

    // 获取下一个索引
    currentIndex.value = (currentIndex.value + 1) % foundRows.value.length;
    highlightAndScrollToRow(foundRows.value[currentIndex.value]);
  };

  // 高亮并滚动到行
  const highlightAndScrollToRow = (row: RowVO) => {
    const rowIndex = displayedData.value.findIndex((r) => r.id === row.id);

    if (rowIndex !== -1 && tableRef.value) {
      // 滚动到该行
      tableRef.value.scrollToRow(displayedData.value[rowIndex]);
      tableRef.value.setCurrentRow(displayedData.value[rowIndex]);
    }
  };

  // 生成带有高亮样式的 HTML
  const highlightKeyword = (text: string): string => {
    const keyword = searchContent.value.trim();
    if (!keyword || typeof text !== 'string') return text;

    const isChinese = /[\u4e00-\u9fa5]/.test(keyword);
    const comparisonKeyword = isChinese ? keyword : keyword.toLowerCase();

    const regex = new RegExp(`(${comparisonKeyword})`, 'gi');
    return text.replace(regex, `<span style="color: red;">$1</span>`);
  };

  // 清除高亮和搜索内容
  const clearHighlight = () => {
    searchContent.value = ''; // 清空搜索内容
    foundRows.value = []; // 清空找到的行
    currentIndex.value = -1; // 重置当前索引
  };

  return {
    selectedField,
    searchContent,
    foundRows,
    currentIndex,
    searchTable,
    searchNext,
    highlightAndScrollToRow,
    highlightKeyword,
    clearHighlight
  };
}

