/// <reference types="handlebars" />
import { PDFOptions } from 'puppeteer';

export interface TemplateModel {
    template: string;
    data: { [key: string]: any };
    compileOptions?: CompileOptions;
}

export interface PdfModel extends TemplateModel {
    pdfOptions: PDFOptions;
}
