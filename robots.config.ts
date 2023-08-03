export default [
    { UserAgent: '*' },
    { Disallow: '/' },
    { BlankLine: true },
    { Comment: 'Comment here' },

    // Be aware that this will NOT work on target: 'static' mode
    { Sitemap: (req:any) => `https://${req.headers.host}/sitemap.xml` }
]