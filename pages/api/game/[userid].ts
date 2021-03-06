import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';
import { getSession } from 'next-auth/react';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if ((req.method = 'GET')) {
    const { userid } = req.query;
    const client = await connectToDatabase();
    const db = client.db();

    let objectId;
    if (typeof userid === 'string') {
      objectId = new ObjectId(userid);
    }

    try {
      const foundUser = await db.collection('users').findOne({ _id: objectId });
      client.close();
      res.status(200).json(foundUser);
    } catch (err) {
      client.close();
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('Something went wrong');
    }
  }
};

export default handler;
