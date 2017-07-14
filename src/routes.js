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
    { path: '/about', component: System.import('pages/About/index') },
    { path: '/fe', component: System.import('pages/Fe/index') },
    { path: '/music', component: System.import('pages/Music/index') },
    { path: '/gui', component: System.import('pages/Gui/index') },
    // ==== router end   ==== //
    { path: '*', component: System.import('pages/Error/404') },
  ]
})
