import usersRepo from '../../../helpers/users-repo';

function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getUserById();
    case 'PUT':
      return updateUser();
    case 'DELETE':
      return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getUserById() {
    const user = usersRepo.getById(req.query.id);
    return res.status(200).json(user);
  }

  function updateUser() {
    console.log(req.query);
    console.log(req.body);
    try {
      const updatedUser = usersRepo.update(req.query.id, req.body);
      return res.status(200).json({ 'Updated user:': updatedUser });
    } catch (error) {
      return res.status(400).json({ Error: error });
    }
  }

  function deleteUser() {
    usersRepo.delete(req.query.id);
    return res.status(200).json({});
  }
}

export default handler;
