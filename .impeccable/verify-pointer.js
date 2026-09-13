async (page) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://localhost:3000/en/');
  await page.waitForTimeout(900);
  const slider = page.getByRole('slider');
  const box = await slider.boundingBox();
  const before=await slider.inputValue();
  await page.mouse.move(box.x+box.width*0.5,box.y+box.height*0.5);
  await page.mouse.down();
  await page.mouse.move(box.x+box.width*0.8,box.y+box.height*0.5,{steps:8});
  await page.mouse.up();
  const after=await slider.inputValue();
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  await page.screenshot({path:'.impeccable/review/mobile-menu.png'});
  await page.keyboard.press('Escape');
  await page.setViewportSize({width:1536,height:1024});
  await page.goto('http://localhost:3000/ar/');
  await page.waitForTimeout(900);
  await page.evaluate(()=>window.scrollTo({top:400,behavior:'instant'}));
  await page.waitForTimeout(900);
  const desktop=await slider.inputValue();
  await page.setViewportSize({width:390,height:844});
  await page.waitForTimeout(300);
  const resized=await slider.inputValue();
  return {pointerDrag:{before,after,passed:before!==after},breakpointCleanup:{desktop,resized,passed:resized==='62'}};
}
