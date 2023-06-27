const mapping: Record<string, string> = {
  contributors: 'contributor',
  literature: 'literature',
  publishers: 'publisher',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
