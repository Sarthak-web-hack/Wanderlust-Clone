const mongoose = require('mongoose');

const uri = 'mongodb+srv://pushkrajjagatap_db_user:SbYrcbEyM0KPrmsk@cluster0.3rwg607.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));
