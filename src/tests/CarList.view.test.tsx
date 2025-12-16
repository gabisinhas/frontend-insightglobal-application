import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CarListView } from "../../src/components/CarList/CarList.view";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const user = userEvent.setup();

const mockCars = [
  { id: 1, make: "Toyota", model: "Corolla", year: 2020, color: "Black", desktop: "img1.jpg", tablet: "img1_t.jpg", mobile: "img1_m.jpg" },
  { id: 2, make: "Honda", model: "Civic", year: 2023, color: "Red", desktop: "img2.jpg", tablet: "img2_t.jpg", mobile: "img2_m.jpg" },
  { id: 3, make: "Ford", model: "Fusion", year: 2018, color: "White", desktop: "img3.jpg", tablet: "img3_t.jpg", mobile: "img3_m.jpg" },
];

const baseProps = {
  cars: mockCars,
  loading: false,
  error: null,
  search: "",
  sort: "make",
  onSearchChange: jest.fn(),
  onSortChange: jest.fn(),
};

describe("CarListView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display a loading spinner when loading is true", () => {
    render(<CarListView {...baseProps} loading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display an error message when error is present", () => {
    render(<CarListView {...baseProps} error="Failed to fetch data" />);
    expect(screen.getByText(/error loading cars/i)).toBeInTheDocument();
  });

  it("should render the title and the car list successfully", () => {
    render(<CarListView {...baseProps} />);

    expect(screen.getByRole("heading", { name: /welcome to car fleet!/i })).toBeInTheDocument();

    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText("Corolla")).toBeInTheDocument();
    expect(screen.getByText("Honda")).toBeInTheDocument();
    expect(screen.getByText("Civic")).toBeInTheDocument();
    expect(screen.getByText("Ford")).toBeInTheDocument();
    expect(screen.getByText("Fusion")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /add new car/i })).toBeInTheDocument();
  });

  it("should display 'No cars found' message when the cars array is empty and there is a search term", () => {
    render(<CarListView {...baseProps} cars={[]} search="NonExistentCar" />);
    
    expect(screen.getByText(/no cars found for "NonExistentCar"/i)).toBeInTheDocument();
    expect(screen.queryByText(/toyota/i)).not.toBeInTheDocument();
  });

  it("should call onSearchChange when typing in the search field", async () => {
    render(<CarListView {...baseProps} />);

    const searchInput = screen.getByLabelText(/search by model/i);
    await user.type(searchInput, "honda");

    expect(baseProps.onSearchChange).toHaveBeenCalledTimes(5);
  });

  it("should navigate to /add-car when the 'Add New Car' button is clicked", async () => {
    render(<CarListView {...baseProps} />);

    const addButton = screen.getByRole("button", { name: /add new car/i });
    await user.click(addButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/add-car");
  });
});