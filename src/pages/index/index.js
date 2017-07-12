/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */

import { React, Page } from 'zola'
import Tpl from './tpl.rt'
import './style.less'

export default class Index extends Page {
  render () {
    return Tpl.apply(this)
  }
}
