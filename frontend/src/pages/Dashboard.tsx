import React, { useState } from 'react';
import { ApplicationsApi, CreateApplicationDTO, MinimalApplicationDTO } from '../api';
import ApplicationTable from './components/ApplicationTable';
import { API_CONFIGURATION } from '../const/Configuration';
import NewApplicationDialog from './dialogs/NewApplicationDialog';

type Props = {};

export default function Dashboard({}: Props) {
  const [applications, setApplications] = useState<MinimalApplicationDTO[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [createMode, setCreateMode] = React.useState<boolean>(false);

  const applicationApi = new ApplicationsApi(API_CONFIGURATION);

  React.useEffect(() => {
    getApplications();
  }, []);

  function getApplications(skip: number = 0, reset: boolean = false) {
    applicationApi.applicationsControllerFindAll(5, skip).then((res) => {
      if (reset) {
        setApplications(res.data);
      } else {
        setApplications([...applications, ...res.data]);
      }
    });
  }

  function reset() {
    setSkip(0);
    getApplications(0, true);
  }

  function loadMore() {
    const newSkip = skip + 5;
    setSkip(newSkip);
    getApplications(newSkip);
  }

  function createApplication() {
    setCreateMode(true);
  }

  return (
    <div>
      <div className="w-full flex justify-end mb-4">
        <button type="button" className="btn" onClick={createApplication}>
          Add new Application
        </button>
      </div>

      <ApplicationTable
        applications={applications}
        onEmpty={reset}
        onLoadMore={loadMore}
      />

      <NewApplicationDialog onClose={reset} state={createMode} />
    </div>
  );
}
