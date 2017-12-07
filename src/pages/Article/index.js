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
import articleList from 'data/article'
import highlight from 'highlight.js'

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
    console.log(this.state.content)

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
                          <div className="markdown">
                          {!!this.state.content ?
      <AsyncComponent com={this.state.content}/> : <div>文章加载中...</div>}
      </div>
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
