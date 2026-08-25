process.env.PRESENTATIONS_PORT = process.env.PRESENTATIONS_PORT || '3060'
process.env.PRESENTATIONS_START_ROUTE = '/experiments/visual-lab/'

await import('../serve-dist.cjs')
