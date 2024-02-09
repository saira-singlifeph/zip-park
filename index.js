const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerDocs = require('./src/services/utils/swagger.util');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const databaseUrl = process.env.DATABASE_URL;
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB connection is now established successfully');
});

// ROUTES
const parkRoutes = require('./src/modules/parking-system/park.module');

app.use('/api/v1/parks', parkRoutes);

app.listen(port, () => {
  console.log('Running on the port:', port);
  swaggerDocs(app);
});
