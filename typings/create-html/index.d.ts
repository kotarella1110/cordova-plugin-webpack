export interface Options {
  title?: string;
  script?: string | string[];
  scriptAsync?: boolean;
  css?: string | string[];
  cssAsync?: boolean;
  lang?: string;
  dir?: string;
  head?: string;
  body?: string;
  favicon?: string;
}

declare function createHTML(opts: Options): string;
export default createHTML;
