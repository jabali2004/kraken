import React from 'react';
import { ApplicationDTO, MinimalApplicationDTO } from '../../api';
import ApplicationRow from './ApplicationRow';

type Props = {
  applications: MinimalApplicationDTO[];
  onLoadMore: () => void;
  onEmpty: () => void;
};

export default function ApplicationTable({ applications, onLoadMore, onEmpty }: Props) {
  const [rows, setRows] = React.useState<MinimalApplicationDTO[]>(applications);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setRows(applications);
    setIsLoading(false);
  }, [applications]);

  React.useEffect(() => {
    if (rows.length === 0 && applications.length !== 0) {
      onEmpty();
    }
  }, [rows]);

  function handleDelete(row: MinimalApplicationDTO) {
    setRows((rows) => rows.filter((x) => x.id !== row.id));
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>#Id</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, i) => {
              return (
                <ApplicationRow
                  key={row.id}
                  onDelete={() => {
                    handleDelete(row);
                  }}
                  onReset={onEmpty}
                  application={row}
                />
              );
            })
          ) : (
            <tr>
              <td>No applications found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="w-full mt-4 flex justify-center">
        <button
          className="btn btn-wide disabled:loading"
          disabled={isLoading}
          onClick={() => {
            onLoadMore();
            setIsLoading(true);
          }}>
          Load more
        </button>
      </div>
    </div>
  );
}
