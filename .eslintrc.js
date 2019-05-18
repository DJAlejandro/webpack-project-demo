module.exports = {
    "root": true, // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找
    // "extends": 'standard', 
    "extends": [ //指定eslint规范。extends 属性值可以省略包名的前缀 eslint-config-。
	    "standard", //ESLint Config for JavaScript Standard Style
        "plugin:promise/recommended", //plugins 属性值 可以省略包名的前缀 eslint-plugin-。实现JavaScript Promise的最佳实践
        // "plugin:node/recommended" //针对Node.js的其他ESLint规则

    ],
    "plugins": [ //ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装。它插件名称可以省略 eslint-plugin- 前缀。
        "html", // An ESLint plugin to extract and lint scripts from HTML files.
        "standard", //ESlint Rules for the Standard Linter
        "import" //此插件旨在支持ES2015 + 导入/导出语法的linting，并防止错误拼写文件路径和导入名称的问题
    ],
    "parser": "babel-eslint", //ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器；Babel-ESLint - 一个对Babel解析器的包装，使其能够与 ESLint 兼容
    //注意，在使用自定义解析器时，为了让 ESLint 在处理非 ECMAScript 5 特性时正常工作，配置属性 parserOptions 仍然是必须的。解析器会被传入 parserOptions，但是不一定会使用它们来决定功能特性的开关。
    "parserOptions": { //解析器选项，默认情况下，ESLint 支持 ECMAScript 5 语法。你可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持。
        // "ecmaVersion": 6, //指定你想要使用的 ECMAScript 版本，默认设置为3，5（默认）:启用 ES6 语法支持
        "sourceType": "module", // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
        // "ecmaFeatures": { //ecmaFeatures - 这是个对象，表示你想使用的额外的语言特性:
            // "jsx": true //启用 JSX
        // }
    },
    "env": { //一个环境定义了一组预定义的全局变量
      "browser": true, // 开发环境配置表示可以使用浏览器的方法
      // "node": true, // Node.js 全局变量和 Node.js 作用域
      "es6": true //要额外支持新的 ES6 全局变量或类型（比如 Set 等新类型），该选项会自动设置 ecmaVersion 解析器选项为 6
    },
    "rules": { // 重新扩展（或覆盖) extends的规则
      "standard/object-curly-even-spacing": [2, "either"],
      "standard/array-bracket-even-spacing": [2, "either"],
      "standard/computed-property-even-spacing": [2, "even"],
      "standard/no-callback-literal": [2, ["cb", "callback"]],
      "import/first" :2,
      "import/namespace": 2,
      "import/default": 2,
      "import/export": 2,
      "import/exports-last": 2,
      "quotes": [2, "double"],// 字符串必须使用双引号
      "indent": [2, 4], // 缩进4个空格
      "semi":0, // 强制使用一致的分号
      "space-before-function-paren": 0, // 强制函数括号之前的空格的一致性
      "object-curly-spacing":0, // 强制在对象字面量、解构赋值 和 import/export 说明符的花括号中使用一致的空格
      "comma-spacing":0, // 强制在逗号周围使用空格 
    },
    "globals":{ //当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。可以使用注释或在配置文件中定义全局变量
        "document": true,
        "localStorage": true,
        "window": true,
        "jQuery":true,
        $:true
    }
}
