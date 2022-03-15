
<template name="queryTable">
  <h1>queryTable</h1>
  <el-table :data="tableData1"
            style="width: 100%"
            row-key="id"
            border>
    <el-table-column prop="date"
                     label="Date" />
    <el-table-column prop="name"
                     label="Name" />
  </el-table>
</template>
<script lang="ts" setup>
import request from "@/axios";
onMounted(() => {
  request({
    url: `/wms-ops/rwFrontRecord?qp-recordType-eq=40&pageSize=10&currentPage=1`,
    method: "get",
    isdownload: true,
    converter: ({ data }: any) => {
      console.log(data);
    },
  });
});

const tableData1 = [
  {
    id: 1,
    date: "2016-05-02",
    name: "wangxiaohu",
  },
  {
    id: 2,
    date: "2016-05-04",
    name: "wangxiaohu",
  },
];
</script>
<style>
</style>
