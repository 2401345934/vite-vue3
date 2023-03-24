import {
  Input,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Select,
  Textarea,
  Switch
} from 'ant-design-vue'
const tagMap: any = {
  input: Input,
  checkbox: Checkbox,
  checkboxGroup: CheckboxGroup,
  datePicker: DatePicker,
  select: Select,
  textarea: Textarea,
  switch: Switch
}
export default defineComponent({
  render(initProps: any) {
    const { $attrs } = initProps
    const { type, props }: { type: string; props?: any } = $attrs
    const tagStr: string =
      type.indexOf('-') !== -1
        ? type.split('-')[1].toLowerCase()
        : type.toLowerCase()
    return h(tagMap[tagStr], { ...props })
  }
})
