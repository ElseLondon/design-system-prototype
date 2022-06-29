import axios from 'axios'
import 'dotenv/config'

type GetMeResponse = {
  data: {
    "id": string;
    "email": string;
    "handle": string;
    "img_url": string;
  },
  status: number
}

export async function getMe() {
  try {
    const { data, status } = await axios.get<GetMeResponse>(
      'https://api.figma.com/v1/me',
      {
        headers: {
          Accept: 'application/json',
          'X-Figma-Token': process.env.X_FIGMA_TOKEN || ''
        },
      },
    );

    console.log(JSON.stringify(data, null, 4));
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
