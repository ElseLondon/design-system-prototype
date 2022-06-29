import { hello, getUsers } from "../src/Sample"

describe("Sample test suite", () => {
  test("hello output", () => {
    expect(hello("Samir")).toEqual("Hello Samir")
  })

  test("getUsers output", async () => {
    const users = await getUsers()
    const testUsers = {
      "data": [
        {
          "avatar": "https://reqres.in/img/faces/1-image.jpg",
          "email": "george.bluth@reqres.in",
          "first_name": "George",
          "id": 1,
          "last_name": "Bluth",
        },
        {
          "avatar": "https://reqres.in/img/faces/2-image.jpg",
          "email": "janet.weaver@reqres.in",
          "first_name": "Janet",
          "id": 2,
          "last_name": "Weaver",
        },
        {
          "avatar": "https://reqres.in/img/faces/3-image.jpg",
          "email": "emma.wong@reqres.in",
          "first_name": "Emma",
          "id": 3,
          "last_name": "Wong",
        },
        {
          "avatar": "https://reqres.in/img/faces/4-image.jpg",
          "email": "eve.holt@reqres.in",
          "first_name": "Eve",
          "id": 4,
          "last_name": "Holt",
        },
        {
          "avatar": "https://reqres.in/img/faces/5-image.jpg",
          "email": "charles.morris@reqres.in",
          "first_name": "Charles",
          "id": 5,
          "last_name": "Morris",
        },
        {
          "avatar": "https://reqres.in/img/faces/6-image.jpg",
          "email": "tracey.ramos@reqres.in",
          "first_name": "Tracey",
          "id": 6,
          "last_name": "Ramos",
        },
      ],
      "page": 1,
      "per_page": 6,
      "support":  {
        "text": "To keep ReqRes free, contributions towards server costs are appreciated!",
        "url": "https://reqres.in/#support-heading",
      },
      "total": 12,
      "total_pages": 2,
    }
    
    expect(users).toEqual(testUsers)
  })
})
