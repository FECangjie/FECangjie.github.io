/**
 *  === routes ===
 *
 *  created at: <?= createdAt ?>
 */
import zola from 'zola'

import Index from 'pages/Index/index'
import Article from 'pages/Article/index'
import About from 'pages/About/index'

export default zola.router({
  history: 'hashHistory',
  routes: [
    // ==== router start ==== //
    { path: '/', component: System.import('pages/Index/index') },
    { path: '/list', component: System.import('pages/Index/index') },
    { path: '/article/*', component: System.import('pages/Article/index') },
    { path: '/about', component: System.import('pages/About/index') },
    { path: '/fe', component: System.import('pages/Index/index') },
    { path: '/freestyle', component: System.import('pages/Index/index') },
    { path: '/music', component: System.import('pages/Index/index') },
    // ==== router end   ==== //
    { path: '*', component: System.import('pages/Error/404') },
  ]
})
