import type { VercelRequest, VercelResponse } from '@vercel/node'

type Snapshot = { entries: any[]; expireAt: number }
// @ts-ignore retain across hot reloads in dev
const store: Map<string, Snapshot> = (globalThis.__SNAPSHOTS__ ||= new Map())

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id as string
  const snap = store.get(id)
  if (!snap) return res.status(404).json({ error: 'Not found' })
  if (Date.now() > snap.expireAt) {
    store.delete(id)
    return res.status(410).json({ error: 'Gone' })
  }
  return res.status(200).json({ id, entries: snap.entries, expireAt: snap.expireAt })
}
