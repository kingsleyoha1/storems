export { default as CartItem } from '../..\\components\\CartItem.vue'
export { default as AdminAddMenu } from '../..\\components\\Admin\\AddMenu.vue'
export { default as AdminMenuItem } from '../..\\components\\Admin\\MenuItem.vue'
export { default as AdminOrderedItems } from '../..\\components\\Admin\\OrderedItems.vue'
export { default as AdminOrderItem } from '../..\\components\\Admin\\OrderItem.vue'
export { default as AdminOrderRef } from '../..\\components\\Admin\\OrderRef.vue'
export { default as CommonCartTabbar } from '../..\\components\\Common\\CartTabbar.vue'
export { default as CommonHeaderLinks } from '../..\\components\\Common\\HeaderLinks.vue'
export { default as FeedbacksFeedbackItem } from '../..\\components\\Feedbacks\\FeedbackItem.vue'
export { default as SkeletonsProductCardSkt } from '../..\\components\\Skeletons\\ProductCardSkt.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
