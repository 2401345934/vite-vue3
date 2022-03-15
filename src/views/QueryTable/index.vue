
<template name="queryTable">
  <h1>queryTable</h1>
  <el-table :data="state.data"
            style="width: 100%"
            row-key="id"
            border>
    <el-table-column v-for="(item,index) in state.columns"
                     :key="index"
                     :prop="item.key || item.dataIndex"
                     :label="item.title"
                     :fixed="item.fixed" />
  </el-table>
</template>
<script lang="ts" setup>
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
    // {
    //   key: "operator",
    //   title: "操作",
    //   isPermissionColumn: true,
    //   fixed: "right",
    //   render: [
    //     {
    //       type: "link",
    //       props: {
    //         type: "primary",
    //         children: "编辑",
    //       },
    //       code: "WMS_Inside_Bill_Move_edit",
    //       visible: "#{record.recordStatus ==0}",
    //       action: ({ record }: any) => {
    //         props.history.push(
    //           `/warehouseManagement/warehouseMovingManagement/warehouseMoving/edit/${record.id}/edit`
    //         );
    //       },
    //     },
    //   ],
    // },
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
