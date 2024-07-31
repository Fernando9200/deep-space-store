const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/offers/:offerCode/create_order', (req, res) => {
  const { cpf } = req.body;
  if (cpf === '000.000.000-00') {
    return res.status(400).json({ message: 'Invalid CPF' });
  }
  res.status(200).json({
    orderId: 'ORDER12345',
    status: 'success',
    paymentDetails: req.body.paymentMethod === 'Boleto' || req.body.paymentMethod === 'Pix'
      ? { code: 'BARCODE123456' }
      : { status: 'Payment successful' }
  });
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
