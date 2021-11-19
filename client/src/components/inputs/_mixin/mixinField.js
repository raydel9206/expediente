export default {
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
      default: ''
    },
    dense: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    },
    originalValue: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String
    },
    rules: {
      type: String
    }
  },
  mounted() {
    if (this.originalValue) {
      this.value = this.originalValue
    }
  },
  watch: {
    originalValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.value = newValue
      }
    }
  },
  data() {
    return {
      value: '',
      nameRef: 'refInputField'
    }
  },
  computed: {
    getRules() {
      let rulesField = []
      if (this.required) {
        rulesField = [(val) => {
          return !!val || 'El campo es obligatorio'
        }]
      }

      if(this.min || this.max){
        if(this.min && this.max){
          rulesField.push((val) => {
            return (val >= this.min && val <= this.max) || `El valor debe estar entre ${ this.min } y ${ this.max }.`
          })
        } else{
          if(this.min){
            rulesField.push((val) => {
              return (val >= this.min ) || `El valor debe ser mayor que ${ this.min }.`
            })
          } else{
            if(this.min){
              rulesField.push((val) => {
                return (val >= this.max ) || `El valor debe ser menor que ${ this.max }.`
              })
            }
          }
        }
      }

      if (this.rules) {
        rulesField = rulesField.concat(this.rules)
      }
      return rulesField
    }
  },
  methods: {
    fireEventInput() {
      if (this.freezer && this.originalValue) {
        this.value = this.originalValue
      }
      this.$emit('input', this.value)
    },
    fireEventFilter(val, update) {
      this.$emit('filter', val, update)
    },
    fireEventClick() {
      this.$emit('click', this.value)
    },
    validate() {
      return this.$refs[this.nameRef].validate(this.value)
    },
    cleanField() {
      this.value = ''
    },
    getValue() {
      return this.value
    },
    keyPressEnter() {
      if (this.freezer && this.originalValue) {
        this.value = this.originalValue
      }
      this.$emit('keyPressEnter', this.value)
    },
    setValue(value) {
      this.value = value
      this.fireEventInput()
      this.fireEventFilter()
    }
  }
}
