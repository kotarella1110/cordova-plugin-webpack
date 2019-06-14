declare class Policy {
  private raw: string;

  protected directives: string[];

  constructor(policy?: string);

  get(directive: string): string;

  add(directive: string, value: string): string;

  set(directive: string, value: string): string;

  remove(directive: string, value: string): void;

  string(): string;

  toString(): string;

  prettyString(): string;

  toPrettyString(): string;
}

export default Policy;
