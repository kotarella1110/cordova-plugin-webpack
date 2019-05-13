import 'source-map-support/register';
import { ConfigParser } from 'cordova-common';
import et from 'elementtree';

class CordovaConfigParser extends ConfigParser {
  constructor(public path: string) {
    super(path);
  }

  private findOrCreate(name: string) {
    let ret: et.Element = this.doc.find(name);
    if (!ret) {
      ret = et.Element(name);
      this.doc.getroot().append(ret);
    }
    return ret;
  }

  content() {
    const el: et.Element = this.doc.find('content');
    return el.attrib.src;
  }

  setContent(src: string) {
    const el: et.Element = this.doc.find('content');
    el.attrib.src = src;
  }

  setElement(name: string, attributes: { [key: string]: string }) {
    const el: et.Element = this.findOrCreate(name);
    el.attrib = attributes;
  }
}

export default CordovaConfigParser;
