const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const sequelize = require('./src/config/db');

app.use(express.json());
app.use(cors({
  origin: "https://camp-explore-a1583b8ebde7.herokuapp.com"
}));

sequelize.sync();


app.use('/images', express.static(path.join(__dirname, 'upload/images')));

const userRoute = require('./src/routes/userRoute.js');
const productRoute = require('./src/routes/productRoute.js');
const cartRoute = require('./src/routes/cartRoute.js');
const categoryRoute = require('./src/routes/categoryRoute.js');
const orderRoutes = require('./src/routes/orderRoute.js');
const stripeRoute = require('./src/routes/Stripe.js');
const statistic = require('./src/routes/statisticRoute.js');

app.use('/api/auth/', userRoute);
app.use('/api/product/', productRoute);
app.use('/api/cart/', cartRoute);
app.use('/api/category/', categoryRoute);
app.use('/api/order/', orderRoutes);
app.use('/api/stripe/', stripeRoute);
app.use('/api/statistic/', statistic);

// Pour le front standard
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
app.get("/", (req, res) => {
  res.send("Root");
});


// Pour l'espace admin
// app.use('/admin', express.static(path.join(__dirname, '../admin/build')));
// app.get('/admin/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../admin/build', 'index.html'));
// });

const port = process.env.PORT || 4000;
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
