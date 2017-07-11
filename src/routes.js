/**
 *  === routes ===
 *
 *  created at: <?= createdAt ?>
 */
import zola from 'zola'

export default zola.router({
  history: 'hashHistory',
  // history: 'browserHistory',
  routes: [
    // ==== router start ==== //
    { path: '/', component: System.import('pages/index') },
    { path: 'list', component: System.import('pages/list') },
    { path: 'article/:title', component: System.import('pages/article') },
    // ==== router end   ==== //
    { path: '*', component: System.import('pages/404') },
  ]
})
