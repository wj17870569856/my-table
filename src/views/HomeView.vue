<template>
  <div>
    <button @click="addProduct">添加数据</button>
    <vxe-table
      :data="displayedData"
      :menu-config="menuConfig"
      :row-config="{isCurrent: true, isHover: true}"
      ref="tableRef"
      @menu-click="handleMenuClick"
    >
      <vxe-column field="seq" title="序号"></vxe-column>
      <vxe-column field="name" title="商品名称"></vxe-column>
      <vxe-column field="price" title="商品价格"></vxe-column>
      <vxe-column field="category" title="商品分类"></vxe-column>
      <vxe-column field="feature" title="商品特点"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { VxeUI, VxeTableInstance, VxeTableEvents } from 'vxe-table'
import { useProductData } from '../hooks/useData'

interface RowVO {
  seq?: number
  id: string
  name: string
  price: string
  category: string
  feature: string
}

const tableRef = ref<VxeTableInstance<RowVO>>()



const { products } = useProductData()
console.log('products---', products.value)

const rowData:RowVO = {
  category:  "小零食",
  feature: "好吃不贵",
  id: `ID-0${Math.random() * 5000}`,
  name: "新插入的商品",
  price: "$101.14"
}

const lastRow:RowVO = {
  category:  "水果",
  feature: "又大又红",
  id: `ID-0${Math.random() * 5000}`,
  name: "新增的商品",
  price: "$101.14"
}

// 最后展示的数据
const displayedData = computed(() => {
  return  products.value.map((row, index) => ({
    seq: index + 1, // 生成序号
    ...row
  }));
});

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
      ],
      // 可以添加更多菜单项或子菜单
    ],
  }
});

// 点击插入数据菜单时，在该行下面插入新数据
const handleMenuClick = ({ rowIndex }) => {
  console.log('Menu clicked:', rowIndex);
  products.value.splice(rowIndex + 1, 0, rowData);
};
// 添加商品后高亮
const selectRowEvent = () => {
  const $table = tableRef.value
  if ($table) {
    console.log(displayedData.value.length)
    $table.setCurrentRow(displayedData.value[displayedData.value.length - 1])
  }
}
// 添加商品
const addProduct = () => {
  products.value.push(lastRow);
  selectRowEvent()
  setTimeout(() => {
    scrollToBottom()
  }, 500)
}
// 滚动条滚动到最底部
const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth' // 'smooth' 表示平滑滚动，'auto' 或省略则表示瞬间跳转
  });
}
</script>

<style scoped>
button {
  margin-bottom: 10px;
}
</style>
