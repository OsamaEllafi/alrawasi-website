async (page) => {
  const base = 'http://localhost:3000';
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const cases = [
    ['desktop', '/ar/', 1536, 1024],
    ['desktop-en', '/en/', 1536, 1024],
    ['mobile', '/ar/', 390, 844],
    ['mobile-en', '/en/', 390, 844],
    ['tablet', '/ar/', 768, 1024],
    ['projects-desktop', '/ar/projects/', 1536, 1024],
    ['projects-mobile', '/en/projects/', 390, 844],
    ['services-desktop', '/ar/services/', 1536, 1024],
    ['about-desktop', '/en/about/', 1536, 1024],
    ['contact-desktop', '/en/contact/', 1536, 1024],
    ['contact-mobile', '/ar/contact/', 390, 844],
    ['detail-desktop', '/ar/projects/central-bank-shahat/', 1536, 1024],
    ['detail-mobile', '/en/projects/othman-mosque/', 390, 844]
  ];
  const report = [];
  for (const [name, path, width, height] of cases) {
    await page.setViewportSize({width, height});
    const response = await page.goto(base + path);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo({top: y, behavior: 'instant'});
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      window.scrollTo({top: 0, behavior: 'instant'});
    });
    await page.waitForTimeout(1200);
    const metrics = await page.evaluate(() => ({
      viewport: innerWidth,
      width: document.documentElement.scrollWidth,
      direction: document.documentElement.dir,
      lang: document.documentElement.lang,
      headings: document.querySelectorAll('h1').length,
      failedImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
      overflows: [...document.querySelectorAll('main *')].filter(el => {const r = el.getBoundingClientRect();return r.width > 0 && (r.right > innerWidth + 2 || r.left < -2);}).slice(0, 12).map(el => el.className)
    }));
    await page.screenshot({path: '.impeccable/review/' + name + '.png', fullPage: false});
    await page.screenshot({path: '.impeccable/review/' + name + '-full.png', fullPage: true});
    report.push({name,path,status:response.status(),...metrics});
  }
  const sitemap = await page.request.get(base + '/sitemap.xml');
  const xml = await sitemap.text();
  const routes = [...xml.matchAll(/<loc>https:\/\/alrwasi.ly([^<]+)<\/loc>/g)].map(m=>m[1]);
  const routeChecks = [];
  for (const path of routes) {
    const response = await page.request.get(base+path);
    const html = await response.text();
    routeChecks.push({path, status:response.status(), h1:(html.match(/<h1[\s>]/g)||[]).length, language:html.includes(`lang="${path.split('/')[1]}"`), canonical:html.includes(`rel="canonical" href="https://alrwasi.ly${path}"`)});
  }
  return {report,errors,sitemapStatus:sitemap.status(),routeChecks};
}
