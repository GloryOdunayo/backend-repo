// {HOST}/{VERSION}/{RESOURCE}/{PATH}/{QUERY}

import express, { Router } from "express";
import { activateAccount, login, register } from "../../controllers/auth.controller";
import { validateChannels as vc } from "../../middleware/header.middleware";

const router: Router = express.Router({mergeParams: true})

router.post("/register", register)
router.post("/login", vc, login)
router.put("/activate-account", activateAccount)

export default router;