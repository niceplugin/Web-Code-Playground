import { defineStore } from 'pinia'

export const useEditor = defineStore('editor', {
  state: () => ({
    /** HTML5 코드 */
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

</body>
</html>`,

    /** CSS3 코드 */
    css: '',

    /** Javascript 코드 */
    js: '',

    /**
     * @typedef {number} TabIndex - Editor tab index.
     * @type {0|1|2} - 0: HTML, 1: CSS, 2: JS
     */
    tab: 0,

    /**
     * @type {null|true|false} - null: display-none, true: Saved, false: Saving
     */
    saved: null,
  }),
  actions: {
    /**
     * @function changeTab
     * @param {TabIndex} tabIndex
     */
    changeTab(tabIndex) {
      this.tab = tabIndex
    },
  },
})
