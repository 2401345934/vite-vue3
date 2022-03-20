
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
                       :loading="loading"
                       @click="onSubmit()">查询</el-button>
            <el-button :loading="loading"
                       @click="resetForm(formRef)">重置</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>

  <!-- actions -->
  <div class="actions_warp">
    <!-- 左边按钮 -->
    <div class="actions_warp_left">
      <el-space>
        <el-button v-for="(btn,index) in state.actions || []"
                   :key="index"
                   @click="btn.action(selectProps,onSubmit)"
                   :disabled="btn.isDisabled && selectProps && selectProps.length === 0"
                   :type="btn.type">{{btn.text}}</el-button>
      </el-space>
    </div>
    <!-- 右边按钮 -->

    <div class="actions_warp_right">
      <el-space>
        <el-button v-for="(btn,index) in state.actionsRight || []"
                   :key="index"
                   @click="btn.action(selectProps,onSubmit)"
                   :disabled="btn.isDisabled && selectProps && selectProps.length === 0"
                   :type="btn.type">{{btn.text}}</el-button>
      </el-space>
    </div>
  </div>
  <!-- table -->
  <div class="table_warp">
    <el-table :data="pages.data"
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
                       @click.prevent="btn.action(scope.row,scope,onSubmit)">
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
const { state }: any = defineProps({
  state: Object,
});

// table height
const height = ref();
onMounted(() => {
  getTableHeight();

  // 初始化加载
  onSubmit();
  window.onresize = () => {
    getTableHeight();
  };
});

// 获取table高度
const getTableHeight = () => {
  height.value =
    document.body.clientHeight -
    (document.querySelector(".search_warp")?.clientHeight || 0) -
    (document.querySelector(".actions_warp")?.clientHeight || 0) -
    200 +
    "px";
};
//  table ref
const queryTableRef = ref("");
// form 表单 属性值
const formInline = reactive({});
//  loading
const loading = ref(false);
//  分页参数 table Source
const pages = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10,
  data: [],
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
        currentPage: pages.currentPage,
        pageSize: pages.pageSize,
        ...initParams,
      }
    : {
        currentPage: pages.currentPage,
        pageSize: pages.pageSize,
        ...queryParams(value),
        ...initParams,
      };

  loading.value = true;
  request({
    url: state.request.url + `?${qs.stringify(reqParams)}`,
    isToast: false,
    method: state.request.method || "get",
    converter: ({ data }: any) => {
      if (state.request.tableCallBack) {
        state.request.tableCallBack(data);
      }
      if (data && Array.isArray(data.items)) {
        pages.data = data.items;
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
</script>
<style scoped lang="less">
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
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
}

.search_from_warp {
  display: flex;
}
.search_actions {
  min-width: 230px;
}
</style>
