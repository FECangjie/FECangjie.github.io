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
                		      	articleList.map((article,index) =>{
                		      		return (
                                <article key={index} id="post-33" className="post-33 post type-post status-publish format-standard has-post-thumbnail hentry category-delicious category-freelancing category-photography tag-playing tag-shopping">
                                    <header className="entry-header">
                                        <h2 className="entry-title"><a href="" rel="bookmark">{article.title}</a></h2>
                                        <div className="entry-meta">
                                        <span className="cat-links">今天天气不错</span>
                                        <br/>
                                        <span className="comments-link">{article.createTime}</span>
                                        </div>
                                    </header>
                                    <div className="entry-thumbnail">
                                    </div>
                                    <div className="entry-content">
                                    <p>{article.shortContent}</p>
                                        <a href={`#/article${article.path}`} className="more-link"><span className="btn btn-small">阅读全文</span></a>
                                    </div>
                                </article>
                	      			)
                		      	})
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
