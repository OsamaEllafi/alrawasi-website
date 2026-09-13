async (page) => {
  const results = [], errors = [], failed = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) failed.push([r.status(), r.url()]); });
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const run = async (name, fn) => { try { results.push({name, result: await fn(), passed:true}); } catch(e) { results.push({name, passed:false, error:e.message}); } };
  const goto = async path => { await page.goto('http://localhost:3000'+path); await page.waitForTimeout(850); };
  await page.setViewportSize({width:1536,height:1024});
  await run('Scroll reveal and manual keyboard control', async () => {
    await goto('/en/');
    const range = page.getByRole('slider');
    const initial = Number(await range.inputValue());
    await page.evaluate(() => window.scrollTo({top:450,behavior:'instant'}));
    await page.waitForTimeout(900);
    const scrolled = Number(await range.inputValue());
    check(scrolled > initial + 10, 'Scroll did not reveal the building');
    await range.focus(); await range.press('Home');
    check(await range.inputValue() === '0', 'Home did not expose drawing');
    await range.press('End');
    check(await range.inputValue() === '100', 'End did not expose rendering');
    return {initial,scrolled,manual:await range.inputValue()};
  });
  await run('Reduced motion retains manual comparison', async () => {
    await page.emulateMedia({reducedMotion:'reduce'}); await goto('/en/');
    const range = page.getByRole('slider');
    const initial = await range.inputValue();
    await page.evaluate(() => window.scrollTo({top:450,behavior:'instant'})); await page.waitForTimeout(700);
    check(initial === await range.inputValue(), 'Automatic motion remained enabled');
    await range.focus(); await range.press('Home'); check(await range.inputValue()==='0','Manual control failed');
    await page.emulateMedia({reducedMotion:'no-preference'});
    return 'Scroll disabled; keyboard comparison works';
  });
  await run('Project filters, search, empty and reset', async () => {
    await goto('/en/projects/');
    check(await page.locator('.project-card').count() === 7, 'Expected seven projects');
    await page.getByRole('button',{name:/Banking/}).click(); check(await page.locator('.project-card').count()===3,'Banking filter');
    await page.getByRole('searchbox').fill('not-a-project'); check(await page.getByText('No matching projects',{exact:true}).isVisible(),'Empty state');
    await page.getByRole('button',{name:'Show all projects',exact:true}).click(); check(await page.locator('.project-card').count()===7,'Reset');
    await page.getByRole('searchbox').fill('شحات'); await page.waitForFunction(() => document.querySelectorAll('.project-card').length === 2); check(await page.locator('.project-card').count()===2,'Arabic search in English');
    return '7 total; 3 banking; bilingual search, empty and reset work';
  });
  await run('Client navigation, image viewer and language route', async () => {
    await page.locator('.project-image-link').first().click(); await page.waitForURL('**/en/projects/central-bank-shahat/');
    await page.getByRole('button',{name:'Enlarge project image'}).click(); check(await page.locator('.image-dialog').isVisible(),'Dialog closed');
    await page.keyboard.press('Escape'); check(!(await page.locator('.image-dialog').isVisible()),'Escape failed');
    await page.locator('.language-link').click(); await page.waitForURL('**/ar/projects/central-bank-shahat/');
    check(await page.locator('html').getAttribute('dir')==='rtl','Language direction');
    return 'Project navigation, protected image dialog and same-project language switching work';
  });
  await run('Service accordion and contact preselection', async () => {
    await goto('/en/services/');
    const buttons=page.locator('.service-item h3 button'); check(await buttons.count()===9,'Nine services required');
    await buttons.nth(1).click(); check(await buttons.nth(1).getAttribute('aria-expanded')==='true','Accordion');
    check(await buttons.nth(0).getAttribute('aria-expanded')==='false','Old panel open');
    const title=await buttons.nth(1).innerText();
    await page.locator('#service-panel-1 a').click(); await page.waitForURL('**/en/contact/?service=*');
    await page.waitForTimeout(350); check(await page.locator('#service').inputValue()===title.trim(),'Preselection missing');
    return {services:9,selected:title};
  });
  await run('Contact validation, office tabs and draft fallback', async () => {
    await page.getByRole('button',{name:'Prepare email',exact:true}).click();
    check(await page.locator('.field-error').count()===3,'Invalid form should show 3 errors');
    check(await page.locator('#name').evaluate(el=>el===document.activeElement),'Invalid field focus');
    await page.getByRole('tab').first().focus(); await page.keyboard.press('ArrowRight');
    check(await page.getByRole('tab').nth(1).getAttribute('aria-selected')==='true','Keyboard tab selection');
    await page.locator('#name').fill('Website QA'); await page.locator('#email').fill('qa@example.com'); await page.locator('#message').fill('Testing the project enquiry draft without sending a message.');
    await page.getByRole('button',{name:'Prepare email',exact:true}).click();
    check(await page.getByText('Your draft is ready',{exact:true}).isVisible(),'Draft missing');
    await page.context().grantPermissions(['clipboard-read','clipboard-write']);
    await page.getByRole('button',{name:'Copy draft',exact:true}).click();
    check((await page.evaluate(()=>navigator.clipboard.readText())).includes('Website QA'),'Draft clipboard');
    return 'Validation, focus, keyboard office tabs and local draft copy work; no email sent';
  });
  await run('Mobile menu keyboard and link navigation', async () => {
    await page.setViewportSize({width:390,height:844}); await goto('/en/');
    const trigger=page.getByRole('button',{name:'Open menu',exact:true}); await trigger.click();
    check(await page.getByRole('dialog',{name:'Main menu'}).isVisible(),'Menu failed');
    await page.keyboard.press('Escape'); check(await trigger.evaluate(el=>el===document.activeElement),'Focus not restored');
    await trigger.click(); await page.locator('.mobile-menu nav').getByRole('link',{name:'Projects',exact:true}).click();
    await page.waitForURL('**/en/projects/'); check(!(await page.locator('.mobile-menu').isVisible()),'Menu still visible');
    return 'Menu opens, Escape restores focus, project navigation closes menu';
  });
  await run('Client grid expands', async () => {
    await goto('/en/'); check(await page.locator('.client-logo').count()===6,'Initial clients');
    await page.getByRole('button',{name:'All institutions',exact:true}).click(); check(await page.locator('.client-logo').count()===18,'Expanded clients');
    return '6 to 18 institutions';
  });
  return {results,errors,failed};
}
