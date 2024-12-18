module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/Counseling',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key',
};
