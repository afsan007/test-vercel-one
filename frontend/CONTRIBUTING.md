- __CSS__: We use (Next recommended) [styled-jsx](https://github.com/zeit/styled-jsx) 
  library as our css-in-js solution. 
    1. prefer using [classname toggling](https://github.com/zeit/styled-jsx#via-classname-toggling) 
       vs [interpolated dynamic props](https://github.com/zeit/styled-jsx#via-interpolated-dynamic-props)
    2. use [clsx](https://www.npmjs.com/package/clsx) for a better classname toggling experience
    <!-- auto rtl generation and color-mod support will be added in the future -->
    <!-- 4. you can use [`color-mod` function](https://github.com/jonathantneal/postcss-color-mod-function) in your css -->
- __Apollo GraphQL__: if you want to make a GraphQL request please wrap your page's component using 
  [withApollo](./src/lib/apollo/withApollo.ts) HOC.
- The index.ts file pattern should only be used to (collect and) re-export some components in a folder. So you can `import { ObjectField } '../Component'` instead of import ObjectField `'../Component/Object/ObjectField'`.
