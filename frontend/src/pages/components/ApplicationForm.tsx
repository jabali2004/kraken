import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  ApplicationDTO,
  ApplicationsApi,
  KeyValuePair,
  MetadataDTO,
  MinimalApplicationDTO,
} from '../../api';
import { API_CONFIGURATION } from '../../const/Configuration';

type Props = {
  application: MinimalApplicationDTO;
  onClose: () => void;
};

export default function ApplicationForm({ application, onClose }: Props) {
  const applicationApi = new ApplicationsApi(API_CONFIGURATION);

  const [metadata, setMetadata] = React.useState<KeyValuePair[]>([]);
  const [dependencies, setDependencies] = React.useState<string[]>([]);

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<MinimalApplicationDTO>({ defaultValues: application });

  React.useEffect(() => {
    setMetadata(application.metadata);
    setDependencies(application.dependsOn);
  }, [application]);

  function save() {
    console.log(application);
    if (application.id) {
      applicationApi
        .applicationsControllerUpdate(application.id, {
          name: getValues().name,
          dependsOn: dependencies,
          metadata: metadata,
        })
        .then((res) => {
          setValue('name', res.data.name);
        });
    } else {
      applicationApi
        .applicationsControllerCreate({
          name: getValues().name,
          dependsOn: dependencies,
          metadata: metadata,
        })
        .then((res) => {
          setValue('name', res.data.name);
          onClose();
        });
    }
  }

  function addMetadata() {
    setMetadata([...metadata, { key: '', value: '' } as KeyValuePair]);
  }

  function removeMetadata(i: number) {
    setMetadata((metadata) => metadata.filter((v, idx) => idx !== i));
  }

  function updateMetadataKey(e: any, i: number) {
    e.preventDefault();

    const newArr = [...metadata];
    newArr[i].key = e.target.value;
    setMetadata(newArr);
  }

  function updateMetadataValue(e: any, i: number) {
    e.preventDefault();

    const newArr = [...metadata];
    newArr[i].value = e.target.value;
    setMetadata(newArr);
  }

  function addDependency() {
    setDependencies([...dependencies, '']);
  }

  function removeDependency(i: number) {
    setDependencies((dependencies) => dependencies.filter((v, idx) => idx !== i));
  }

  function updateDependency(e: any, i: number) {
    e.preventDefault();

    const newArr = [...dependencies];
    newArr[i] = e.target.value;
    setDependencies(newArr);
  }

  return (
    <>
      <form onSubmit={save}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="divider"></div>
        <div>
          {dependencies.map((x, i) => {
            return (
              <div key={'dep' + i} className="p-4">
                <input
                  id={'dep' + i}
                  className="input"
                  value={x}
                  onChange={(e) => {
                    updateDependency(e, i);
                  }}
                />
                <button
                  type="button"
                  className="btn ml-2"
                  onClick={() => removeDependency(i)}>
                  Delete
                </button>
              </div>
            );
          })}
          <button type="button" className="btn" onClick={addDependency}>
            Add dependency
          </button>
        </div>

        <div className="mt-4">
          {metadata.map((x, i) => {
            return (
              <div key={'meta' + i} className="p-4">
                <input
                  className="input"
                  onChange={(e) => updateMetadataKey(e, i)}
                  defaultValue={x.key}
                />{' '}
                :{' '}
                <input
                  className="input"
                  onChange={(e) => updateMetadataValue(e, i)}
                  defaultValue={x.value}
                />
                <button
                  type="button"
                  className="btn ml-2"
                  onClick={() => removeMetadata(i)}>
                  Delete
                </button>
              </div>
            );
          })}

          <button type="button" className="btn" onClick={addMetadata}>
            Add metadata
          </button>
        </div>
      </form>

      <div className="flex mt-4 justify-end">
        <button type="submit" onClick={save} className="btn btn-wide">
          Save
        </button>
      </div>
    </>
  );
}
