<template name="queryTable">
  <QueryTable ref="tableRef" :state="{ ...state }"></QueryTable>
</template>
<script lang='ts' setup>
import request from '@/axios';
import { ModalConfirm } from '@/utils/utils';

const tableRef: any = ref("")

onMounted(() => {
})

const state: any = reactive({
  request: {
    url: '/frontend/course/category/getPageList',
  },
  columns: [
    {
      dataIndex: "name",
      title: "类别名称"
    },
    {
      dataIndex: "dispOrder",
      title: "排序"
    },
    {
      dataIndex: "operator",
      isOperator: true,
      title: "操作",
      fixed: "right",
      render: [
        {
          type: "primary",
          children: "编辑",
          action: (record: any, searchTable: () => void, index) => {
            console.log(record, index, "listlist");
            searchTable();
          },
        },
        {
          type: "primary",
          children: "移除",
          action: (record: any, searchTable: () => void) => {
            ModalConfirm().then(() => {
              request({
                url: `/frontend/course/category/remove/${record.id}`,
                successMessage: "移除成功",
                converter() {
                  searchTable()
                }
              })
            })
          },
        },
      ],
    },
  ],

  actionsRight: [
    {
      // 是否开启勾选启用
      // isDisabled: true,
      type: "primary",
      text: "新建类别",
      // 勾选的数据
      // searchtable  刷新表格的方法
      action: (rows: any, searchTable: () => void) => {
        searchTable();
      },
    },
  ],
  fields: [
    {
      name: "keyword",
      field: {
        type: "input",
        props: {
          placeholder: "请输入关键字",
          'allow-clear': true,
        },
      },
    },

  ],
});
</script>
<style scoped lang='css'>
</style>
