process.env.PRESENTATIONS_PORT = process.env.PRESENTATIONS_PORT || '3070'
process.env.PRESENTATIONS_START_ROUTE = '/ib-dp/a2-cells-viruses/'

await import('../serve-dist.cjs')
