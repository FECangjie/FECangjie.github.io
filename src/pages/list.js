/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:50:50 GMT+0800 (CST)
 */
const article = MY_ARTICLE_DATA
import { React, Page } from 'zola'

export default class List extends Page {
  render () {
    return (
      <div>
      {
        article.map((item, index) => {
        return (<a key={index} href={`/article/${item.title}`}>{item.title}</a>)
      })
      }
      </div>
    )
  }
}
