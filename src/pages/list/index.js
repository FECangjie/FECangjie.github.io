/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */

import { React, Page } from 'zola'
import Tpl from './tpl.rt'
import './style.less'
import LeftMenu from 'modules/leftMenu'
import LeftAction from 'modules/leftAction'
import articles from 'data/article'
import AsyncComponent from 'modules/AsyncComponent'
import ArticleRender from 'modules/ArticleRender'

const articleList = MY_ARTICLE_DATA

export default class Index extends Page {
  componentWillMount () {
    let me = this
    me.setState({
      num: articleList.length || 0,
      page: 1,
      articleList: articleList.slice(0,3)
    })
  }

  goPage (type, page) {
    let me = this

    let state = me.state
    state.articleList = []

    let len = state.num > state.page * 3 ? state.page * 3 : state.num
    if (type === 'up') {
      state.page = (page === 1 ? page : --state.page)
    } else {
      state.page = (state.num > page * 3 ? ++state.page : page )
    }
    for (var i = (page - 1) * 3; i < len; i++) {
      state.articleList.push(articleList[i])
    }
    this.setState({state});
  }
  render () {
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
                          {
                		      	this.state.articleList.map((article,index) =>{
                		      		return (
                                <article key={index} id="post-33" className="post-33 post type-post status-publish format-standard has-post-thumbnail hentry category-delicious category-freelancing category-photography tag-playing tag-shopping">
                                    <header className="entry-header">
                                        <h2 className="entry-title"><a href={`#/article${article.path}`} rel="bookmark">{article.title}</a></h2>
                                        <div className="entry-meta">
                                        <span className="cat-links">今天天气不错</span>
                                        <span className="sep"><span className="post-format"></span></span>
                                        <span className="comments-link">{article.createTime}</span>
                                        </div>
                                    </header>
                                    <div className="entry-thumbnail">
                                    </div>
                                    <div className="entry-content">
                                    <p>{article.shortContent}</p>
                                        <a href={`#/article${article.path}`} className="more-link"><span className="btn btn-small btn-read">阅读全文</span></a>
                                    </div>
                                </article>
                	      			)
                		      	})
                		      }
                          <nav role="navigation" id="nav-below" className="paging-navigation pager">
			<div className="nav-previous">
							<span className="meta-nav btn " style={{width:100}} onClick={this.goPage.bind(this,'up',this.state.page)}>上一页</span>				</div>
		<div className="nav-next">
							<span className="btn " style={{width:100}} onClick={this.goPage.bind(this,'down',this.state.page)}>下一页</span>
					</div>
		</nav>
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
