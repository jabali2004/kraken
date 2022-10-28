import React from 'react';
import { ApplicationDTO, ApplicationsApi, MinimalApplicationDTO } from '../../api';
import { API_CONFIGURATION } from '../../const/Configuration';
import EditApplicationDialog from '../dialogs/EditApplicationDialog';

type Props = {
  application: MinimalApplicationDTO;
  onDelete: () => void;
  onReset: () => void;
};

export default function ApplicationRow({ application, onDelete, onReset }: Props) {
  const applicationApi = new ApplicationsApi(API_CONFIGURATION);

  const [editMode, setEditMode] = React.useState<boolean>(false);

  function deleteApplication() {
    applicationApi.applicationsControllerRemove(application.id).then((res) => {
      onDelete();
    });
  }

  function editApplication() {
    setEditMode(true);
  }

  return (
    <tr key={application.id}>
      <th>{application.id}</th>
      <td>{application.name}</td>
      <td>{new Date(application.createdAt).toLocaleString()}</td>
      <td>{new Date(application.updatedAt).toLocaleString()}</td>
      <td>
        <button
          className="btn btn-outline btn-sm btn-warning mr-2"
          onClick={editApplication}>
          Edit
        </button>
        <button className="btn btn-outline btn-sm btn-error" onClick={deleteApplication}>
          Delete
        </button>

        <EditApplicationDialog
          onClose={() => {
            setEditMode(false);
            onReset();
          }}
          application={application}
          state={editMode}
        />
      </td>
    </tr>
  );
}
