/// <reference types="handlebars" />
import { PDFOptions } from 'puppeteer';

export interface TemplateModel {
    template: string;
    data?: { [key: string]: any };
    compileOptions?: CompileOptions;
}

export interface PdfModel {
    pdfOptions?: PDFOptions;
}

export type PdfTemplateModel = PdfModel & TemplateModel;
