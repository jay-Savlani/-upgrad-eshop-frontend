// importing routeController

import { RouteController } from "./routes";

// importing AuthProvider

import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <AuthProvider>
      
      <RouteController />
      
    </AuthProvider>
  );
}

export default App;
