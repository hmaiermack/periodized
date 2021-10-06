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

    rest.get('/api/users', (req, res, ctx) => {
        const user = getMockUser()

        if(!user) {
            const initializeUser = db.user.create({
                id: "user1",
                username: "user1"
            })
            return res(ctx.json({ initializeUser }))
        }

        return res(ctx.json({ user }))
    }),

    rest.post<NewProgramReqBody>('/api/programs', (req, res, ctx) => {
        const { name } = req.body
        const user = getMockUser()

        if(!user) {
            return res(ctx.json({message: 'Something went wrong'}))
        }

            const program = db.programs.create({
                id: Math.random().toString().substr(2, 8),
                user,
                name
            })

                db.user.update({
                    where: {
                        id: {
                            equals: 'user1'
                        }
                    },
                    data: {
                        programs: [program],
                        currentProgram: program
                    }
                })        
            return res(ctx.json({ program }))

      }),

    rest.get('/programs', (req, res, ctx) => {
        console.log(req.body)
        return res(ctx.json({message: "You getted to /programs"}))
    })
]