import { createServer, Model } from 'miragejs';

const carList = [
  {
    id: "1",
    make: "Audi",
    model: "Q5",
    year: 2023,
    color: "Blue",
    mobile: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=300",
    tablet: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=900",
    desktop: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "2",
    make: "Audi",
    model: "A3",
    year: 2022,
    color: "Red",
    mobile: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=300",
    tablet: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=900",
    desktop: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "3",
    make: "Audi",
    model: "R8",
    year: 2024,
    color: "White",
    mobile: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=300",
    tablet: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=900",
    desktop: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "4",
    make: "BMW",
    model: "X5",
    year: 2023,
    color: "Black",
    mobile: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=300",
    tablet: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=900",
    desktop: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "5",
    make: "BMW",
    model: "M3",
    year: 2024,
    color: "Green",
    mobile: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=300",
    tablet: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=900",
    desktop: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "6",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2022,
    color: "Silver",
    mobile: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=300",
    tablet: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=900",
    desktop: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "7",
    make: "Mercedes-Benz",
    model: "GLE",
    year: 2023,
    color: "Gray",
    mobile: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=300",
    tablet: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=900",
    desktop: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "8",
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    color: "White",
    mobile: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=300",
    tablet: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=900",
    desktop: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "9",
    make: "Tesla",
    model: "Model Y",
    year: 2023,
    color: "Blue",
    mobile: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=300",
    tablet: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=900",
    desktop: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "10",
    make: "Ford",
    model: "Mustang",
    year: 2024,
    color: "Yellow",
    mobile: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=300",
    tablet: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=900",
    desktop: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=1200",
  },
];

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      car: Model,
    },
    seeds(server) {
      carList.forEach((car) => server.create("car", car));
    },
    routes() {
      this.passthrough();
      this.namespace = "";

      this.post("/graphql", (schema, request) => {
        const { query, variables } = JSON.parse(request.requestBody);

        if (query.includes('query GetCars')) {
          return {
            data: {
              cars: schema.all('car').models,
            },
          };
        }

        if (query.includes('mutation CreateCar')) {
          const input = variables.input;
          const newCar = schema.create('car', { ...input, id: Math.random().toString(36).substring(2, 9) });
          return {
            data: {
              createCar: newCar.attrs,
            },
          };
        }

        return {};
      });
    },
  });
}
