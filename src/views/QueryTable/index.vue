
<template name="queryTable">
  <h1>queryTable</h1>
  <el-table :data="state.data"
            style="width: 100%"
            row-key="id"
            highlightCurrentRow="true"
            :empty-text="emptyText || '暂无数据'"
            border>
    <el-table-column v-for="(item,index) in state.columns"
                     :key="index"
                     :prop="item.key || item.dataIndex"
                     :label="item.title"
                     :fixed="item.fixed">
      <template v-if="item.isOperator"
                #default="scope">
        <el-button :type="btn.size || 'text' "
                   :size="btn.size || 'small'"
                   v-for="(btn,i) in item.render"
                   :key="i"
                   @click.prevent="btn.action(item,index)">
          {{btn.children}}
        </el-button>
      </template>
    </el-table-column>

  </el-table>
</template>
<script lang="ts" setup>
// @ts-nocheck
import request from "@/axios";
const state = reactive({
  data: [],
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
          action: (record: any, index) => {
            console.log(record, index);
          },
        },
      ],
    },
  ],
});
onMounted(() => {
  request({
    url: `/wms-ops/rwFrontRecord?qp-recordType-eq=40&pageSize=10&currentPage=1`,
    method: "get",
    converter: ({ data }: any) => {
      state.data = data.items;
    },
  });
});
</script>
<style>
</style>
