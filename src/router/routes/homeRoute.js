import { useEditor } from '@/stores/editorStore'

export default {
  path: '/',
  component: () => import('@/layouts/default/DefaultLayout.vue'),
  children: [
    {
      path: '',
      name: 'Home',
      component: () => import('@/pages/home/HomePage.vue'),
      beforeEnter(to) {
        /** 화면에 노출해야 할 소스 코드 데이터 추출 */
        const data = to.query.v

        /** 데이터 없을 경우 */
        if (!data) {
          return true
        }
        /** 데이터 있을 경우 */
        else {
          /** 각 코드 데이터 파싱 */
          try {
            const editor = useEditor()
            const info = JSON.parse(decodeURIComponent(atob(data)))

            editor.html = info.html
            editor.css = info.css
            editor.js = info.js
            editor.tab = info.tab
          }
          /** 데이터 파싱 중 애러 발생 시, 쿼리 초기화 */
          catch (e) {
            return { query: {} }
          }
        }
      },
    },
  ],
}
