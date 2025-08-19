import { imageUrlGenerator } from "../services/figma.service.js";

export async function figmaImageUrl(req,res){
    // The prompt sended by the client
    let { figma_url } = req.body;

    //Configuration of deepseek response
    let response_url = await imageUrlGenerator(figma_url)

    // Response to  POST petition
    res.status(200).json({
        "image_url": response_url,

    })
}