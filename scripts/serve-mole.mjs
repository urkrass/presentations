process.env.PRESENTATIONS_PORT ||= '3090'
process.env.PRESENTATIONS_START_ROUTE = '/ib-dp/mole-history/'
await import('../serve-dist.cjs')
