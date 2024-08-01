import DatabaseManager from '../../lib/database';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        const user = DatabaseManager.getUserById(req.query.id);
        return res.status(200).json(user);
      } else {
        const users = DatabaseManager.getAllUsers();
        return res.status(200).json(users);
      }

    case 'POST':
      const { name, email } = req.body;
      DatabaseManager.createUser(name, email);
      return res.status(201).json({ message: 'User created' });

    case 'PUT':
      const { id, newName, newEmail } = req.body;
      DatabaseManager.updateUser(id, newName, newEmail);
      return res.status(200).json({ message: 'User updated' });

    case 'DELETE':
      const { userId } = req.body;
      DatabaseManager.deleteUser(userId);
      return res.status(200).json({ message: 'User deleted' });

    default:
      return res.status(405).end(); // Method Not Allowed
  }
}
