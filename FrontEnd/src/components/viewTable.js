import {Table} from 'react-bootstrap'

function FilesStats({files}) {
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
        {files.map((val, index) => {
           return  (<tr key={val.title}>
            <td>{index + 1 }</td>
            <td>{val.title}</td>
            <td>{val.emailSent}</td>
            <td>{val.downloads}</td>
          </tr>)
        })}
      </tbody>
    </Table>
  );
}

export {FilesStats}
