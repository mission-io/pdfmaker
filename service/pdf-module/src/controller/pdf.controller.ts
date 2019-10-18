import { NextFunction, Post, Request, Response, Routable } from 'mission.api';
import { PdfBo } from '../business';

@Routable('/pdf')
export class PdfMakerController {
    @Post()
    public static async pdf(req: Request, res: Response, next: NextFunction) {
        const data = req.body ? req.body.data : {};
        return PdfMakerController.getBo().pdf(data);
    }
    protected static getBo(): PdfBo {
        return new PdfBo();
    }
}
