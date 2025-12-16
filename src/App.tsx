import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import { CarList } from "./components/CarList/CarList.controller";
import { AddCarForm } from "./components/AddCarForm/AddCarForm.controller";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Box } from "@mui/material";
import './App.css';

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<CarList />} />
            <Route
              path="/add-car"
              element={<AddCarForm onAddCar={() => {}} />}
            />
            <Route path="*" element={<CarList />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ApolloProvider>
  );
}
