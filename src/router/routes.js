import { Router } from "express";
import { figmaImageUrl,figmaComment } from "../controllers/figma.controller.js";

const router = Router();

router.post("/figma/v1/image", figmaImageUrl);
router.post("/figma/v1/comment", figmaComment);

export default router;