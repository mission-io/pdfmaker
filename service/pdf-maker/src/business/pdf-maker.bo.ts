import { Template } from 'mission.template';
import { launch } from 'puppeteer';

import { PdfModel, TemplateModel } from '../model';

export class PdfMakerBo {
    public async template(tpl: TemplateModel): Promise<any> {
        return Template.compile(tpl.template, tpl.data, tpl.compileOptions);
    }
    public async pdf(tpl: PdfModel): Promise<any> {
        const html = tpl.data ? Template.compile(tpl.template, tpl.data, tpl.compileOptions) : tpl.template;
        const browser = await launch({
            args: ['--disable-dev-shm-usage'], // '--headless', '--disable-gpu', '--no-sandbox'
            // executablePath: '/usr/bin/chromium-browser',
        });
        const page = await browser.newPage();
        await page.setContent(html);
        const pdf = await page.pdf({ format: 'A4' }); // path: `./${Date.now()}.pdf`,
        await browser.close();
        return pdf;
    }
}
