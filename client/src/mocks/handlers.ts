import { rest } from 'msw'
import { db } from './db'
import { getMockUser } from './handlerUtils'

interface NewProgramReqBody {
    userId: string,
    name: string
}

export const handlers = [
    rest.get('/healthcheck', (req, res, ctx) => {
        return res(ctx.json("Successful msw request"))
    }),

    rest.post<NewProgramReqBody>('/api/programs', (req, res, ctx) => {
        const { name } = req.body
        const user = getMockUser()

          if(user) {
            const program = db.programs.create({
                id: Math.random().toString().substr(2, 8),
                user,
                name
            })
        
            return res(ctx.json({ program }))
          } else {
              return res(ctx.json({message: 'Something went wrong'}))
          }

      }),

    rest.get('/programs', (req, res, ctx) => {
        console.log(req.body)
        return res(ctx.json({message: "You getted to /programs"}))
    })
]