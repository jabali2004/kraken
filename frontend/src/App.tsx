import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<>Hello World</>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
