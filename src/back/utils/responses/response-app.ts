import LinkInterface from "./link.interface"

export default class ResponseApp {
  readonly links: LinkInterface[];

  constructor(link: LinkInterface[]) {
    this.links = link
  }

  toResponse() {
    return {
      links: this.links,
    }
  }
}
