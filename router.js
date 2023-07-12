const { Router } = require("express");
const productsRouter = require("./modules/products/routes/products.routes");
const loginRouter = require("./modules/users/routes/login.routes");
const usersRouter = require("./modules/users/routes/users.routes");

const router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/login", loginRouter);

module.exports = router;