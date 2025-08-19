
const BASE_URL = "https://api.figma.com/v1"


/**
 * Image URL Generator given a figma node url
 * @param { String } url
 * @returns {String} image_url
 */
export async function imageUrlGenerator(url){

    let { fileKey, nodeId } = parseFigmaUrl(url);

    console.log(fileKey,nodeId)


    let res_images = await fetch(`${BASE_URL}/images/${fileKey}?ids=${nodeId}`,{
        method: 'GET',
        headers: {
            "X-Figma-Token": X_FIGMA_TOKEN
        },
    })

    res_images = await res_images.json()

    return res_images.images[nodeId]
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