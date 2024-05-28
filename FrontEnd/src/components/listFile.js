import {Button} from 'react-bootstrap';
import {Card, DropdownButton, ButtonGroup, Dropdown} from 'react-bootstrap';
import { LiaDownloadSolid } from "react-icons/lia";
import { getFromBackend } from '../utils/backendCalls';
import { getToken } from '../utils/localstorage';
import { token } from '../utils/config';

function FileItem({fileId}) {
const downloadFile =async (fileId) => {
  let downloadFile =  await getFromBackend(`/files/download/${fileId}`, getToken(token.customerTokenKey))
  alert("downloading")
}
  return (
    <Card>
      <Card.Header as="h5">Featured</Card.Header>
      <Card.Body>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <DropdownButton as={ButtonGroup} title={<LiaDownloadSolid style={{width:"80px", height:"30px"}}/>} id="bg-nested-dropdown">
        <Dropdown.Item eventKey="1" onClick={ async (val) => {
            await downloadFile(fileId)
        }}>Download</Dropdown.Item>
        <Dropdown.Item eventKey="2">Email</Dropdown.Item>
      </DropdownButton>
      </Card.Body>
    </Card>
  );
}
export {FileItem}