import { Router } from "express";
import { figmaImageUrl } from "../controllers/figma.controller.js";

const router = Router();

router.post("/figma/v1/image", figmaImageUrl);

export default router;