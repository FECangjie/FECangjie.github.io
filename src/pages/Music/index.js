/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */

import { React, Page } from 'zola'
import articles from 'data/article'
import LeftMenu from 'modules/leftMenu'
import LeftAction from 'modules/leftAction'
import AsyncComponent from 'modules/AsyncComponent'

const articleList = MY_ARTICLE_DATA
export default class Index extends Page {

  render () {
  	const filePath = this.props.params.splat
  	const path = `/article/${filePath}.md`
    let article = {}
    articles.forEach((item, i) => {
      if (item.path.indexOf(filePath) > 0) {
        article = item
      }
    })
    return (
      <div className="container clearfix">
      <LeftMenu></LeftMenu>
      <LeftAction></LeftAction>
      <div id="main" className="site-main" style={{minHeight: 382}}>
          <div className="site-main-inner">
              <div className="container clearfix">
                  <div id="primary" className="content-area">
                      <div className="primary-inner">
                          <div id="content" className="site-content content-list" role="main">
                          it will back ~
      </div>
  </div>
</div>
</div>
</div>
</div>
</div>
    )
  }
}
