import mixinBaseComponent from 'src/components/_mixinBaseComponent/mixinBaseComponent'

export default {
  mixins: [ mixinBaseComponent ],
  props: {
    label: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    },
    tooltip: {
      type: String,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    outline: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    }
  }
}
