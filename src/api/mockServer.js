const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Endpoint for fetching items
server.get('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const db = router.db;
  const item = db.get('items').find({ id: itemId }).value();

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.status(200).json(item);
});

// Endpoint for creating orders and saving them to both the user's account and global orders list
server.post('/users/:userId/orders', (req, res) => {
  const userId = req.params.userId;
  const {
    cpf,
    email,
    name,
    phoneNumber,
    cep,
    address,
    paymentMethod,
    items
  } = req.body;

  const db = router.db;
  const user = db.get('users').find({ id: userId }).value();

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const orderId = `ORDER${Math.floor(Math.random() * 1000000)}`;

  // Create the order object with user information
  const newOrder = {
    orderId: orderId,
    userInfo: {
      userId: userId,
      cpf: cpf,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      cep: cep,
      address: address
    },
    paymentMethod: paymentMethod,
    items: items,
    status: 'success',
    paymentDetails: paymentMethod === 'Boleto'
      ? { status: 'Waiting for payment to be confirmed' }
      : { status: 'Payment successful' }
  };

  const purchaseRecord = {
    orderId: orderId,
  };

  // Save the order to the user's purchase history
  db.get('users')
    .find({ id: userId })
    .get('purchases')
    .push(purchaseRecord)
    .write();

  // Also save the order to the global orders list
  db.get('orders')
    .push(newOrder)
    .write();

  res.status(200).json(newOrder);
});

// Endpoint for user registration
server.post('/users/register', (req, res) => {
  const { fullName, email, password } = req.body;
  const db = router.db;
  const existingUser = db.get('users').find({ email }).value();

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: `USER${Math.floor(Math.random() * 1000000)}`,
    fullName,
    email,
    password,
    purchases: []
  };

  db.get('users')
    .push(newUser)
    .write();

  res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
});

// Endpoint for user login
server.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ email, password }).value(); // Simple authentication

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({
    message: 'Login successful',
    userId: user.id,
    fullName: user.fullName,
    email: user.email
  });
});

// Endpoint to get user details and purchases
server.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const db = router.db;
  const user = db.get('users').find({ id: userId }).value();

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
