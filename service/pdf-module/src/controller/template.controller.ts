import { NextFunction, Post, Request, Response, Routable } from 'mission.api';
import { TemplateBo } from '../business';

@Routable('/template')
export class TemplateController {
    @Post()
    public static async template(req: Request, res: Response, next: NextFunction) {
        const data = req.body ? req.body.data : {};
        return TemplateController.getBo().compile(data);
    }
    protected static getBo(): TemplateBo {
        return new TemplateBo();
    }
}
