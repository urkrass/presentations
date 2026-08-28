process.env.PRESENTATIONS_PORT = process.env.PRESENTATIONS_PORT || '3080'
process.env.PRESENTATIONS_START_ROUTE = '/ib-dp/chemistry-kinetics/'

await import('../serve-dist.cjs')
