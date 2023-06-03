class ServerEndpoint {
  private readonly prefix = "/servers";

  withPrefix(path?: string) {
    if (path) return `${this.prefix}/${path}`;
    return `${this.prefix}`;
  }

  createServer() {
    return this.withPrefix();
  }

  getServers() {
    return this.withPrefix();
  }

  getServerByName(name: string) {
    return this.withPrefix(name);
  }

  deleteServerByName(name: string) {
    return this.withPrefix(name);
  }
}

export const serverEndpoint = new ServerEndpoint();
