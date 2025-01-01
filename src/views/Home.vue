<template>
  <div>
    <el-button type="primary" @click="addProduct">添加数据</el-button>
    <!-- 表格 -->
    <vxe-table
      :data="displayedData"
      :menu-config="menuConfig"
      :row-config="{isCurrent: true, isHover: true}"
      ref="tableRef"
      @menu-click="handleMenuClick"
      height="320px"
    >
      <vxe-column
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :title="column.title"
      >
        <template #default="{ row }">
          <span v-html="highlightKeyword(row[column.field])"></span>
        </template>
      </vxe-column>
    </vxe-table>
    <!-- 弹窗组件 -->
    <el-dialog width="300" v-model="dialogVisible" title="模糊查找" @close="clearHighlight" :modal="false" :draggable="true">
    <!-- 选择查找字段 -->
      <el-select v-model="selectedField" placeholder="请选择查找字段" style="width: 100%;">
        <el-option
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <el-input v-model="searchContent" placeholder="输入关键词进行查找"></el-input>
      <template v-slot:footer>
        <el-button type="primary" @click="searchTable">查找</el-button>
        <el-button @click="searchNext">查找下一个</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import type { VxeTableInstance } from 'vxe-table';
import { useProductData } from '../hooks/useData';
import { useAdd } from '../hooks/useAdd';
import { useFind } from '../hooks/useFind';
import { useInsert } from '../hooks/useInsert';
import type { RowVO } from '../type';
import { columns, options } from '../constant'
import { draggable } from 'element-plus/es/components/color-picker/src/utils/draggable.mjs';

// vxe-table 引用
const tableRef = ref<VxeTableInstance<RowVO> | null>(null);
// 弹框是否显示
const dialogVisible = ref(false);
const { products } = useProductData() // 获取数据

// 最后展示的数据
const displayedData = computed(() => {
  return  products.value.map((row, index) => ({
    seq: index + 1, // 生成序号
    ...row
  }));
});

const { addProduct, } = useAdd(products, displayedData, tableRef); // 添加功能

const { handleMenuClick } = useInsert(products, displayedData, tableRef);  // 插入功能

const {
  selectedField,
  searchContent,
  searchTable,
  searchNext,
  highlightKeyword,
  clearHighlight
} = useFind(displayedData, tableRef); // 查找功能

// 菜单配置
const menuConfig = ref({
  body: {
    options: [
      [
        {
          code: 'insert',
          name: '插入数据',
          prefixIcon: 'vxe-icon-copy', // 确保图标类名正确
          visible: true,
          disabled: false,
        }
      ]
    ],
  }
});

// 打开查找弹窗
const openSearchDialog = () => {
  dialogVisible.value = true;
};

// 监听键盘事件
const handleKeydown = (event: { ctrlKey: any; key: string; preventDefault: () => void; }) => { // vxe-table中可能自带快捷键监听，这里暂时自己写一个
  // 检查是否按下了 Ctrl + F
  if (event.ctrlKey && event.key === "f") {
    event.preventDefault(); // 阻止浏览器默认的查找功能
    openSearchDialog(); // 打开查找弹窗
  }

  // 检查是否按下了 Enter 键
  if (event.key === "Enter") {
    openSearchDialog(); // 打开查找弹窗
  }
};

// 在组件挂载时添加事件监听
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

// 在组件卸载时移除事件监听
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
button {
  margin-bottom: 10px;
}
.el-input {
  margin-top: 20px;
}
</style>
