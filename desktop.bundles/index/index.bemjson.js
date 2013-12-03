({
    block: 'page',
    title: 'Calendar',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css' }
    ],
    content:[
        { block: 'title', js: true },
        { block: 'calendar', js: true },
        { elem: 'js', url: '_index.js' }
    ]
})
