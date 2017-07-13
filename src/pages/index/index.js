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
                                        <span className="byline">By <span className="author vcard"><a className="url fn n" href="" title="View all posts by Ruth Clem">Ruth Clem</a></span></span><span className="cat-links"> in <a href="" rel="category tag">Delicious</a>, <a href="" rel="category tag">Freelancing</a>, <a href="" rel="category tag">Photography</a></span>
                                            <span className="sep"><span className="post-format"><i className="icon-file-text"></i></span></span><span className="posted-on"><a href="http://demo.designwall.com/dw-minion/2013/06/20/the-inside-secrets-of-millionaires-under-the-age-of-29/" title="12:00 am" rel="bookmark"><i className="icon-calendar-empty"></i> </a></span>
                                            <span className="comments-link"><a href="http://demo.designwall.com/dw-minion/2013/06/20/the-inside-secrets-of-millionaires-under-the-age-of-29/#comments"><i className="icon-comment-alt"></i> 4 Comments</a></span>
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
