import { User } from '../../../models/User.model';
import { dbConnect, dbDisconnect } from '../../../utils/test-utils/testDbSetup'
import { createUser } from '../createUser.service';
import { getUserById } from '../getUserById.service';



describe('getUserById GET /api/users', () => {
  
  const mockUser = {
    _id: "123",
    username: 'user'
  }
  beforeEach(async () => await dbConnect())
  afterEach(async () => await dbDisconnect())
    
  describe("given a valid _id", () => {
    
    it("should return the user with the given _id", async () => {
      const mockedUser = await createUser(mockUser)
      const user = await getUserById(mockedUser._id)

      expect(user._id).toBe(mockedUser._id)
      expect(user.username).toBe(mockedUser.username)
    })
  })

  describe("given an invalid id", () => {

    it("should throw an error", async () => {
      await createUser(mockUser)

      const user = await getUserById("wrong_id")

      expect(user).toThrowError('User not found')  
    })
  })

  describe("given no id", () => {
    
  })

});