export namespace ErrorAction {
  export class Set {
    static readonly type = '[Eroor] SET';
    constructor(public message: string) {}
  }
}
