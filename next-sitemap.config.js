/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://your-project-name.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://your-project-name.vercel.app/sitemap.xml',
    ],
  },
  exclude: ['/admin/*', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
} 