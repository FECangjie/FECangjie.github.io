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
      page: 1,
      articles: [], // 展示
      type: '',
      articleList: []
    }
  }

  componentWillMount () {
    let me = this

    let articleListFilter = articleList.filter((article,index) => { // 过滤
      if ((article.path.split('/')[1] != location.hash.split('/')[1]) && !!location.hash.split('/')[1]) {
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
  goPage (type, page) {
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
    const {articles} = this.state
    return (
      <div className="container clearfix">
      <LeftMenu></LeftMenu>
      <LeftAction></LeftAction>
      <div className="article-list" style={{minHeight: 382}}>
          <div className="content" role="main">
          {
		      	articles.map((article,index) =>{
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
    )
  }
}
