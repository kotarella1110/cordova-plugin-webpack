import { Arguments } from 'yargs';

type Options = {
  alias?: { [key: string]: string | string[] };
  default?: { [key: string]: any };
  command?: string | ReadonlyArray<string>;
};

declare function unparser<T extends object>(
  argv: Arguments<T>,
  opts?: Options,
): ReadonlyArray<string>;

export default unparser;
