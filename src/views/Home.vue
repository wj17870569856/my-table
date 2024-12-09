<template>
  <div>
    <button @click="addProduct">添加数据</button>
    <vxe-table
      :data="displayedData"
      :menu-config="menuConfig"
      :row-config="{isCurrent: true, isHover: true}"
      ref="tableRef"
      @menu-click="handleMenuClick"
      height="320px"
    >
      <vxe-column field="seq" title="序号"></vxe-column>
      <vxe-column field="name" title="商品名称"></vxe-column>
      <vxe-column field="price" title="商品价格"></vxe-column>
      <vxe-column field="category" title="商品分类"></vxe-column>
      <vxe-column field="feature" title="商品特点"></vxe-column>
    </vxe-table>
    <!-- 弹窗组件 -->
    <el-dialog width="300" v-model="dialogVisible" title="模糊查找">
    <!-- 选择查找字段 -->
    <el-select v-model="selectedField" placeholder="请选择查找字段" style="width: 100%;">
      <el-option label="商品名称" value="name"></el-option>
      <el-option label="商品价格" value="price"></el-option>
      <el-option label="商品分类" value="category"></el-option>
      <el-option label="商品特点" value="feature"></el-option>
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
import { ref, computed, nextTick, onBeforeUnmount, onMounted } from 'vue'
import { VxeUI, VxeTableInstance, VxeTableEvents } from 'vxe-table'
import { useProductData } from '../hooks/useData'
import { RowVO } from '../type'
import { addRow, lastRow } from '../constant'



const tableRef = ref<VxeTableInstance<RowVO>>()
// 弹窗和搜索内容
const selectedField = ref("name"); // 默认选择查找商品名称
const dialogVisible = ref(false);
const searchContent = ref("");
const highlightedRow = ref(null); // 当前高亮的行
const foundRows = ref([]); // 存储找到的匹配行
const currentIndex = ref(-1); // 当前匹配的索引


const { products } = useProductData()

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

// 打开查找弹窗
const openSearchDialog = () => {
  dialogVisible.value = true;
};

// 执行模糊查找
const searchTable = () => {
  const keyword = searchContent.value.trim();
  if (!keyword) return;

  // 判断关键字是否包含中文，如果包含中文则不做 toLowerCase
  const isChinese = /[\u4e00-\u9fa5]/.test(keyword); // 使用正则判断是否为中文字符

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
const highlightAndScrollToRow = async (row) => {
  // 使用唯一标识符 (id) 来查找该行的索引
  const rowIndex = displayedData.value.findIndex((r) => r.id === row.id); // 比较 id
  
  if (rowIndex !== -1) {
    // 滚动到该行
    tableRef.value.scrollToRow(displayedData.value[rowIndex]);
    tableRef.value.setCurrentRow(displayedData.value[rowIndex])
  }
};

// 监听键盘事件
const handleKeydown = (event) => {
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

// 点击插入数据菜单时，在该行下面插入新数据
const handleMenuClick = ({ rowIndex }) => {
  products.value.splice(rowIndex + 1, 0, addRow);
};
// 添加商品后高亮
const selectRowEvent = () => {
  const $table = tableRef.value
  if ($table) {
    $table.setCurrentRow(displayedData.value[displayedData.value.length - 1]);
    setTimeout(() => {
      $table.scrollToRow(displayedData.value[displayedData.value.length - 1]);
    }, 500)
  }
}
// 添加商品
const addProduct = () => {
  products.value.push(lastRow);
  selectRowEvent()
}

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
