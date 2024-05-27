import { backend, token } from "./config"
import { getToken, saveToken } from "./localstorage";

const postToBackend = async (apiEndpoint, data, token="") => {
    /** 
     * postToBackend: uses fetch to post data to backedn
     */
    let url = backend.url + apiEndpoint
  // Default options are marked with *
  try {
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return {data: await response.json(), status: response.status} ;
  }catch (err) {
      console.log(err)
      return {data: {"reason": "Network Error check ur internet"}, status: "errr"}    
    } // parses JSON response into native JavaScript objects
    
}

const getFromBackend = async (apiEndpoint, token="") => {
  /** 
   * postToBackend: uses fetch to post data to backedn
   */
  let url = backend.url + apiEndpoint
// Default options are marked with *
try {
  const response = await fetch(url, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  return {data: await response.json(), status: response.status}
}
catch(err) {
  console.log(err)
  return {data: {"reason": "Network Error check ur internet"}, status: "errr"}
}
   ; // parses JSON response into native JavaScript objects
  
}



//check if authenticatiedd


export {postToBackend, getFromBackend}