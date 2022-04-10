
const createVueSetupTemplate = ({
  cssLoader = 'less',
  langType = 'ts'
}) => {
  return (
    `
<template>
<div>{{ title }}</div> 
</template>
<script setup lang='${langType}'>
const title = ref('hello world')
onMounted(() => {
  console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<style scoped lang='${cssLoader}'>
</style>`
  )
}


const createVueTemplate = ({
  cssLoader = 'less',
  langType = 'ts'
}) => {
  return (
    `
<template>
<div>{{ title }}</div> 
</template>
<script lang='${langType}'>
module.exports = {
  data(){
    return {
      title:"hello world"
    }
  }
}
</script>
<style scoped lang='${cssLoader}'>
</style>`
  )
}



const exportsConfig = {
  createVueSetupTemplate,
  createVueTemplate,

}




module.exports = exportsConfig