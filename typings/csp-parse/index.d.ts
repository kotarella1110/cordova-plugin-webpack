declare class Policy {
  constructor(policy?: string);

  add(directive: string, value: string): string;

  get(directive: string): string;

  prettyString(): string;

  remove(directive: string, value: string): string;

  set(directive: string, value: string): string;

  string(): string;

  toString(): string;

  toPrettyString(): string;
}

export default Policy;
