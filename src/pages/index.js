/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:50:50 GMT+0800 (CST)
 */

import { React, Page } from 'zola'

export default class Index extends Page {
  render () {
    return (
      <div>
        <div className="wrap">
          <h1>Zola</h1>
          <a href="#list">列表页</a>
          <input />
        </div>
        <div className="footer">with <b>♥</b> by lianjia-fe</div>
      </div>
    )
  }
}
