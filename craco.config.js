// 自定义 webpack 配置项

// 导入node内置模块path
const path = require('path')

module.exports = {
  // webpack配置
  webpack: {
    // 配置别名：
    alias: {
      // 约定规则：
      // 使用 @ 表示 src文件所在路径
      // __dirname指的是当前文件所在【文件夹】的绝对路径。在这里即 根目录 D:\前端\react\11_learn_\04_react+mobx\react_mobx_project\
      '@': path.resolve(__dirname, 'src')
    }
  }
}