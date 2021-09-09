import { db } from './db'

export const getMockUser = () => {
    const user = db.user.findFirst({
        where: {
            id: {
                equals: "user1"
            }
        }
    })

    return user
}