/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */

import { React, Page } from 'zola'
import './style.less'
import LeftMenu from 'modules/leftMenu'
import LeftAction from 'modules/leftAction'
import articleList from 'data/article'
import AsyncComponent from 'modules/AsyncComponent'
import ArticleRender from 'modules/ArticleRender'

export default class Index extends Page {
  constructor(props) {
    super(props);
    this.state = {

      num: 0,
      pageCount: 1,
    }
  }

  componentWillMount () {
    let me = this
    me.setState({

      num: articleList.length || 0,
      pageCount: 1,
    })
  }

  goPage (type, page) {

  }
  render () {
    return (
      <div className="container clearfix">
      <LeftMenu></LeftMenu>
      <LeftAction></LeftAction>
      <div className="article-list" style={{minHeight: 382}}>
          <div className="content" role="main">
          {
		      	articleList.map((article,index) =>{
		      		return (
                <article key={index} id="post-33" className="post-33 post type-post status-publish format-standard has-post-thumbnail hentry category-delicious category-freelancing category-photography tag-playing tag-shopping item">
                <a href={`#/article${article.path}`} rel="bookmark">
                  <header className="header">
                    <h2 className="entry-title">{article.title}</h2>
                    <div className="entry-meta">
                    <span className="cat-links">{article.author}</span>
                    <span className="sep"></span>
                    <span className="comments-link">{article.createTime}</span>
                    </div>
                  </header>
                  <div className="entry-content">
                    <p>{article.shortContent}</p>
                  </div>
                </a>
                </article>
	      			)
		      	})
		      }
                    <nav role="navigation" id="nav-below" className="paging-navigation pager">
                			<div className="nav-previous">
          							<span className="meta-nav btn disabled" style={{width:100}} onClick={this.goPage('up')}>上一页</span>
                      </div>
      		            <div className="nav-next">
            							<span className="btn disabled" style={{width:100}} onClick={this.goPage('down')}>下一页</span>
            					</div>
                		</nav>
                  </div>
              </div>
          </div>
    )
  }
}
