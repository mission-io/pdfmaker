import { BaseRequest, NextFunction, Post, Request, Response, Routable } from 'mission.api';
import { Template } from 'mission.template';
import { launch } from 'puppeteer';

@Routable('/pdfmaker')
export class PdfMakerController {
    @Post('/template')
    public static async template(req: Request, res: Response, next: NextFunction) {
        const baseReq: BaseRequest = req.body;
        const ctx: TemplateModel = baseReq.data;
        return Template.compile(ctx.template, ctx.data, {});
    }
    @Post('/pdf')
    public static async pdf(req: Request, res: Response, next: NextFunction) {
        const baseReq: BaseRequest = req.body;
        const ctx: TemplateModel = baseReq.data;
        const html = ctx.data ? Template.compile(ctx.template, ctx.data, {}) : ctx.template;
        const browser = await launch({
            args: ['--no-sandbox'], // '--headless', '--disable-gpu'
            executablePath: '/usr/bin/chromium-browser',
        });
        const page = await browser.newPage();
        await page.setContent(html);
        const pdf = await page.pdf({ format: 'A4' }); // path: `./${Date.now()}.pdf`,
        await browser.close();
        return pdf;
    }
}

export interface TemplateModel {
    template: string;
    data: { [key: string]: any };
}
