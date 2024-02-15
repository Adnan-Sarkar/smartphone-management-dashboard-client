import MainLayout from "./components/layout/MainLayout";
import ProtechtedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <ProtechtedRoute>
      <MainLayout />
    </ProtechtedRoute>
  );
}

export default App;
