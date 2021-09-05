import { rest } from 'msw'

export const handlers = [
    rest.get('/healthcheck', (req, res, ctx) => {
        return res(ctx.json("Successful msw request"))
    }),

    rest.post('/programs', (req, res, ctx) => {
        console.log(req.body)
    
        return res(ctx.json({message: "You posted to /programs"}))
      }),

    rest.get('/programs', (req, res, ctx) => {
        console.log(req.body)
        return res(ctx.json({message: "You getted to /programs"}))
    })
]