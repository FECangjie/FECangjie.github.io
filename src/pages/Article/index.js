/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */

import { React, Page } from 'zola'
// import ArticleMap  from 'data/article'
import ArticleRender from 'modules/ArticleRender'
export default class Index extends Page {

  render () {
  	const filePath = this.props.params.path
  	const path = `/article/${filePath}.md`
    console.log(path)
    return (
      <div>
      	<ArticleRender articlePath={path}/>
      </div>
    )
  }
}
