import fs from 'fs';
import et from 'elementtree';

class ConfigParser {
  config: et.ElementTree;

  constructor(private path: string) {
    const data = fs.readFileSync(path, 'utf-8').toString();
    this.config = et.parse(data);
  }

  private findOrCreate(name: string) {
    let element = this.config.find(name);
    if (!element) {
      element = et.Element(name);
      this.config.getroot().append(element);
    }
    return element;
  }

  setElement(name: string, attributes: { [key: string]: string }) {
    const element = this.findOrCreate(name);
    element.attrib = attributes;
  }

  write() {
    fs.writeFileSync(this.path, this.config.write({ indent: 4 }), 'utf-8');
  }
}

export default ConfigParser;
