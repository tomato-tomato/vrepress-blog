module.exports = {
    title: '瓦楞纸搭窝',
    description: 'Don\'t Settle!',
    port: 9090,
    dest: 'dist',
    base: '/vuepress-blog/',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    theme: 'reco',
    themeConfig: {
        logo: '/logo.svg',
        nav: [
            { text: 'Home', link: '/', icon: 'reco-home' },
            { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
            { text: 'about me', link: '/aboutme', icon: 'reco-account' },
            { text: 'GitHub', link: 'https://github.com/tomato-tomato', icon: 'reco-github' }
        ],
        blogConfig: {
            category: { location: 2, text: 'Category' },
            tag: { loaction: 3, text: 'Tag' }
        },
        type: "blog",
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        smoothScroll: true,
        author: "lukeyan",
        authorAvatar: "/logo.svg",
        startYear: "2020",
        //评论模块
        valineConfig: {
            appId: "SaQhu6bMtiMJjXmG56af85JQ-gzGzoHsz",
            appKey: "w7EOzhmq8QfQ1iA24w8LaYwU",
            showComment: false
        },
        sidebar:  {
            '/blogs/Algorithm/': [
                {
                    title: "LeetCode刷题",
                    collapsable: false, 
                    children: [
                        {title: '总览', path: '/blogs/Algorithm/'},
                        {title: '链表', collapsable: false, 
                            children: [                       
                                {title: '08.字符串转换', path: 'String/08parseInt'}
                            ]
                        }                       
                    ]
                }
            ]
        },
        sidebarDepth: 4
    },
    markdown: {
        lineNumbers: true
    },

    head: [
        ["link", { rel: 'icon', href: '/logo.svg' }],
        ["meta", { name: 'viewport', content: "width=device-width,initial-scale=1,user-scalable=no" }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    plugins: ['@vuepress/pwa', {
        ServiceWorker: true,
        updatePopup: true
    }]
}