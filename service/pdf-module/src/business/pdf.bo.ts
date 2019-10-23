import { Browser, launch } from 'puppeteer';
import { PdfModel } from '../model';

export class PdfBo {
    private static browser: Browser;
    private static async getBrowser(): Promise<Browser> {
        return PdfBo.browser || (PdfBo.browser = await launch({
            args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox'], // '--headless', '--disable-gpu'
            // executablePath: '/usr/bin/chromium-browser',
        }));
    }
    public async pdf(html: string, pdf: PdfModel): Promise<any> {
        const browser = await PdfBo.getBrowser();
        const page = await browser.newPage();
        await page.setContent(html);
        const pdfContent = await page.pdf(pdf.pdfOptions || { format: 'A4' }); // path: `./${Date.now()}.pdf`,
        await page.close();
        // await browser.close();
        return pdfContent;
    }
}
