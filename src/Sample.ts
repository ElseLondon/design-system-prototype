import axios from 'axios';

type User = {
  id: number
  email: string
  first_name: string
}

type GetUsersResponse = {
  data: User[]
}

export function hello(name: string): string {
  return `Hello ${name}`
}

export async function getUsers() {
  try {
    const { data, status } = await axios.get<GetUsersResponse>(
      'https://reqres.in/api/users',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    // console.log(JSON.stringify(data, null, 4));
    console.log('RESPONSE STATUS: ', status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('ERROR MESSAGE: ', error.message);
      return error.message;
    } else {
      console.log('UNEXPECTED ERROR: ', error);
      return 'AN UNEXPECTED ERROR OCCURED';
    }
  }
}
