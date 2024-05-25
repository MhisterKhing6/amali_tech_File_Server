import { DashBoardElement } from "./dasboardElement"
import { Row, Container } from "react-bootstrap"
import { MdAssignmentAdd } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";


const AdminDashboard = ()=> {
    let actions = [{url:"/admin/upload-file", title: "Upload File", desc:"involves transferring data from a local device to a remote server, typically via the internet. Users select a file, initiate the upload process, and await completion confirmation. This action enables sharing, storage, and collaboration across digital platforms, facilitating efficient data exchange and accessibility.", "icon": <MdAssignmentAdd style={{fontSize: "3rem"}} />},
                   {url: "/admin/view-file" , "title": "Files", desc:"Examining database files offers valuable insights into stored data, usage trends, and relevance. Understanding access patterns and information structure enables informed decisions and resource allocation, optimizing operations. These insights aid in maintaining data integrity, improving efficiency, and aligning strategies with organizational goals and objectives.", icon: <CiViewBoard style={{fontSize: "3rem"}} /> },
                   
                ]
    
    return(
        <>
        <Container fluid >
            <Row>
            {
                actions.map((val) => {
                    return (
                        <DashBoardElement url={val.url} key={val.title} title={val.title} desc={val.desc}>
                            {val.icon}
                        </DashBoardElement>
                    )
                })
            }
            </Row>
        </Container>
        </>
    )
}

export {AdminDashboard}
