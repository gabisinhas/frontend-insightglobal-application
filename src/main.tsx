import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import { makeServer } from "./mocks/server";
import "./App.css";
import { BrowserRouter } from "react-router-dom";


const client = new ApolloClient({
  uri: "/graphql", 
  cache: new InMemoryCache(),
});

makeServer();

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);