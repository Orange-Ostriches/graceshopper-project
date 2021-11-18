const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const { isAdmin } = await User.findByToken(req.headers.authorization);
    if (isAdmin !== true) {
      const error = Error("Unauthorized access");
      error.status = 401;
      throw error;
    }
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});


// router.get("/:id", async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       const error = Error("User not found");
//       error.status = 404;
//       throw error;
//     }
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// })


