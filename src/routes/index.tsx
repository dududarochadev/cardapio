import { Navigate, Route, Routes } from 'react-router-dom';
import { DetalheProduto, PaginaInicial } from '../pages';

export const AppRoutes: React.FC = () => {

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<PaginaInicial />} />
      <Route path="/produto/:id?" element={<DetalheProduto />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />}></Route>
    </Routes>
  );
};