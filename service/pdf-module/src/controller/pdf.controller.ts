import { NextFunction, Post, Request, Response, Routable } from 'mission.api';
import { PdfBo, TemplateBo } from '../business';
import { PdfTemplateModel } from '../model';

@Routable('/pdf')
export class PdfController {
    @Post()
    public static async pdf(req: Request, res: Response, next: NextFunction) {
        const data: PdfTemplateModel = req.body ? req.body.data : {};
        const html = await PdfController.getTemplateBo().compile(data);
        return PdfController.getBo().pdf(html, data);
    }
    protected static getBo(): PdfBo {
        return new PdfBo();
    }
    protected static getTemplateBo(): TemplateBo {
        return new TemplateBo();
    }
}
