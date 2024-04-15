import LinkInterface from "./responses/link.interface"

export default class LinkGenerator {

  routesLink(method: string, base_url: string, route: string): LinkInterface[] {
    const links = [{ rel: method, href: `${base_url}${route}` }]
    return links
  }

  routes() {
    return [
      ...this.routesLink("POST", "base_url", "/api/user/create"),
      ...this.routesLink("POST", "base_url", "/api/user/login"),
      ...this.routesLink("GET", "base_url", "/api/user/getAll"),
      ...this.routesLink("GET", "base_url", "/api/user/getById?id={:id}"),
      ...this.routesLink("GET", "base_url", "/api/user/refreshToken?token={:token}"),
      ...this.routesLink("GET", "base_url", "/api/user/checkToken?token={:token}"),
      ...this.routesLink("GET", "base_url", "/api/user/getByEmail?email={:id}"),
      ...this.routesLink("DELETE", "base_url", "/api/user/delete?id={:id}"),
    ]
  }
}
