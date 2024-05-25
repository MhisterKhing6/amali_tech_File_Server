import { Button, Card, Container, Form } from "react-bootstrap"
import { useState } from "react"
import { token } from "../utils/config"
import { postToBackend } from "../utils/backendCalls"
import { getToken } from "../utils/localstorage"
import { SpinerGrow } from "./spinerGrow"
import { convertBase64} from "../utils/encodingFunctions.js"
const UploadFileForm = () => {

    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [fileData, setFileData] = useState("")
    let [fileName, setFileName] = useState("")

    let [submission, setSubmission] = useState(false)

    return (
        <>
        {submission && <SpinerGrow />}

        {!submission && <Container className="w-100 mx-auto p-2 p-md-3 p-lg-5" >
            <Card className="p-2">
                <Form onSubmit={async (val) => {
                    val.preventDefault()
                    setSubmission(true)
                    //cond here
                    if(!fileData)
                    alert("couldnt upload file check if file is not corrupted")
                    //submit information to backend
                    let uploadDetials = {fileName, data:fileData, title, description}
                    //post to packen
                    console.log(getToken(token.adminTokenKey))
                    let response = await postToBackend("/admin/upload-file", uploadDetials, getToken(token.adminTokenKey))
                    if(response.status === 201){
                        alert("upload succes")
                        setFileName("")
                        setFileData("")
                        setTitle("")
                        setDescription("")
                    }
                    console.log(response)
                    alert(response.data.message)
                    setSubmission(false)
                    
                }}>
                    <Form.Group className="my-2">
                        <Form.Label><b>Title*</b></Form.Label>
                        <Form.Control size="lg" required   isValid={title} type="text" value={title} onChange={(val) => setTitle(val.target.value)}/>
                    </Form.Group>

                    <Form.Group className="my-2">
                        <Form.Label><b>Description </b></Form.Label>
                        <Form.Control isValid={description} style={{minHeight: "15vh"}} className="p-2" required as="textarea" value={description} onChange={(val) => setDescription(val.target.value)} />
                    </Form.Group> 

                    <Form.Group className="my-2">
                        <Form.Label><b>Upload Script </b></Form.Label>
                        <Form.Control required type="file" onChange={async (val) => {
                            let file = val.target.files[0]
                            //check if file contain extension
                                setFileName(file.name)
                                try {
                                const base64 = await convertBase64(file)
                                setFileData(base64.split(",").pop())
                                }catch(err) {
                                    setFileData("")
                                }
                        }} />
                        <Form.Control.Feedback type="valid">Please upload a file</Form.Control.Feedback>
                    </Form.Group>
                        <Button className="w-100 my-2" type="submit">Save</Button>
                </Form>
            </Card>
        </Container> }
        </>
    )
}

export {UploadFileForm}