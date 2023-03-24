<template name="queryTable">
  <a-spin :spinning="loading">
    <!-- search -->
    <div class="search_warp" v-bind="state.formWarp">
      <a-form
        name="queryTableForm"
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 14 }"
        :inline="true"
        ref="formRef"
        :model="formInline"
        class="form"
        v-bind="state.formProps"
      >
        <div class="search_from_warp">
          <a-row class="search_from_left" :gutter="[24, 24]">
            <a-col
              v-for="(field, index) in state.fields"
              :key="index"
              :span="8"
            >
              <a-form-item
                :name="field.name"
                :label="field.label"
                :rules="field.rules || []"
              >
                <a-input
                  v-if="field.field.type === 'input'"
                  v-model:value="formInline[field.name]"
                  @keydown.enter="onSubmit()"
                  v-bind="field.field.props"
                />
                <a-range-picker
                  v-else-if="field.field.type === 'rangepicker'"
                  v-model:value="formInline[field.name]"
                  type="daterange"
                  @keydown.enter="onSubmit()"
                  v-bind="field.field.props"
                />
                <a-select
                  v-else-if="field.field.type === 'select'"
                  v-model:value="formInline[field.name]"
                  @keydown.enter="onSubmit()"
                  v-bind="field.field.props"
                >
                  <template v-if="typeof field.source === 'function'">
                    <a-select-option
                      v-for="(select, i) in field.source()"
                      :key="i"
                      :value="select.value"
                    >
                      {{ select.text }}
                    </a-select-option>
                  </template>
                </a-select>
                <a-checkbox-group
                  v-else-if="field.field.type === 'checkbox'"
                  v-model:value="formInline[field.name]"
                  @keydown.enter="onSubmit()"
                  v-bind="field.field.props"
                >
                  <template v-if="typeof field.source === 'function'">
                    <a-checkbox
                      v-for="(select, i) in field.source()"
                      :key="i"
                      :value="select.value"
                      >{{ select.text }}
                    </a-checkbox>
                  </template>
                </a-checkbox-group>
                <template v-else-if="typeof field.source === 'function'">
                  <a-radio-group
                    v-if="field.field.type === 'radio'"
                    @keydown.enter="onSubmit()"
                    v-model:value="formInline[field.name]"
                    v-bind="field.field.props"
                  >
                    <a-radio
                      v-for="(select, i) in field.source()"
                      :key="i"
                      :value="select.value"
                      >{{ select.text }}
                    </a-radio>
                  </a-radio-group>
                </template>
                <RenderH
                  @keydown.enter="onSubmit()"
                  v-model:value="formInline[field.name]"
                  v-else
                  v-bind="field.field"
                >
                </RenderH>
              </a-form-item>
            </a-col>
          </a-row>
          <div class="search_actions">
            <a-form-item>
              <a-space>
                <a-button
                  type="primary"
                  @click="onSubmit()"
                  v-bind="state.actionSubmitProps"
                  >查询
                </a-button>
                <a-button
                  @click="resetForm(formRef)"
                  v-bind="state.actionCancelProps"
                  >重置</a-button
                >
              </a-space>
            </a-form-item>
          </div>
        </div>
      </a-form>
    </div>

    <!-- actions -->
    <div class="actions_warp" v-bind="state.actionWarp">
      <!-- 左边按钮 -->
      <div class="actions_warp_left">
        <a-space>
          <a-button
            v-for="(btn, index) in state.actions || []"
            :key="index"
            @click="btn.action(selectProps, onSubmit)"
            :disabled="
              btn.isDisabled && selectProps && selectProps.length === 0
            "
            :type="btn.type"
            v-bind="btn.props"
          >
            {{ btn.text }}
          </a-button>
        </a-space>
      </div>
      <!-- 右边按钮 -->

      <div class="actions_warp_right">
        <a-space>
          <a-button
            v-for="(btn, index) in state.actionsRight || []"
            :key="index"
            @click="btn.action(selectProps, onSubmit)"
            :disabled="
              btn.isDisabled && selectProps && selectProps.length === 0
            "
            :type="btn.type"
            v-bind="btn.props"
          >
            {{ btn.text }}
          </a-button>
        </a-space>
      </div>
    </div>

    <!-- table -->
    <div class="table_warp" v-bind="state.tableWarp">
      <a-table
        class="table_content"
        bordered
        :data-source="pages.data"
        :row-class-name="
          (_record, index) => (index % 2 === 1 ? 'table-striped' : '')
        "
        :row-selection="state.type ? rowSelection : false"
        :scroll="{ y: height }"
        :row-key="record => record.id"
        ref="queryTableRef"
        :pagination="false"
        :locale="{
          emptyText: '暂无数据'
        }"
        @resize-column="handleResizeColumn"
        :highlightCurrentRow="true"
        @selection-change="handleSelectionChange"
        v-bind="state.tableProps"
      >
        <template v-for="(item, index) in state.columns" :key="index">
          <!-- 正常列 -->
          <a-table-column
            :dataIndex="item.dataIndex || item.key"
            :title="item.title"
            :fixed="item.fixed"
          >
            <!-- render处理 -->
            <template v-if="item.render" #default="{ text, record, index }">{{
              item.render(text, record, index)
            }}</template>
            <!-- 操作列 -->
            <template v-if="item.isOperator" #default="{ text, record, index }">
              <template v-for="(btn, i) in item.render" :key="i">
                <a-button
                  :type="'text'"
                  :size="'small'"
                  @click.prevent="btn.action(record, onSubmit, index)"
                  >{{ btn.children }}</a-button
                >
              </template>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-pagination
        class="page"
        size="small"
        :total="pages.total"
        show-size-changer
        show-quick-jumper
        :show-total="(total: number) => `共 ${total || 0} 条数据`"
        v-model:current="pages.currentPage"
        v-model:pageSize="pages.pageSize"
        @change="currentChangeAndsizeChange"
        v-bind="state.paginationProps"
      >
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>
  </a-spin>
</template>
<script lang="ts" setup>
import AxiosRequest from '@/axios'
import { queryParams } from '@/utils/utils'
import { FormInstance } from 'ant-design-vue/lib/form/Form'
import { TableProps } from 'ant-design-vue/lib/table/Table'
import { cloneDeep } from 'loadsh'
import qs from 'qs'
// 用于渲染 用户自定义的组件 需要在此组件 维护 map
import RenderH from './components/renderH'

const formRef = ref<any>()
const { state }: any = defineProps({
  state: Object
})

// table height
const height = ref()
onMounted(() => {
  getTableHeight()
  onSubmit()
  window.onresize = () => {
    getTableHeight()
  }
})

// 获取table高度
const getTableHeight = () => {
  height.value =
    document.body.clientHeight -
    (document.querySelector('.search_warp')?.clientHeight || 0) -
    (document.querySelector('.actions_warp')?.clientHeight || 0) -
    350 +
    'px'
}
//  table ref
const queryTableRef = ref('')
// form 表单 属性值
const formInline = reactive({})
//  loading
const loading = ref(false)
//  分页参数 table Source
const pages = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10,
  data: []
})

// 多选数据
const selectProps = ref<any>([])

// 选中事件
const handleSelectionChange = (val: any[]) => {
  selectProps.value = val
}

const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: string[], selectedRows: TableProps[]) => {
    selectProps.value = selectedRows
  },
  type: state.type
}

// 查询事件
const searchTable = (reset?: boolean) => {
  const value = cloneDeep(formInline)
  const { request = {} } = state
  const initParams = request.initParams || {}
  const reqParams = reset
    ? {
        currentPage: pages.currentPage,
        pageSize: pages.pageSize,
        ...initParams
      }
    : {
        currentPage: pages.currentPage,
        pageSize: pages.pageSize,
        ...queryParams(value),
        ...initParams
      }

  AxiosRequest({
    url: request.url + `?${qs.stringify(reqParams)}`,
    isToast: false,
    loading,
    method: request.method || 'get',
    converter: ({ data }: any) => {
      if (request.tableCallBack) {
        request.tableCallBack(data)
      }
      if (data && Array.isArray(data.items)) {
        pages.data = data.items
        pages.total = Number(data.total)
        pages.currentPage = Number(data.page)
        pages.pageSize = Number(data.size)
      }
    }
  })
}

const handleResizeColumn = (w: number, col: any) => {
  col.width = w
}

// form 表单查询
const onSubmit = (flag?: boolean) => {
  formRef.value.validate().then(() => {
    pages.currentPage = 1
    searchTable(flag)
  })
}

// form 表单 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  for (let k in formInline) {
    if (k.indexOf('fullDate') !== -1 || k.indexOf('time') !== -1) {
      formInline[k] = ''
    }
  }
  onSubmit(true)
}

const currentChangeAndsizeChange = (currentPage: number, pageSize: number) => {
  pages.pageSize = pageSize
  pages.currentPage = currentPage
  searchTable()
}

defineExpose({
  onSubmit,
  resetForm
})
</script>
<style scoped lang="less">
.table_warp {
  overflow-x: auto;
  min-height: v-bind('height');

  .table_one {
    background-color: aqua;
  }

  .table_content {
    overflow: auto;
    width: 100%;
  }

  .page {
    display: flex;
    margin-top: 8px;
    margin-right: 8px;
    justify-content: end;

    :deep(.ant-select-selector) {
      width: 100px;
    }
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
  width: 100%;

  .search_from_left {
    flex: 1;
  }
}

.search_actions {
  margin-left: 10px;
}
</style>
