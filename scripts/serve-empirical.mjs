process.env.PRESENTATIONS_PORT ||= '3091'
process.env.PRESENTATIONS_START_ROUTE ||= '/grade-8/empirical-formula/1'
await import('../serve-dist.cjs')
