/*
1. content -> html
2. html -> jsx
3. jsx -> js
 */
const showdown = require('showdown')
module.exports = function(content, map) {
	this.cacheable && this.cacheable()


	const converter = new showdown.Converter()
	converter.setOption('tables', true)

  //1. 把---  ---之间的内容去掉
  var start = content.indexOf("---");
  var end = content.indexOf("---", start + 3) + 3;
  content = content.slice(0, start) + content.slice(end)

	content = converter.makeHtml(content)


	content = `
		import React,{Component} from 'react'
		import ReactHtmlParser from 'react-html-parser'
		export default class extends Component{

			render(){
				return (
					<div>
					{ ReactHtmlParser(${JSON.stringify(content)}) }
					</div>
				)
			}
		}
	`
	this.callback(null, content, map);
}
module.exports.seperable = true;
