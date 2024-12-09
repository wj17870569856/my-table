import type { VxeTableInstance } from 'vxe-table';
import type { RowVO } from '../type';

// 定义返回的 hook 类型
export function useAdd(
  products: { value: RowVO[] },
  displayedData: { value: RowVO[] },
  tableRef: { value: VxeTableInstance<RowVO> | null },
  lastRow: RowVO
) {
  // 添加商品后的高亮
  const selectRowEvent = () => {
    const $table = tableRef.value;
    if ($table && displayedData.value.length > 0) {
      const lastIndex = displayedData.value.length - 1;
      const lastItem = displayedData.value[lastIndex];
      $table.setCurrentRow(lastItem);
      setTimeout(() => {
        $table.scrollToRow(lastItem);
      }, 500);
    }
  };

  // 添加商品
  const addProduct = () => {
    products.value.push(lastRow);
    selectRowEvent();  // 添加商品后触发高亮
  };

  return {
    addProduct,
    selectRowEvent,
  };
}
