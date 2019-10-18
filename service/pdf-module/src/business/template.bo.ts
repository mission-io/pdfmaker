import { Template } from 'mission.template';

import { TemplateModel } from '../model';

export class TemplateBo {
    public async compile(tpl: TemplateModel): Promise<any> {
        return Template.compile(tpl.template, tpl.data, tpl.compileOptions);
    }
}
