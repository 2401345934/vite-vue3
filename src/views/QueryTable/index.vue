
<template name="queryTable">
  <!-- search -->
  <div class="search_warp">
    <el-form :inline="true"
             ref="formRef"
             :model="formInline"
             class="form">
      <div class="search_from_warp">
        <el-row>
          <el-col v-for="(field,index) in state.fields"
                  :key="index"
                  :span="6">
            <el-form-item :prop="field.name"
                          :label="field.label"
                          :rules="field.rules || []">
              <el-input v-if="field.field.type === 'input'"
                        v-model="formInline[field.name]"
                        v-bind="field.field.props" />
              <el-date-picker v-if="field.field.type === 'rangepicker'"
                              v-model="formInline[field.name]"
                              type="daterange"
                              :unlink-panels="true"
                              v-bind="field.field.props"
                              range-separator="-" />
              <el-select v-if="field.field.type === 'select'"
                         v-model="formInline[field.name] "
                         v-bind="field.field.props">
                <template v-if=" typeof field.source === 'function'">
                  <el-option v-for="(select,i) in field.source()"
                             :key="i"
                             :label="select.text"
                             :value="select.value" />
                </template>
              </el-select>

              <el-checkbox-group v-if="field.field.type === 'checkbox'"
                                 v-model="formInline[field.name] "
                                 v-bind="field.field.props">
                <template v-if=" typeof field.source === 'function'">
                  <el-checkbox v-for="(select,i) in field.source()"
                               :key="i"
                               :label="select.value"> {{select.text}}</el-checkbox>

                </template>
              </el-checkbox-group>
              <template v-if=" typeof field.source === 'function'">
                <el-radio-group v-if="field.field.type === 'radio'"
                                v-model="formInline[field.name] "
                                v-bind="field.field.props">
                  <el-radio v-for="(select,i) in field.source()"
                            :key="i"
                            :label="select.value">
                    {{select.text}}
                  </el-radio>
                </el-radio-group>
              </template>

            </el-form-item>
          </el-col>
        </el-row>
        <div class="search_actions">
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit()">查询</el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>

  <!-- actions -->
  <div class="actions_warp">
    <el-space>
      <el-button v-for="(btn,index) in state.actions || []"
                 :key="index"
                 @click="btn.action(selectProps,onSubmit)"
                 :disabled="btn.isDisabled && selectProps && selectProps.length === 0"
                 :type="btn.type">{{btn.text}}</el-button>
    </el-space>
  </div>
  <!-- table -->
  <div class="table_warp">
    <el-table :data="state.data"
              v-loading="loading"
              class="table_content"
              :height="height"
              row-key="id"
              ref="queryTableRef"
              :highlightCurrentRow='true'
              @selection-change="handleSelectionChange"
              empty-text="暂无数据"
              border>
      <el-table-column :type="state.type"
                       :v-if="state.type"
                       width="40" />
      <template v-for="(item,index) in state.columns"
                :key="index">

        <el-table-column :prop=" item.dataIndex ||item.key  "
                         :label="item.title"
                         :fixed="item.fixed">
          <template v-if="item.render"
                    #default="scope">
            {{item.render(scope.row,scope.$index,scope)}}
          </template>
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
      </template>

    </el-table>
    <el-pagination class="page"
                   background
                   v-model:currentPage="pages.currentPage"
                   v-model:page-size="pages.pageSize"
                   @size-change="sizeChange"
                   :page-sizes="[10, 20, 30, 40, 50, 100,200,300,400,500]"
                   :hide-on-single-page="false"
                   @current-change="currentChange"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pages.total" />
  </div>

</template>
<script lang="ts" setup>
// @ts-nocheck
import request from "@/axios";
import type { FormInstance } from "element-plus";
import { queryParams } from "@/utils/utils";
import { cloneDeep } from "loadsh";
import qs from "qs";
const formRef = ref<FormInstance>();
onMounted(() => {
  onSubmit();
});
//  table ref
const queryTableRef = ref("");
// form 表单 属性值
const formInline = reactive({});
//  loading
const loading = ref(false);
//  分页参数
const pages = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10,
});
// 多选数据
const selectProps = ref<T>([]);
// 选中事件
const handleSelectionChange = (val: T[]) => {
  selectProps.value = val;
};
// 查询事件
const searchTable = (reset?: boolean) => {
  const value = cloneDeep(formInline);
  const initParams = {
    "qp-recordType-eq": 40,
  };
  const reqParams = reset
    ? {
        ...pages,
        ...initParams,
      }
    : {
        ...pages,
        ...queryParams(value),
        ...initParams,
      };

  loading.value = true;
  request({
    url: `/wms-ops/rwFrontRecord?${qs.stringify(reqParams)}`,
    isToast: false,
    method: "get",
    converter: ({ data }: any) => {
      if (data && Array.isArray(data.items)) {
        state.data = data.items;
        pages.total = Number(data.total);
        pages.currentPage = Number(data.page);
        pages.pageSize = Number(data.size);
      }
    },
    fin: () => {
      loading.value = false;
    },
  });
};
// form 表单查询
const onSubmit = (flag?: boolean) => {
  formRef.value.validate().then(() => {
    pages.currentPage = 1;
    searchTable(flag);
  });
};
// form 表单 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  for (let k in formInline) {
    if (k.indexOf("fullDate") !== -1 || k.indexOf("time") !== -1) {
      formInline[k] = "";
    }
  }
  onSubmit(true);
};

const sizeChange = (page: number) => {
  pages.pageSize = page;
  pages.currentPage = 1;
  searchTable();
};
const currentChange = (page: number) => {
  pages.currentPage = page;
  searchTable();
};

const state: any = reactive({
  data: [],
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
          action: (record: any, object: any) => {
            console.log(record, object, "listlist");
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
      },
    },
  ],
  fields: [
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
const height = ref();

onMounted(() => {
  getTableHeight();
  window.onresize = () => {
    getTableHeight();
  };
});

const getTableHeight = () => {
  height.value =
    document.body.clientHeight -
    (document.querySelector(".search_warp")?.clientHeight || 0) -
    (document.querySelector(".actions_warp")?.clientHeight || 0) -
    200 +
    "px";
};
</script>
<style lang="less">
.table_warp {
  .table_content {
    overflow: auto;
    width: 100%;
  }

  .page {
    display: flex;
    margin-top: 8px;
    margin-right: 8px;
    justify-content: end;
  }
}

.form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.actions_warp {
  margin-bottom: 10px;
}

.search_from_warp {
  display: flex;
}
.search_actions {
  min-width: 200px;
}
</style>
