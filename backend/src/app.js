const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const {errorHandler} = require('./middleware/error'); 
const authRoutes = require('./modules/auth/routes');
const loanRoutes = require('./modules/loans/routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: ['http://localhost:5173']}));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ok: true }));

app.use('/auth', authRoutes);
app.use('/loans', loanRoutes);

app.get('/__routes', (_req, res) => {
  const out = [];
  // @ts-ignore internal stack
  app._router.stack.forEach(layer => {
    if (layer.name === 'router' && layer.handle?.stack) {
      layer.handle.stack.forEach(r => {
        if (r.route?.path && r.route?.methods) {
          Object.keys(r.route.methods).forEach(m => out.push(`${m.toUpperCase()} ${r.route.path}`));
        }
      });
    } else if (layer.route?.path && layer.route?.methods) {
      Object.keys(layer.route.methods).forEach(m => out.push(`${m.toUpperCase()} ${layer.route.path}`));
    }
  });
  res.json(out);
});


app.post('/echo', (req, res) => res.json({ body: req.body }));

app.use(errorHandler);

module.exports = app;