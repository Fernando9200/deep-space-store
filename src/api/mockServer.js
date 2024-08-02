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

// Endpoint for creating orders
server.post('/items/:itemId/create_order', (req, res) => {
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

  // Validate CPF
  if (cpf === '000.000.000-00') {
    return res.status(400).json({ message: 'Invalid CPF' });
  }

  const db = router.db; // Lowdb instance
  const orderId = `ORDER${Math.floor(Math.random() * 1000000)}`;

  // Create the order object with user information
  const newOrder = {
    orderId: orderId,
    userInfo: {
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
    paymentDetails: paymentMethod === 'Boleto' || paymentMethod === 'Pix'
      ? { code: 'BARCODE123456' }
      : { status: 'Payment successful' }
  };

  // Save the order to the database
  db.get('orders')
    .push(newOrder)
    .write();

  res.status(200).json(newOrder);
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
