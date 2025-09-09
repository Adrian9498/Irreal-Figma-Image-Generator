import { imageUrlGenerator,commentGenerator } from "../services/figma.service.js";

export async function figmaImageUrl(req,res){
    // The prompt sended by the client
    let { figma_url, figma_token } = req.body;

    //Configuration of deepseek response
    let response_obj = await imageUrlGenerator(figma_url,figma_token)

    // Response to  POST petition
    res.status(200).json(response_obj)
}

export async function figmaComment(req,res){
    // The prompt sended by the client
    let { fileKey,nodeId,comment,coordinates,figma_token} = req.body;


    //Configuration of deepseek response
    let response_obj = await commentGenerator(fileKey,nodeId,comment,coordinates,figma_token)

    // Response to  POST petition
    res.status(200).json({id:response_obj})
}