import Layout from "../src/pages/layout/index";
import FetchApiProvider from "./contexts/FetchApi"

const App = () => {






  return (
<FetchApiProvider>
    <Layout />

</FetchApiProvider>
)};

export default App