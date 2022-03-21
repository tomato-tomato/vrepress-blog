/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "2b4c7e742a5967dd334d7bac3ebe79cd"
  },
  {
    "url": "aboutme.html",
    "revision": "f38d56178dc1b71439ee39f7b7470c2a"
  },
  {
    "url": "assets/css/0.styles.cf1d2abd.css",
    "revision": "8f37b7751f02203daf73843f761d4eb1"
  },
  {
    "url": "assets/img/bg.2cfdbb33.svg",
    "revision": "2cfdbb338a1d44d700b493d7ecbe65d3"
  },
  {
    "url": "assets/img/catlog.513eef80.png",
    "revision": "513eef80bbd143bf62f3527617955a1b"
  },
  {
    "url": "assets/img/friendship.a6cfb67a.png",
    "revision": "a6cfb67a264f8e423c9d5bdf6058dd97"
  },
  {
    "url": "assets/img/grid01.888c141c.png",
    "revision": "888c141c47f964b78a451e6050438e04"
  },
  {
    "url": "assets/img/proxy.6746ab60.png",
    "revision": "6746ab60b1604993388da7868f884da2"
  },
  {
    "url": "assets/js/1.0d4cf156.js",
    "revision": "e4d32ae8151b7698b2d87239af712cdd"
  },
  {
    "url": "assets/js/10.02925b6a.js",
    "revision": "af1223d6953fa1416c9b4cfc5ffbafe5"
  },
  {
    "url": "assets/js/11.37a227eb.js",
    "revision": "1559c179d343ddc3a19c6d9d5a9ba5fa"
  },
  {
    "url": "assets/js/12.b461f229.js",
    "revision": "e2fee0a0be6298247757c74a333851f3"
  },
  {
    "url": "assets/js/13.c51b7f24.js",
    "revision": "5fcfdbc3a8e7babee1b2db3056d53395"
  },
  {
    "url": "assets/js/14.ace8d2bf.js",
    "revision": "4afb1b21ba41c21ba0961ea76be54622"
  },
  {
    "url": "assets/js/15.f516ee6e.js",
    "revision": "5b62bf54acad9bc0a8de642ba3ebdd9e"
  },
  {
    "url": "assets/js/16.944205be.js",
    "revision": "b789c233727138fcc051ef3d6087aa81"
  },
  {
    "url": "assets/js/17.7fe8b363.js",
    "revision": "b50edb746997ecd3a676c44ad80adb88"
  },
  {
    "url": "assets/js/18.817a7d8a.js",
    "revision": "6e528f219d5b682da390c92de420c81f"
  },
  {
    "url": "assets/js/19.6861af63.js",
    "revision": "f261d2493b6784a13d50e1f59a05261a"
  },
  {
    "url": "assets/js/20.bcee11e8.js",
    "revision": "31c10e364468a972ad9e2e63f74a2c05"
  },
  {
    "url": "assets/js/21.fc932b52.js",
    "revision": "003208c3a06a8f9b8314d5e52614f7cd"
  },
  {
    "url": "assets/js/22.cc9f211d.js",
    "revision": "50629b6d997b5d4b8b9e6936eb7e44a6"
  },
  {
    "url": "assets/js/23.48e514bc.js",
    "revision": "e0b9e72e18b89758fde726d5d9b620c0"
  },
  {
    "url": "assets/js/24.455992a5.js",
    "revision": "6f9496d01ac28c4ae584b23d996af840"
  },
  {
    "url": "assets/js/25.7c280022.js",
    "revision": "a4d6ad7a042acc10de101d6a9f3a2708"
  },
  {
    "url": "assets/js/26.e425c9bf.js",
    "revision": "6db6be07c20bf57b0383b61afd25f1f9"
  },
  {
    "url": "assets/js/27.8f49785d.js",
    "revision": "740d96485f826746dbfe21a1589c5128"
  },
  {
    "url": "assets/js/28.1fa530d1.js",
    "revision": "ba4c377508e001155a4e88c199d982e0"
  },
  {
    "url": "assets/js/29.29be0e03.js",
    "revision": "cd0e5bf55ddef21badefaff176ceb3b2"
  },
  {
    "url": "assets/js/3.a931fe2d.js",
    "revision": "95856fb5534919143c61f7c74de5562a"
  },
  {
    "url": "assets/js/30.d35eed56.js",
    "revision": "fe84b5454d2ea5fa3d5cbb143d4ef38f"
  },
  {
    "url": "assets/js/31.6c70b184.js",
    "revision": "fd06852f7a77e04f67c4a465ae1756c5"
  },
  {
    "url": "assets/js/32.e7ff0b86.js",
    "revision": "39c807635b7abf0afee48dddc59ab87e"
  },
  {
    "url": "assets/js/33.9c52eb0a.js",
    "revision": "6a356d4fc532d2d91b56a902d45dd7b4"
  },
  {
    "url": "assets/js/34.109f4bb1.js",
    "revision": "78eb54596928f2b0d4512fa19d701e2d"
  },
  {
    "url": "assets/js/4.d1e7c111.js",
    "revision": "2e914d0d6b926fc7125d48e46455be18"
  },
  {
    "url": "assets/js/5.bcae74b9.js",
    "revision": "51a0e3e241517bd34c6415cb03f6a72b"
  },
  {
    "url": "assets/js/6.ed59abbe.js",
    "revision": "c3c5b40ecc9fdec8e3e155ebd0e8f4d9"
  },
  {
    "url": "assets/js/7.fab30212.js",
    "revision": "f7c9fe88400f19e0b07ad70c778e53df"
  },
  {
    "url": "assets/js/8.7f6538a3.js",
    "revision": "76b79510bc9d0e564d22087254e21a02"
  },
  {
    "url": "assets/js/9.8a8afb47.js",
    "revision": "74f95b0511b4fd2c1adb3e513762497f"
  },
  {
    "url": "assets/js/app.0998a715.js",
    "revision": "3f42d03893bd861a58f12c97c8703d90"
  },
  {
    "url": "blogs/Algorithm/Array.html",
    "revision": "4a425f5965004dc918e8abffbe081db0"
  },
  {
    "url": "blogs/Algorithm/index.html",
    "revision": "404b323f8aff4d1fb4cf845fbedd0798"
  },
  {
    "url": "blogs/Algorithm/List.html",
    "revision": "bf48b21f5738f154c4b7dc36398807cb"
  },
  {
    "url": "blogs/Algorithm/Queue.html",
    "revision": "3ccb17c7160b37883c22dadefcc56d8d"
  },
  {
    "url": "blogs/Algorithm/Stack.html",
    "revision": "b21c57592bb24675bf99397dcf57e9f6"
  },
  {
    "url": "blogs/Algorithm/String/08parseInt.html",
    "revision": "51a500fbddbfc59e00d594402cbd1234"
  },
  {
    "url": "blogs/CSS/Flex.html",
    "revision": "384310dd9b128e4b29c4453cfc9ec224"
  },
  {
    "url": "blogs/CSS/Gird.html",
    "revision": "af66870b16b45f71c77b8a455e8c5ce7"
  },
  {
    "url": "blogs/JavaScript/async-program.html",
    "revision": "f7e08717d9c33e52f93037761fc43090"
  },
  {
    "url": "blogs/JavaScript/ES6new.html",
    "revision": "bf9fd88b88b1fd1ecd56ad904abf748e"
  },
  {
    "url": "blogs/JavaScript/function-program.html",
    "revision": "75fa9bb46af3bd6843021ac194e4eefb"
  },
  {
    "url": "blogs/JavaScript/gulp.html",
    "revision": "fca0bdee4f6fc413cb7564d08fba7a93"
  },
  {
    "url": "blogs/JavaScript/js-performance.html",
    "revision": "78f6e11a6e66b8e592c9be4391d53151"
  },
  {
    "url": "blogs/JavaScript/modularization.html",
    "revision": "ae6468a80f2b2e491c42c77e768db6d2"
  },
  {
    "url": "blogs/JavaScript/myPromise.html",
    "revision": "e4d454c9d34a4b99954e34aa49f42992"
  },
  {
    "url": "blogs/JavaScript/promise-console.html",
    "revision": "98883642484381fca23bdd3f61362dc5"
  },
  {
    "url": "blogs/JavaScript/sequelize.html",
    "revision": "25a96b4b33d3858344cc80f38f9450bf"
  },
  {
    "url": "blogs/JavaScript/typescript.html",
    "revision": "af6fa1ad7b936a5b31284ac030c66ea2"
  },
  {
    "url": "blogs/JavaScript/webpack.html",
    "revision": "e240651bc420769893532b66ddba1178"
  },
  {
    "url": "blogs/JavaScript/yeoman.html",
    "revision": "e0445819eed7659f6cbef8e95cdc724e"
  },
  {
    "url": "categories/Algorithm/index.html",
    "revision": "6de49ffb7f439e7c11e368b4e71f3bce"
  },
  {
    "url": "categories/CSS/index.html",
    "revision": "6935b0d5d0360a43ecebd822d5057374"
  },
  {
    "url": "categories/index.html",
    "revision": "586eb9c24fd634318db75b0f000f7991"
  },
  {
    "url": "categories/JavaScript/index.html",
    "revision": "ec9e7870e925ff478c79514ed59c1fae"
  },
  {
    "url": "categories/JavaScript/page/2/index.html",
    "revision": "6aba5ce746b3e94e7ae68bb107954ff5"
  },
  {
    "url": "categories/Nodejs/index.html",
    "revision": "ff311e3b80fbb7d98ea6d32671fc9a3c"
  },
  {
    "url": "categories/Others/index.html",
    "revision": "cf35b59d30eb7b4f5a7209e619f6ebb1"
  },
  {
    "url": "heropic.svg",
    "revision": "366362cc9430fe57381077207d93d0ac"
  },
  {
    "url": "index.html",
    "revision": "f0e290ef352527e993228035d499699a"
  },
  {
    "url": "logo.svg",
    "revision": "607275dc91b966563d4317713e99a846"
  },
  {
    "url": "others/example.html",
    "revision": "6df8fa343d98e9cc0b2d11d4ebc07795"
  },
  {
    "url": "others/howtobuild.html",
    "revision": "23cf16ffb0faeeec2433e8598ea29cdd"
  },
  {
    "url": "tag/Algorithm/index.html",
    "revision": "116a7d2edd18141e5d0adff4aed95138"
  },
  {
    "url": "tag/CSS/index.html",
    "revision": "39580f2620cb9718f4fda8835a5ea4b2"
  },
  {
    "url": "tag/ES 6/index.html",
    "revision": "73ab6c430801f9647c82ba8fe1b1cba4"
  },
  {
    "url": "tag/Flex/index.html",
    "revision": "475dbb808a180093aaba9f83864c15e1"
  },
  {
    "url": "tag/Grid/index.html",
    "revision": "10c9e95a32a0e21d009789576125bfbb"
  },
  {
    "url": "tag/index.html",
    "revision": "ff0cd1e5b70d2149aae19159793484e4"
  },
  {
    "url": "tag/JavaScript/index.html",
    "revision": "92591c14b964b5ad48833e009dc9d63e"
  },
  {
    "url": "tag/JavaScript/page/2/index.html",
    "revision": "4e4d4a8f1846a42bc397e35ba71beee1"
  },
  {
    "url": "tag/Nodejs/index.html",
    "revision": "e4a4a24abce760f93215ca43a69ad59b"
  },
  {
    "url": "tag/Others/index.html",
    "revision": "335f69330b7a767a72913b784d1df2bf"
  },
  {
    "url": "tag/Promise/index.html",
    "revision": "69be54c556dbb64b9a322d52152417d8"
  },
  {
    "url": "tag/Sequelize/index.html",
    "revision": "4bd057c2864552cf071e5115c6a7f945"
  },
  {
    "url": "tag/TypeScript/index.html",
    "revision": "5434e2bbbeecd12e97927bf4fecb03c9"
  },
  {
    "url": "tag/Webpack/index.html",
    "revision": "39de6c68f9ea9ed137a369520943e939"
  },
  {
    "url": "tag/函数式编程/index.html",
    "revision": "2edf9135012c41c73f45350a8f297e18"
  },
  {
    "url": "tag/前端工程化/index.html",
    "revision": "a0a8707f68667a9f9ae5828e676afa81"
  },
  {
    "url": "tag/异步编程/index.html",
    "revision": "c151597952e1124fef7e38d2d136ef02"
  },
  {
    "url": "tag/模块化/index.html",
    "revision": "147dad26255167501d170ec892f52562"
  },
  {
    "url": "tag/自动化构建/index.html",
    "revision": "f0a734e3402d01da5ff3e63ce0ad624d"
  },
  {
    "url": "timeline/index.html",
    "revision": "a1bf6b03c0a269b5b5874cb9dae57173"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
