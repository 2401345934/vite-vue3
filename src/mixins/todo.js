import { computed, ref } from 'vue'
export default {
  setup() {
    const count = ref(1)
    const plusOne = computed(() => count.value + 1)
    function hello() {
      console.log('hello mixin' + plusOne.value)
    }
    return {
      count,
      plusOne,
      hello
    }
  }
}
