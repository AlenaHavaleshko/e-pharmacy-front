import axios from 'axios';

/**
 * Server-side only axios instance.
 * Calls the Node.js backend directly — never routes through Next.js /api proxy.
 * Use exclusively in Server Components, server actions, and server-only modules.
 * NODE_BACKEND_URL is intentionally not prefixed with NEXT_PUBLIC_ so it is
 * never exposed to the browser bundle.
 */
export const server = axios.create({
  baseURL: process.env.NODE_BACKEND_URL,
  withCredentials: true,
});
