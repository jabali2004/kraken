import { Box, Modal } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ApplicationDTO, MinimalApplicationDTO } from '../../api';
import ApplicationForm from '../components/ApplicationForm';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80vh',
};

type Props = {
  state: boolean;
  application: MinimalApplicationDTO;
  onClose: () => void;
};

export default function EditApplicationDialog({ state, application, onClose }: Props) {
  const [open, setOpen] = React.useState(state);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  React.useEffect(() => {
    setOpen(state);
  }, [state]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        sx={style}
        className="p-4 bg-base-200 shadow border max-h-screen overflow-auto">
        <div className="w-full flex justify-between">
          <h1>{application.name}</h1>
          <span>{application.id}</span>
        </div>

        <div className="w-full mt-8">
          <ApplicationForm application={application} onClose={handleClose} />
        </div>
      </Box>
    </Modal>
  );
}
