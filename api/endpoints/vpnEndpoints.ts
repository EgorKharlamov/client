class VpnEndpoint {
  private readonly prefix = "/vpn";

  withPrefix(path?: string) {
    if (path) return `${this.prefix}/${path}`;
    return `${this.prefix}`;
  }

  createVpns() {
    return this.withPrefix();
  }

  getVpns() {
    return this.withPrefix();
  }

  updateVpnStatusByName(name: string) {
    return this.withPrefix(`${name}/status`);
  }
}

export const vpnEndpoint = new VpnEndpoint();
