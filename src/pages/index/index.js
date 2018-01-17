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
const PAGE_NUM = 10
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
      articles: articleListFilter.slice(0,PAGE_NUM), // 展示
      type: location.hash.split('/')[1],
      articleList: articleListFilter
    })


function P(fn){
  var state = 'pending';
  var doneList = [];
  var failList= [];

  this.then = function(done ,fail){
    switch(state){
      case "pending":
        doneList.push(done);
        //每次如果没有推入fail方法，我也会推入一个null来占位
        failList.push(fail || null);
        return this;
        break;
      case 'fulfilled':
        done();
        return this;
        break;
      case 'rejected':
        fail();
        return this;
        break;
    }
  }
  function resolve(newValue){
    state = "fulfilled";
    setTimeout(function(){
      var value = newValue;
      for (var i = 0;i<doneList.length;i++){
        var temp = doneList[i](value);
        if(temp instanceof Promise){
            var newP =  temp;
            for(i++;i<doneList.length;i++){
                newP.then(doneList[i],failList[i]);
            }
        }else{
            value = temp;
        }
      }
    },0);
  }
  function reject(newValue){
    state = "rejected";
    setTimeout(function(){
      var value = newValue;
      var tempRe = failList[0](value);
      //如果reject里面传入了一个promise，那么执行完此次的fail之后，将剩余的done和fail传入新的promise中
      if(tempRe instanceof Promise){
        var newP = tempRe;
        for(i=1;i<doneList.length;i++){
            newP.then(doneList[i],failList[i]);
        }
      }else{
        //如果不是promise，执行完当前的fail之后，继续执行doneList
        value =  tempRe;
        doneList.shift();
        failList.shift();
        resolve(value);
      }
    },0);
  }
  fn(resolve,reject);
}

var p = new P(function(r, e){
  console.log('start')
  // setTimeout(function(){
    e('error')
    r('test')

  // }, 100)
  console.log('end')
})
p.then((data)=>{console.log(data)},(data)=>{console.log(data)})

var p = new Promise(function(r, e){
  console.log('start')
  // setTimeout(function(){
    e('error')
    r('test')


  // }, 100)
  console.log('end')
})
p.then((data)=>{console.log(data)},(data)=>{console.log(data)})


let arr = []
console.log('this：', arr.toString())
for(var i = 0 ; 3 > i++ ; ){
  arr.push(i)
}
console.log('that：', arr.toString())



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
      state.page = (num > state.page * PAGE_NUM ? ++state.page : state.page )
    }
    let len = num > state.page * PAGE_NUM ? state.page * PAGE_NUM : num
    console.log((state.page - 1) * PAGE_NUM+'-'+len)
    for (var i = (state.page - 1) * PAGE_NUM; i < len; i++) {
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
                <article key={index} id="post-PAGE_NUMPAGE_NUM" className="post-PAGE_NUMPAGE_NUM post type-post status-publish format-standard has-post-thumbnail hentry category-delicious category-freelancing category-photography tag-playing tag-shopping item">
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
              <span className={this.state.articleList.length > this.state.page * PAGE_NUM?"meta-nav btn":"meta-nav btn disabled"} style={{width:100}} onClick={this.goPage.bind(this,'down')}>下一页</span>
              </div>
              </nav>) : (<div>暂无相关文章</div>)
                        }
                  </div>
              </div>
          </div>
    )
  }
}
