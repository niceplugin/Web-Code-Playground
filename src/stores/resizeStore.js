import { defineStore } from 'pinia'

export const useResize = defineStore('resize', {
  state: () => ({
    leftWidth: 50,
    rightWidth: 50,
    leftHeight: 50,
    rightHeight: 50,
    resizeStart: false,
    touchID: -1,
  }),
  getters: {
    style(state) {
      return `
@media (min-width: 768px) {
  #home-page {
    grid-template-columns: calc(${ state.leftWidth }% - 0.5rem) 1rem calc(${ state.rightWidth }% - 0.5rem);
  }
}
@media (max-width: 767px) {
  #home-page {
    grid-template-rows: calc(${ state.leftHeight }% - 0.5rem) 1rem calc(${ state.rightHeight }% - 0.5rem);
  }
}
`
    },
  },
  actions: {},
})
