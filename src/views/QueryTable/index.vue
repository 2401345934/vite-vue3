
<template name="queryTable">
  <el-form :inline="true"
           ref="formRef"
           :model="formInline"
           class="demo-form-inline">
    <el-form-item prop="qp-recordCode-like"
                  label="单据编号">
      <el-input v-model="formInline['qp-recordCode-like']" />
    </el-form-item>
    <el-form-item label="单据日期"
                  name="bbbb">
      <el-date-picker v-model="formInline['qp-createTime-ge*fullDate*qp-createTime-le']"
                      type="daterange"
                      range-separator="-" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="onSubmit">查询</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="state.data"
            style="width: 100%"
            row-key="id"
            :highlightCurrentRow='true'
            empty-text="暂无数据"
            border>
    <el-table-column v-for="(item,index) in state.columns"
                     :key="index"
                     :prop=" item.dataIndex ||item.key  "
                     :label="item.title"
                     :fixed="item.fixed">
      <template v-if="item.isOperator"
                #default="scope">
        <el-button :type=" 'text' "
                   :size=" 'small'"
                   v-for="(btn,i) in item.render"
                   :key="i"
                   @click.prevent="btn.action(scope.row,scope)">
          {{btn.children}}
        </el-button>
      </template>
    </el-table-column>

  </el-table>
</template>
<script lang="ts" setup>
// @ts-nocheck
import request from "@/axios";
import type { FormInstance } from "element-plus";
import { queryParams } from "@/utils/utils";
import qs from "qs";
const formRef = ref<FormInstance>();

// 查询
const onSubmit = () => {
  formRef.value.validate().then(() => {
    console.log(queryParams(formInline), "searchValue");
  });
};
// 重置
const formInline = reactive({});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
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
          action: (record: any, object: any) => {
            console.log(record, object, "listlist");
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
