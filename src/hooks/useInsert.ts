import type { Ref } from 'vue';
import type { VxeTableInstance } from 'vxe-table';
import type { RowVO } from '../type';

export function useInsert(
  products: { value: RowVO[] },
  displayedData: { value: RowVO[] },
  addRow: RowVO,
  tableRef: Ref<VxeTableInstance | null>
) {
  // 插入数据菜单点击事件
  const handleMenuClick = ({ rowIndex }: { rowIndex: number }) => {
    // 使用 splice 方法在 rowIndex 的下方插入新数据
    products.value.splice(rowIndex + 1, 0, addRow);

    // 获取插入的行的索引
    const newRowIndex = rowIndex + 1;

    // 确保 tableRef 存在后，再设置当前行
    if (tableRef.value) {
      const table = tableRef.value;
      // 设置当前行
      table.setCurrentRow(displayedData.value[newRowIndex]);
      
      // 滚动到该行
      setTimeout(() => {
        table.scrollToRow(displayedData.value[newRowIndex]);
      }, 200); // 使用 setTimeout 确保滚动操作在 DOM 更新后执行
    }
  };

  return {
    handleMenuClick,
  };
}
