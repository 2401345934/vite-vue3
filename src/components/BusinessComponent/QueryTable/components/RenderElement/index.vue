<template>
  <RenderCompoent></RenderCompoent>
</template>

<script  setup lang='ts'>
import { ElInput, ElSelect, ElDatePicker } from "element-plus";

const RenderCompoent = defineComponent({
  render({ $attrs }) {
    // 接受父组件传递过来的参数
    const {} = $attrs;

    return h(ElInput, {
      placeholder: "",
    });
  },
});
</script>
<style scoped lang='less'>
</style>