import { Container, Col, Row } from "react-bootstrap"
import { useState, useEffect} from "react"
import { FileItem } from "./fileItem"




const ViewFiles = ({files}) => {
    useEffect(() => {
    }, [])
    return (
        <Container className="container mx-auto">
            <Row className="w-100">
                {
                    files.map(file => {
                        return (
                            <Col className="mb-1" key={file.title} xs={6} md={4} lg = {3}>
                            <FileItem file={file} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export {ViewFiles}