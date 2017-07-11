
import { React, Page } from 'zola'

export default class Index extends Page {
  render () {
    return (
      <div>
        <div className="wrap">
          <h1>Zola</h1>
          <a href="#list">列表页</a>
        </div>
        <div className="footer">with <b>♥</b> by lianjia-fe</div>
      </div>
    )
  }
}
