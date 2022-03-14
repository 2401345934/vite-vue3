
<template name="queryTable">
  <h1>queryTable</h1>

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
</script>
<style>
</style>
