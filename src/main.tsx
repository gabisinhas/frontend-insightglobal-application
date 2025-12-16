import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import { worker } from "./mocks/browser";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

async function start() {
  await worker.start({
    onUnhandledRequest: 'bypass', 
  });

  ReactDOM.createRoot(
    document.getElementById("root")!
  ).render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

start();