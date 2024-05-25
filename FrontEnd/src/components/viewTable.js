import {Table} from 'react-bootstrap'

function FilesStats() {
    let filesDataset = [{"title": "kofi Asarsfjsfsfkslfjslfslfjslfjslkfjslfjslfje", "emailSent":2, "download":2}, {"title": "kofi Asare", "emailSent":2, "downloads":2}, {"title": "kofi Asare", "emailSent":2, "downloads":2}]
  return (
    <Table striped bordered hover className="container mx-auto">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Email Sent</th>
          <th>Downloads</th>
        </tr>
      </thead>
      <tbody>
        {filesDataset.map((val, index) => {
           return  (<tr key={val.title}>
            <td>{index + 1 }</td>
            <td>{val.title}</td>
            <td>{val.emailSent}</td>
            <td>{val.download}</td>
          </tr>)
        })}
      </tbody>
    </Table>
  );
}

export {FilesStats}
