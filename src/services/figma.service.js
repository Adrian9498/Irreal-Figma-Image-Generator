const BASE_URL = "https://api.figma.com/v1"


/**
 * Image URL Generator given a figma node url
 * @param { String } url
 * @returns {String} image_url
 */
export async function imageUrlGenerator(url,figma_token){

    let { fileKey, nodeId } = parseFigmaUrl(url);




    let res_images = await fetch(`${BASE_URL}/images/${fileKey}?ids=${nodeId}`,{
        method: 'GET',
        headers: {
            "X-Figma-Token": figma_token
        },
    })

    res_images = await res_images.json()

    let objResult = {
      image_url: res_images.images[nodeId],
      fileKey,
      nodeId
    }

    return objResult
}

export async function commentGenerator(fileKey,nodeId,comment,coordinates,figma_token){


  let res_comments = await fetch(`${BASE_URL}/files/${fileKey}/comments`,{
    method: 'POST',
    headers:{
      "X-Figma-Token": figma_token,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      message:comment,
      client_meta:{
        node_id: nodeId,
        node_offset:{
          x: coordinates.x,
          y: coordinates.y
        }
      }
    })
  })
  
  res_comments = await res_comments.json();



  return res_comments.id;

}

/**
 * Function that extracts the necesary info to do the petition
 * @param { String } rawUrl 
 * @returns { Object } res
 */

function parseFigmaUrl(rawUrl) {
  const u = new URL(rawUrl);

  
  const m = u.pathname.match(/^\/(file|design|proto)\/([A-Za-z0-9]+)\//);
  if (!m) throw new Error("URL de Figma no reconocida");
  const fileKey = m[2];

  
  let nodeId = u.searchParams.get("node-id")
            || u.searchParams.get("starting-point-node-id")
            || null;

 
  if (nodeId) {
    nodeId = decodeURIComponent(nodeId);
    if (/^\d+-\d+$/.test(nodeId)) {
      nodeId = nodeId.replace("-", ":");
    }
  }

  return { fileKey, nodeId };
}