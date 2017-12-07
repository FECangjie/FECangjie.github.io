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
import articleList from 'data/article'
import AsyncComponent from 'modules/AsyncComponent'
import ArticleRender from 'modules/ArticleRender'

export default class Index extends Page {
  componentWillMount () {
    let me = this
    let articleListFilter = articleList.filter((article,index) => { // 过滤
      if (article.path.split('/')[1] !== location.hash.split('/')[1] && location.hash.split('/')[1] !=='list') {
        return false
      }
      return article
    })
    me.setState({
      num: articleList.length || 0,
      page: 1,
      articles: articleListFilter.slice(0,3), // 展示
      type: location.hash.split('/')[1],
      articleList: articleListFilter
    })
  }

  /**
   * 分页
  **/
  goPage (type) {
    let me = this
    let state = me.state
    let num = state.articleList.length
    state.articles = []
    if (type === 'up') {
      state.page = (state.page === 1 ? state.page : --state.page)
    } else {
      state.page = (num > state.page * 3 ? ++state.page : state.page )
    }
    let len = num > state.page * 3 ? state.page * 3 : num
    console.log((state.page - 1) * 3+'-'+len)
    for (var i = (state.page - 1) * 3; i < len; i++) {
      state.articles.push(state.articleList[i])
    }
    this.setState({state})
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
                		      	this.state.articles.map((article,index) =>{
                		      		return (
                                <article key={index} id="post-33" className="hentry">
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
                          {
                            this.state.articleList.length ? (<nav role="navigation" id="nav-below" className="paging-navigation pager">
  			<div className="nav-previous">
  							<span className={this.state.page === 1?"meta-nav btn disabled":"meta-nav btn"} style={{width:100}} onClick={this.goPage.bind(this,'up')}>上一页</span>				</div>
  		<div className="nav-next">
  							<span className={this.state.articleList.length > this.state.page * 3?"meta-nav btn":"meta-nav btn disabled"} style={{width:100}} onClick={this.goPage.bind(this,'down')}>下一页</span>
  					</div>
  		</nav>) : (<div>暂无相关文章</div>)
                          }
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
