import { ResponseData, ResponseError } from "@/interfaces";

import { NextApiRequest, NextApiResponse } from 'next';

const obj: ResponseData = {
  success: true,
  message: '💀',
  data: {
    timestamp: new Date().toISOString(),
  },
};

export default (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData | ResponseError>
) => {
  try {
    response.send({...obj});
  } catch (error) {
    response.status(500);
  }
}
