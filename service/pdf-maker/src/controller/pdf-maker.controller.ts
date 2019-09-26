import { NextFunction, Post, Request, Response, Routable } from 'mission.api';
import { PdfMakerBo } from '../business';

@Routable('/pdfmaker')
export class PdfMakerController {
    @Post('/template')
    public static async template(req: Request, res: Response, next: NextFunction) {
        const data = req.body ? req.body.data : {};
        return PdfMakerController.getBo().template(data);
    }
    @Post('/pdf')
    public static async pdf(req: Request, res: Response, next: NextFunction) {
        const data = req.body ? req.body.data : {};
        return PdfMakerController.getBo().pdf(data);
    }
    protected static getBo(): PdfMakerBo {
        return new PdfMakerBo();
    }
}
