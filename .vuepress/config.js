module.exports = {
    title: '奔跑的倒霉熊',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '前端', link: '/web/' },
            { text: 'node', link: '/node/' },
            { text: '数据库', link: '/sql/' },
            { text: '面试', link: '/interview/' },
            { text: 'Github', link: 'https://github.com/weblixin/blog' },
        ],
        sidebar: [
            ['/', '主页'],
            '/page-a',
            ['/page-b', 'Explicit link text']
        ]
    }
}