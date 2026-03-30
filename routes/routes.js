const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middleware/auth");

router.get(
  "/admin/dashboard",
  verifyToken,
  authorizeRole("admin"),
  (req, res) => res.json({ message: "Welcome Admin!" }),
);

router.delete(
  "/admin/posts/:id",
  verifyToken,
  authorizeRole("admin", "moderator"),
  (req, res) => res.json({ message: `Post ${req.params.id} deleted` }),
);

router.get(
  "/profile",
  verifyToken,
  authorizeRole("admin", "moderator", "user"),
  (req, res) => res.json({ profile: req.user }),
);

module.exports = router;
