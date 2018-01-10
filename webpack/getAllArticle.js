/**
 * 获取所有markdown文件的数据
 *
 */
const fs = require('fs')
const path = require('path')
import Smd from 'summarize-markdown'

const ARTICLE_PATH = path.join(__dirname, '..', 'article')

const getAllMarkdownFile = function(filePath){
  /*
  1. 挨个查找文件
   */
  function walkFile(filePath){
    const stat = fs.statSync(filePath)
    let result = []
    if(stat.isDirectory()){
      // read dirs
      const dirs = fs.readdirSync(filePath)
      dirs.forEach(p =>{
        const myPath = path.join(filePath,p)
        const pStat = fs.statSync(myPath)
        if(pStat.isDirectory()){
          result = result.concat(walkFile(myPath))
        }else{
          result.push(myPath)
        }
      })
    }else{
      result.push(filePath)
    }
    return result
  }

  /**
   * 2. 过滤markdown文件
   *
   */
  const markdownFile = walkFile(filePath).filter((p)=>{
    const extname = path.extname(p) // .md
    return extname.toLowerCase() == '.md'
  })

   /**
    * 读取所有文件内容，查找文件内容里面标示的创建时间，如果没有，默认为今天
    *
    */
   const result = markdownFile.map((file) =>{
      const content = fs.readFileSync(file,{
        charset:'utf-8'
      }).toString()

      const start = content.indexOf("---");
      const end = content.indexOf("---", start+3) + 3;
      let header = content.substring(start, end),
      obj = {};

      const shortContent = Smd(content.replace(header, "")).substr(0,200)
      header = header.substring(3, header.length - 3);
      const arr = header.split("\n");

      arr.forEach(v => {
        if(!!v.trim()){
          const temp = v.split(":");
          obj[temp[0].trim()] = temp[1].trim();
        }
      })

      const fileName = path.basename(file, '.md');
      const filePath = file.replace(ARTICLE_PATH, '')

      return Object.assign(obj, {
        fileName,
        path: filePath,
        shortContent: `${shortContent}...`
      })
   })

   /**
    * 按照时间从大到小排序
    */
    result.sort((a1, a2) => {
     return a1.createTime > a2.createTime ? 1 : -1
    })
   return result
}


module.exports = function(redskull, env) {

  const list = getAllMarkdownFile(ARTICLE_PATH)

  /*
  [
    {
      title:'',
      createTime:'',
    }
  ]
  */
  return list
}
