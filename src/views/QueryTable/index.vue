
<template name="queryTable">
  <QueryTable :state="{ ...state }"></QueryTable>
</template>
<script lang="ts" setup>
// @ts-nocheck
const state: any = reactive({
  request: {
    url: `/wms-ops/rwFrontRecord`,
    tableCallBack: () => { },
  },
  type: "selection",
  columns: [
    {
      key: "recordCode",
      fixed: "left",

      title: "单据编号",
    },
    // {
    //   key: 'recordType',
    //   title: '单据类型',
    //   render: ({ text }: any) => props.getDictionaryTextByValue('WO00003', text),
    // },
    {
      key: "recordStatus",
      title: "单据状态",
    },
    {
      key: "businessType",
      title: "业务类型",
    },
    {
      key: "recordDate",
      title: "单据日期",
    },
    {
      key: "outWarehouseName",
      title: "移出仓库",
    },
    {
      key: "inWarehouseName",
      title: "移入仓库",
    },
    // {
    //   key: 'sourceRecordName',
    //   title: '来源单据名称',
    // },
    {
      key: "sourceRecordCode",
      title: "来源单据号",
    },
    {
      key: "totalQuality",
      title: "移仓数量",
      render: (record: any, index: number) => {
        return record.totalQuality;
      },
    },
    {
      key: "operator",
      isOperator: true,
      title: "操作",
      fixed: "right",
      render: [
        {
          type: "primary",
          children: "编辑",
          visible: "#{record.recordStatus ==0}",
          action: (record: any, object: any, searchTable: () => void) => {
            console.log(record, object, "listlist");
          },
        },
        {
          type: "primary",
          children: "删除",
          visible: "#{record.recordStatus ==0}",
          action: (record: any, object: any, searchTable: () => void) => {
            console.log(record, object, "listlist");
            searchTable();
          },
        },
      ],
    },
  ],
  actions: [
    {
      // 是否开启勾选启用
      // isDisabled: true,
      type: "primary",
      text: "批量操作",
      // 勾选的数据
      // searchtable  刷新表格的方法
      action: (rows: T[], searchTable: () => void) => {
        searchTable();
        console.log(rows, "rows");
      },
    },
  ],
  actionsRight: [
    {
      // 是否开启勾选启用
      // isDisabled: true,
      type: "primary",
      text: "批量操作",
      // 勾选的数据
      // searchtable  刷新表格的方法
      action: (rows: T[], searchTable: () => void) => {
        searchTable();
      },
    },
  ],
  fields: [
    {
      label: "测试h函数渲染",
      name: "qp-recordCode111-like",
      // rules: [
      //   {
      //     required: true,
      //     message: "单据编号不能为空",
      //     trigger: "blur",
      //   },
      // ],
      renderH: {
        type: "el-input",
      },
      field: {
        type: "input",
        props: {
          placeholder: "请输入",
          clearable: true,
        },
      },
    },
    {
      label: "单据编号",
      name: "qp-recordCode-like",
      // rules: [
      //   {
      //     required: true,
      //     message: "单据编号不能为空",
      //     trigger: "blur",
      //   },
      // ],
      field: {
        type: "input",
        props: {
          placeholder: "请输入",
          clearable: true,
        },
      },
    },
    {
      label: "单据状态",
      name: "qp-recordStatus-eq",
      field: {
        type: "select",
      },
      source: () => [
        {
          text: "已提交",
          value: 0,
        },
      ],
    },
    {
      label: "单据状态2",
      name: "qp-recordStatu2s-eq",
      field: {
        type: "checkbox",
      },
      source: () => [
        {
          text: "已提交",
          value: 0,
        },
        {
          text: "初始化",
          value: 1,
        },
      ],
    },
    {
      label: "单据状态2",
      name: "aaaa",
      field: {
        type: "radio",
      },
      source: () => [
        {
          text: "已提交",
          value: 0,
        },
        {
          text: "初始化",
          value: 1,
        },
      ],
    },
    {
      name: "qp-createTime-ge*fullDate*qp-createTime-le",
      label: "单据日期",
      field: {
        type: "rangepicker",
        props: {
          type: "daterange",
          style: {
            width: "100%",
          },
        },
      },
    },
  ],
});
</script>
<style scoped lang="less">
</style>
