const express = require("express");
const mongoose = require("./Config/config");

const customer_create_router = require("./Routes/Customer_info/createCustomer");
const customer_read_router = require("./Routes/Customer_info/readCustomer");
const customer_read_one_router = require("./Routes/Customer_info/getOneCustomer");
const customer_update_router = require("./Routes/Customer_info/updateCustomer");
const customer_delete_router = require("./Routes/Customer_info/deleteCustomer");
const customer_search_router = require("./Routes/Customer_info/searchCustomer");
const customer_many_router = require("./Routes/Customer_info/manyCustomer");
const customer_keyword_pagination = require("./Routes/Customer_info/pagination_search_customer");
const customer_pagination_router = require("./Routes/Customer_info/pagination");

const product_create_router = require("./Routes/Product_info/createProduct");
const product_read_router = require("./Routes/Product_info/readProduct");
const product_read_one_router = require("./Routes/Product_info/getOneProduct");
const product_update_router = require("./Routes/Product_info/updateProduct");
const product_delete_router = require("./Routes/Product_info/deleteProduct");
const product_populate_router = require("./Routes/Product_info/populate");

const order_payment_router = require("./Routes/Order/order_payment");

const recursive1_router = require("./Routes/Recursion/recursive1");
const recursive2_router = require("./Routes/Recursion/recursive2");
const recursive3_router = require("./Routes/Recursion/recursive3");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/customer/create", customer_create_router);
app.use("/customer/read", customer_read_router);
app.use("/customer/read-one", customer_read_one_router);
app.use("/customer/update", customer_update_router);
app.use("/customer/delete", customer_delete_router);
app.use("/customer/search", customer_search_router);
app.use("/manyCustomer", customer_many_router);
app.use("/customer/pagination", customer_pagination_router);
app.use("/customer-search-pagination", customer_keyword_pagination);

app.use("/product/create", product_create_router);
app.use("/product/read", product_read_router);
app.use("/product/read-one", product_read_one_router);
app.use("/product/update", product_update_router);
app.use("/product/delete", product_delete_router);
app.use("/product/populate", product_populate_router);

app.use("/recursive1", recursive1_router);
app.use("/recursive2", recursive2_router);
app.use("/recursive3", recursive3_router);

app.use("/order&payment", order_payment_router);

app.listen(port, () => console.log(`Server is running on ${port}........ `));
