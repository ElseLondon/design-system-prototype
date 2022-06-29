import { getMe } from "../src/Figma"
import axios from 'axios'
import jest from 'jest'

jest.mock('axios')

describe("Figma test suite", () => {
  test("getMe output", async () => {
    const testSelf = {
      "id": "123456789",
      "email": "samir@elselondon.com",
      "handle": "Samir",
      "img_url": "https://www.gravatar.com/avatar/example.png"
    }

    const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>

    mockedAxiosGet.mockResolvedValue({
      data: testSelf,
      status: 200
    })

    const me = await getMe()
    expect(me).toEqual(testSelf)
  })
})
