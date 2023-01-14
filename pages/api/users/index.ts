import usersRepo from '../../../helpers/users-repo';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string;
  code: number;
  total: number;
  data: User[];
};

type User = {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  lastLogin: string;
  photo: string;
};

// export interface ICrudService<T> {
//   getAll: () => Promise<T[]>;
//   getOne: (id: string) => Promise<T | null>;
//   create: (data: T) => Promise<T>;
//   update: (id: string, data: T) => Promise<T>;
//   delete: (id: string) => Promise<T>;
// }

// async <T>(
//   request: NextApiRequest,
//   response: NextApiResponse,
//   service: ICrudService<T>
// )

const handler = (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  const getUsers = () => {
    const users = usersRepo.getAll();
    return res.status(200).json(users);
  };

  const createUser = () => {
    try {
      const newUser = usersRepo.create(req.body);
      // @ts-ignore
      return res.status(200).json(newUser);
    } catch (error) {
      // @ts-ignore
      return res.status(400).json({ error });
      // return res.status(400).json({ message: error });
    }
  };

  switch (req.method) {
    case 'GET':
      return getUsers();
    case 'POST':
      return createUser();
  }
};

export default handler;
