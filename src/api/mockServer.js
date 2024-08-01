const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/offers/:offerCode/create_order', (req, res) => {
  const { cpf, items, paymentMethod } = req.body;

  // Log the items for debugging (if necessary)
  console.log('Order items:', items);

  // Basic validation for demo purposes
  if (cpf === '000.000.000-00') {
    return res.status(400).json({ message: 'Invalid CPF' });
  }

  const orderId = `ORDER${Math.floor(Math.random() * 1000000)}`;
  const response = {
    orderId: orderId,
    status: 'success',
    paymentDetails: paymentMethod === 'Boleto' || paymentMethod === 'Pix'
      ? { code: 'BARCODE123456' }
      : { status: 'Payment successful' }
  };

  res.status(200).json(response);
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
