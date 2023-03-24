<template name="queryTable">
  <QueryTable ref="tableRef" :state="{ ...state }"></QueryTable>
  <a-modal
    v-model:visible="modalParams.visible"
    v-bind="{ ...modalParams }"
    @ok="modalParams.handleOk"
  >
    <a-form
      ref="formRef"
      name="custom-validation"
      :model="formState"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-item has-feedback label="类别名称" name="name">
        <a-input
          v-model:value="formState.name"
          type="input"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item has-feedback label="排序" name="dispOrder">
        <a-input
          v-model:value="formState.dispOrder"
          type="number"
          autocomplete="off"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import request from '@/axios'
import { ModalConfirm, requiredText } from '@/utils/utils'
import { FormInstance } from 'ant-design-vue'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}
const rules: any = {
  name: [
    requiredText({ message: '类别名称不能为空' }),
    { trigger: 'change', max: 4, message: '文本长度不能大于4位数' },
    { trigger: 'change', min: 2, message: '文本长度不能少于2位数' }
  ]
}
const tableRef: any = ref('')
const formRef: any = ref<FormInstance>()
const formState = reactive<any>({
  name: '',
  dispOrder: ''
})
const modalParams: any = reactive({
  visible: false,
  title: '新建类别',
  handleOk: () => {
    formRef.value.validate().then(() => {
      request({
        url: '/frontend/course/category/saveOrUpdate',
        method: 'post',
        data: formState,
        converter: () => {
          modalParams.visible = false
          tableRef.value.onSubmit()
        }
      })
    })
  }
})

const state: any = reactive({
  request: {
    url: '/frontend/course/getPageList'
  },
  columns: [
    {
      dataIndex: 'categoryName',
      title: '类别'
    },
    {
      dataIndex: 'name',
      title: '名称'
    },
    {
      dataIndex: 'areaName',
      title: '地点'
    },
    {
      dataIndex: 'status',
      title: '状态'
    },
    {
      dataIndex: '11',
      title: '可预约人数'
    },
    {
      dataIndex: '22',
      title: '实际预约人数(截止当前全部)'
    },
    {
      dataIndex: '33',
      title: '取消预约人数(截止当前全部)'
    },
    {
      dataIndex: '44',
      title: '爽约人数(非实时需教练确认)'
    },
    {
      dataIndex: 'operator',
      isOperator: true,
      title: '操作',
      fixed: 'right',
      render: [
        {
          type: 'primary',
          children: '编辑',
          action: (record: any, searchTable: () => void, index) => {
            console.log(record, index, 'listlist')
            // searchTable();
            formState.name = record.name
            formState.dispOrder = record.dispOrder
            formState.id = record.id
            modalParams.title = '编辑类别'
            modalParams.visible = true
          }
        },
        {
          type: 'primary',
          children: '移除',
          action: (record: any, searchTable: () => void) => {
            ModalConfirm().then(() => {
              request({
                url: `/frontend/course/category/remove/${record.id}`,
                successMessage: '移除成功',
                converter() {
                  searchTable()
                }
              })
            })
          }
        }
      ]
    }
  ],

  actionsRight: [
    {
      // 是否开启勾选启用
      // isDisabled: true,
      type: 'primary',
      text: '新建类别',
      // 勾选的数据
      // searchtable  刷新表格的方法
      action: () => {
        // searchTable();
        modalParams.title = '新增类别'
        formState.name = null
        formState.dispOrder = null
        formState.id = null
        modalParams.visible = true
      }
    }
  ],
  fields: [
    {
      name: 'keyword',
      field: {
        type: 'input',
        props: {
          placeholder: '请输入关键字',
          'allow-clear': true
        }
      }
    }
  ]
})
</script>
<style scoped lang="css"></style>
