import mixinBaseComponent from 'src/components/_mixinBaseComponent/mixinBaseComponent'

export default {
  mixins: [mixinBaseComponent],
  props: {
    contentClass: {
      type: String,
      default: ''
    },
    contentStyle: {
      type: String,
      default: ''
    },
    offset: {
      type: Array,
      default: null
    },
    tooltip: {
      type: String,
      default: null
    }
  }
}
