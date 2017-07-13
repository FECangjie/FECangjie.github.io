/**
 *  === routes ===
 *
 *  created at: <?= createdAt ?>
 */
import zola from 'zola'

export default zola.router({
  history: 'hashHistory',
  routes: [
    // ==== router start ==== //
    { path: '/', component: System.import('pages/Index/index') },
    { path: '/list', component: System.import('pages/List/index') },
    { path: '/article/*', component: System.import('pages/Article/index') },
    { path: '/blog/:path', component: System.import('pages/Blog/index') },
    // ==== router end   ==== //
    { path: '*', component: System.import('pages/Error/404') },
  ]
})
