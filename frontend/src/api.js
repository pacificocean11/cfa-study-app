const BASE = import.meta.env.VITE_API_BASE_URL || '';

export function api(path, options = {}) {
  return fetch(`${BASE}${path}`, options);
}
