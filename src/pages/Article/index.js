/**
 *  核心博客内容页面
 */

import { React, Page } from 'zola'
import articles from 'data/article'
import LeftMenu from 'modules/leftMenu'
import LeftAction from 'modules/leftAction'
import AsyncComponent from 'modules/AsyncComponent'
import articleList from 'data/article'
import highlight from 'highlight.js'
import './style.less'

export default class Article extends Page {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      author: '',
      createTime: '',
      tags: []
    }
  }

  componentWillMount() {
    const filePath = this.props.params.splat
  	const path = `/article/${filePath}.md`
    let article = articleList.find(item =>
      !!(item.path.indexOf(filePath) > 0)
    )
    article.component().then(content => {
      this.setState({
        content,
        author: article.author,
        createTime: article.createTime,
        title: article.title,
        tags: article.tags || []
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    var blocks = Array.from(document.querySelectorAll('pre code'));
    blocks.forEach(block => highlight.highlightBlock(block));
  }

  render () {
    let {content, author, createTime, title, tags} = this.state;
    return (
      <div className="container clearfix">
      <LeftMenu></LeftMenu>
      <LeftAction></LeftAction>
      <div id="main" className="site-main article" style={{minHeight: 382}}>
      {!!content ?
        <div className="markdown">
          <div className="article-header">
            <div className="header-wrap">
              <h1>{title}</h1>
              <div className="pub-time">
                <i className=""></i><span>{createTime}</span>
              </div>
              <div className="author">
                <i className=""></i><span>作者：{author}</span>
              </div>
              <div className="article-tags">
                {
                  tags.map(v => <span>{v}</span>)
                }
              </div>
            </div>
          </div>
          <AsyncComponent com={content}/>
        </div>
       : <div>文章加载中...</div>}
      </div>
  </div>
    )
  }
}
