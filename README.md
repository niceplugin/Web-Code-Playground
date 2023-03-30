# 프로젝트 템플릿

## 전제 조건

- Vite 기반 프로젝트
- Vue3 사용
- Vue-Router 사용
- Pinia 사용
- Tailwind Css 사용

## 파일 구조

```text
/public
/src
  └ /assets

  └ /components - 글로벌 컴포넌트
    └ /{$componentName}
      └ /components - 해당 컴포넌트를 구성하는 하위 컴포넌트
        └ {$componentName}{$Usage}.vue
      └ {$componentName}Store.js - 해당 컴포넌트에서만 사용되는 상태 스토어
      └ {$componentName}.vue
      
  └ /layouts
    └ /{$layoutName}
      └ /components - 해당 레이아웃을 구성하는 하위 컴포넌트
        └ {$layoutName}{$Usage}.vue
      └ {$layoutName}Store.js - 해당 레이아웃에서만 사용되는 상태 스토어
      └ {$layoutName}Layout.vue
      
  └ /pages
    └ /{$pageName}
      └ /components - 해당 페이지를 구성하는 하위 컴포넌트
        └ {$pageName}{$Usage}.vue
      └ {$pageName}Store.js - 해당 페이지에서만 사용되는 상태 스토어
      └ {$pageName}Page.vue
      
  └ /plugins
    └ /${pluginName}
      └ *.*
      └ index.js - 사전 정의되어 export 되어야 하는 플러그인(모듈)
      
  └ /router
    └ /routes
      └ ${routeName}Route.js
      └ index.js - export 될 경로 모음
    └ guards.js - 글로벌 라우터 가드 모음
    └ index.js - export 될 정의된 라우터
    
  └ /stores - 글로벌 상태 스토어
    └ ${storeName}Store.js
    
  └ /utils
    └ ${utilName}Util.js
    
  └ App.vue
  └ main.js
  └ style.css

.browserslistrc
.editorconfig
.eslintrc.js
.gitignore
index.html
package.json
tailwind.config.js
vite.config.js
```

## Webstorm 파일 템플릿 설정

`설정 > 에디터 > 파일 및 코드 템플릿`에서 설정한다.
모든 파일명은 `파스칼 케이스`(PascalCase)로 생성한다.
생성되는 모든 템플릿에는 아래와 같이 옵션이 채크되어 있어야 한다:

- ✅ 스타일에 따라 서식 다시 지정
- ✅ 라이브 템플릿 활성화

### Layout

- 이름: `Vue Layout`
- 확장: `vue`
- 파일이름: `/$NAME.substring(0, 1).toLowerCase()$NAME.substring(1)/${NAME}Layout`
- ```vue
  #set($CAMEL_NAME = $NAME.substring(0, 1).toLowerCase() + $NAME.substring(1))
  #set($DASH_NAME = $CAMEL_NAME.replaceAll("([a-z])([A-Z]+)", "$1-$2").toLowerCase())
  <template>
    <div id="${DASH_NAME}-layout">
      <router-view/>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  ```

### Page

- 이름: `Vue Page`
- 확장: `vue`
- 파일이름: `/$NAME.substring(0, 1).toLowerCase()$NAME.substring(1)/${NAME}Page`
- ```vue
  #set($CAMEL_NAME = $NAME.substring(0, 1).toLowerCase() + $NAME.substring(1))
  #set($DASH_NAME = $CAMEL_NAME.replaceAll("([a-z])([A-Z]+)", "$1-$2").toLowerCase())
  #set($SPACE_NAME = $NAME.replaceAll("([a-z])([A-Z]+)", "$1 $2"))
  <template>
    <div id="${DASH_NAME}-page">
      $SPACE_NAME Page
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  ```

### Component

해당하는 메인 디렉토리에서 생성하며,
`components` 디렉토리가 없으면 디렉토리를 생성하고,
있을 경우에는 파일만 생성된다.

- 이름: `Vue Component`
- 확장: `vue`
- 파일이름: `/components/${NAME}`
- ```vue
  #set($CAMEL_NAME = $NAME.substring(0, 1).toLowerCase() + $NAME.substring(1))
  #set($DASH_NAME = $CAMEL_NAME.replaceAll("([a-z])([A-Z]+)", "$1-$2").toLowerCase())
  #set($SPACE_NAME = $NAME.replaceAll("([a-z])([A-Z]+)", "$1 $2"))
  <template>
    <div class="${DASH_NAME}">
      $SPACE_NAME Component
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  ```

### Route

- 이름: `Vue Route`
- 확장: `js`
- 파일이름: `$NAME.substring(0, 1).toLowerCase()$NAME.substring(1)Route`
- ```js
  #set($CAMEL_NAME = $NAME.substring(0, 1).toLowerCase() + $NAME.substring(1))
  #set($DASH_NAME = $CAMEL_NAME.replaceAll("([a-z])([A-Z]+)", "$1-$2").toLowerCase())
  export default {
    path: '/${DASH_NAME}',
    component: () => import('@/layouts/__path__'),
    children: [
      {
        path: '',
        name: '${NAME}',
        component: () => import('@/pages/${CAMEL_NAME}/${NAME}Page.vue'),
      },
    ],
  }
  ```

### Store

- 이름: `Vue Store`
- 확장: `js`
- 파일이름: `$NAME.substring(0, 1).toLowerCase()$NAME.substring(1)Route`
- ```js
  #set($CAMEL_NAME = $NAME.substring(0, 1).toLowerCase() + $NAME.substring(1))
  import { defineStore } from 'pinia'
  
  export const use${NAME} = defineStore('$CAMEL_NAME', {
  state: () => ({
      key: undefined,
    }),
    // getters: {
    //   funcGet(state) {
    //     return state
    //   },
    // },
    // actions: {
    //   funcDo() {
    //   },
    // },
  })
  ```
