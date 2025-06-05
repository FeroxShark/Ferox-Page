const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    // Disable the default CSP so the meta tag in index.html controls it.
    contentSecurityPolicy: false,
  }),
);

app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
app.use(helmet.noSniff());

app.use(express.static(__dirname));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
