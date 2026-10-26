// Minimal mock for Vercel-like serverless during dev. In Vercel, this file becomes an API route.
import type { VercelRequest, VercelResponse } from '@vercel/node'

type Snapshot = { entries: any[]; expireAt: number }
const TTL_MS = 1000 * 60 * 10 // 10 minutes
// @ts-ignore retain across hot reloads in dev
globalThis.__SNAPSHOTS__ = (globalThis.__SNAPSHOTS__ || new Map()) as Map<string, Snapshot>
const store: Map<string, Snapshot> = globalThis.__SNAPSHOTS__

function id() {
  return Math.random().toString(36).slice(2, 10)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const key = id()
  store.set(key, { entries: body.entries ?? [], expireAt: Date.now() + TTL_MS })
  res.status(200).json({ id: key })
}
