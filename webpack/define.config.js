const fs = require('fs')
const path = require('path')

const ARTCILE_PATH = path.join(__dirname, '..', 'article')
/**
 * 查找所有文件
 * @param  {[type]} filepath [description]
 * @return {[type]}          [description]
 */

const getAllMarkdownFile = function (filePath) {

  function walkFile(filePath, callback) {
    const stat = fs.statSync(filePath)
    let result = []

    if (stat.isDirectory()) {
      const dirs = fs.readdirSync(filePath)
      dirs.forEach(p => {
        const myPath = path.join(filePath, p)
        const pStat = fs.statSync(myPath)
        if (pStat.isDirectory()) {
          result = result.concat(walkFile(myPath))
        } else {
          result.push(myPath)
        }
      })
  } else {
    result.push(filePath)
  }
  console.log(result)


  return result
}

/**
 * 过滤md
 */
const markdownFile = walkFile(filePath).filter(p => {
  return path.extname(p).toLowerCase() === '.md'
})

/**
 * 读取文件属性 默认时间
 */
 const result = markdownFile.map((file) =>{
     const content = fs.readFileSync(file,{
       charset:'utf-8'
     }).toString()

     const defaultDate = new Date()
     const createTimeStr = content.split('\n').find(str =>{
       if(str.indexOf('createTime') >=0){
         return true
       }
       return false
     }) || `:${defaultDate.toLocaleDateString()} ${defaultDate.toLocaleTimeString()}`

     const createTimeArr = createTimeStr.split(':')
     createTimeArr.shift()
     const createTime = createTimeArr.join(":").trim()
     const fileName = path.basename(file,'.md')

     return {
       title:fileName,
       createTime
     }
  })

  /**
   * 按照时间从大到小排序
   */
  return result.sort((a1,a2) =>{
   return a2.createTime - a1.createTime
  })
}

module.exports = function (redskull, env) {
  const list = getAllMarkdownFile(ARTCILE_PATH)
  /*
{
title: '',
cTime: ''
}
   */
  console.log(JSON.stringify(list))
  return {
    MY_ARTICLE_DATA: JSON.stringify(list)
  }
}
