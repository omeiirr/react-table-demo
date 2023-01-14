let users = [
  {
    id: 'user_1',
    name: 'Phoebe Fadel',
    email: 'marta.hilpert@casper.com',
    photo: 'https://xsgames.co/randomusers/assets/avatars/female/1.jpg',
    status: 'Active',
    role: 'Admin',
    lastLogin: '2022-12-19T00:52:49Z',
  },
  {
    id: 'user_2',
    name: 'Max Lakin',
    email: 'wolff.dayna@kemmer.com',
    photo: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
    status: 'Invited',
    role: 'Sales Rep',
    lastLogin: '2022-12-29T14:27:36Z',
  },
  {
    id: 'user_3',
    name: 'Verna Wehner',
    email: 'boehm.ilene@dickinson.com',
    photo: 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg',
    status: 'Active',
    role: 'Sales Leader',
    lastLogin: '2023-01-12T09:52:36Z',
  },
  {
    id: 'user_4',
    name: 'Julien Bogan',
    email: 'grady.mohammad@boehm.org',
    photo: 'https://xsgames.co/randomusers/assets/avatars/female/3.jpg',
    status: 'Active',
    role: 'Developer',
    lastLogin: '2023-01-01T03:29:21Z',
  },
  {
    id: 'user_5',
    name: 'Horace Stoltenberg',
    email: 'ekessler@gmail.com',
    photo: 'https://xsgames.co/randomusers/assets/avatars/male/2.jpg',
    status: 'Inactive',
    role: 'Developer',
    lastLogin: '2022-12-28T23:10:57Z',
  },
  {
    id: 'user_6',
    name: 'Roman Kris',
    email: 'mitchell.deven@zboncak.info',
    photo: 'https://xsgames.co/randomusers/assets/avatars/male/3.jpg',
    status: 'Active',
    role: 'Sales Leader',
    lastLogin: '2023-01-03T09:27:57Z',
  },
  {
    id: 'user_7',
    name: 'Emerson Stiedemann',
    email: 'efahey@senger.biz',
    photo: 'https://xsgames.co/randomusers/assets/avatars/male/4.jpg',
    status: 'Active',
    role: 'Sales Leader',
    lastLogin: '2023-01-11T11:19:25Z',
  },
  {
    id: 'user_8',
    name: 'Ruthie Pfeffer',
    email: 'thiel.shaniya@gmail.com',
    photo: 'https://xsgames.co/randomusers/assets/avatars/female/4.jpg',
    status: 'Active',
    role: 'Sales Leader',
    lastLogin: '2022-12-19T05:20:52Z',
  },
  {
    id: 'user_9',
    name: 'Vincenza Adams',
    email: 'rhea.marquardt@thiel.com',
    photo: 'https://xsgames.co/randomusers/assets/avatars/male/6.jpg',
    status: 'Inactive',
    role: 'CTO',
    lastLogin: '2022-12-19T02:15:49Z',
  },
  {
    id: 'user_10',
    name: 'Nicola Kilback',
    email: 'carroll09@gmail.com',
    photo: 'https://xsgames.co/randomusers/assets/avatars/female/5.jpg',
    status: 'Inactive',
    role: 'Developer',
    lastLogin: '2022-12-28T05:36:58Z',
  },
];
const getAll = () => {
  return users;
};
const getById = (id) => {
  return users.find((x) => x.id.toString() === id.toString());
};

const usersRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function create({ name, email, status, role }) {
  const user = {
    name: name,
    email: email,
    status: status,
    role: role,
    photo: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
  };

  // generate new user id
  let totalUsers = users.length;
  user.id = totalUsers ? 'user_' + (totalUsers + 1) : 'user_1';

  user.lastLogin = new Date().toISOString();

  // add and save user
  users.push(user);
  return user;
  // saveData();
}

function update(id, { name, email, status, role }) {
  console.log('newName', name);
  // const params = { name, email, status, role };
  const userToUpdate = users.find((x) => x.id === id);

  // TODO: optimise this (esit only name and role)
  if (name) userToUpdate.name = name;
  if (email) userToUpdate.email = email;
  if (status) userToUpdate.status = status;
  if (role) userToUpdate.role = role;

  return userToUpdate;
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted user
  users = users.filter((x) => x.id.toString() !== id.toString());
  // saveData();
}

// function saveData() {
//     fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
// }

export default usersRepo;
