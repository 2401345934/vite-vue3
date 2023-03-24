<template name="queryTable">
  <QueryTable ref="tableRef" :state="{ ...state }"></QueryTable>
</template>
<script lang="ts" setup>
const tableRef: any = ref('')

onMounted(() => {})

const state: any = reactive({
  request: {
    url: '/wms-ops/rwFrontRecord',
    tableCallBack: () => {}
  },
  type: 'selection',
  columns: [
    {
      dataIndex: 'recordCode',
      fixed: 'left',

      title: '单据编号'
    },
    // {
    //   dataIndex: 'recordType',
    //   title: '单据类型',
    //   render: ({ text }: any) => props.getDictionaryTextByValue('WO00003', text),
    // },
    {
      dataIndex: 'recordStatus',
      title: '单据状态'
    },
    {
      dataIndex: 'businessType',
      title: '业务类型'
    },
    {
      dataIndex: 'recordDate',
      title: '单据日期'
    },
    {
      dataIndex: 'outWarehouseName',
      title: '移出仓库'
    },
    {
      dataIndex: 'inWarehouseName',
      title: '移入仓库'
    },
    // {
    //   dataIndex: 'sourceRecordName',
    //   title: '来源单据名称',
    // },
    {
      dataIndex: 'sourceRecordCode',
      title: '来源单据号'
    },
    {
      dataIndex: 'totalQuality',
      title: '移仓数量',
      render: (text: any, record: any, index: number) => {
        return text
      }
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
            searchTable()
          }
        },
        {
          type: 'primary',
          children: '删除',
          action: (record: any, searchTable: () => void, index) => {
            console.log(record, index, 'listlist')
            searchTable()
          }
        }
      ]
    }
  ],
  actions: [
    {
      // 是否开启勾选启用
      // isDisabled: true,
      type: 'primary',
      text: '批量操作',
      // 勾选的数据
      // searchtable  刷新表格的方法
      action: (rows: [], searchTable: () => void) => {
        searchTable()
        console.log(rows, 'rows')
      }
    }
  ],
  actionsRight: [
    {
      // 是否开启勾选启用
      // isDisabled: true,
      type: 'primary',
      text: '批量操作',
      // 勾选的数据
      // searchtable  刷新表格的方法
      action: (rows: any, searchTable: () => void) => {
        searchTable()
      }
    }
  ],
  fields: [
    {
      label: '测试h函数渲染',
      name: 'qp-recordCode111-like',
      // rules: [
      //   {
      //     required: true,
      //     message: "单据编号不能为空",
      //     trigger: "blur",
      //   },
      // ],
      renderH: {
        type: 'el-input'
      },
      field: {
        type: 'input',
        props: {
          placeholder: '请输入',
          clearable: true
        }
      }
    },
    {
      label: '单据编号',
      name: 'qp-recordCode-like',
      // rules: [
      //   {
      //     required: true,
      //     message: "单据编号不能为空",
      //     trigger: "blur",
      //   },
      // ],
      field: {
        type: 'input',
        props: {
          placeholder: '请输入',
          clearable: true
        }
      }
    },
    {
      label: '单据状态',
      name: 'qp-recordStatus-eq',
      field: {
        type: 'select'
      },
      source: () => [
        {
          text: '已提交',
          value: 0
        }
      ]
    },
    {
      label: '单据状态2',
      name: 'qp-recordStatu2s-eq',
      field: {
        type: 'checkbox'
      },
      source: () => [
        {
          text: '已提交',
          value: 0
        },
        {
          text: '初始化',
          value: 1
        }
      ]
    },
    {
      label: '单据状态2',
      name: 'aaaa',
      field: {
        type: 'radio'
      },
      source: () => [
        {
          text: '已提交',
          value: 0
        },
        {
          text: '初始化',
          value: 1
        }
      ]
    },
    {
      name: 'qp-createTime-ge*fullDate*qp-createTime-le',
      label: '单据日期',
      field: {
        type: 'rangepicker',
        props: {
          type: 'daterange',
          style: {
            width: '100%'
          }
        }
      }
    }
  ]
})
</script>
<style scoped lang="css"></style>
