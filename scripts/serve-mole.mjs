process.env.PRESENTATIONS_PORT ||= '3090'
process.env.PRESENTATIONS_START_ROUTE = '/grade-8/mole-history/'
await import('../serve-dist.cjs')
