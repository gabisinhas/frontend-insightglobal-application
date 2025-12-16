import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddCarFormView } from "../components/AddCarForm/AddCarForm.view";

const user = userEvent.setup();

const validCarData = {
  make: "Honda",
  model: "Civic",
  year: "2023",
  color: "Red",
  image: "http://example.com/civic.jpg",
};

describe("AddCarFormView", () => {
  const mockOnAddCar = jest.fn();
  const mockOnInputChange = jest.fn();
  const mockFormData = {
    make: "",
    model: "",
    year: "",
    color: "",
    image: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form with all required fields and the title", () => {
    render(
      <AddCarFormView
        onAddCar={mockOnAddCar}
        onInputChange={mockOnInputChange}
        formData={mockFormData}
      />
    );

    expect(
      screen.getByRole("heading", { level: 4, name: /register a new car/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/fill in the details below/i)
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/make/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /add car/i })
    ).toBeInTheDocument();
  });

  it("should call onAddCar with valid data and show success snackbar", async () => {
    render(
      <AddCarFormView
        onAddCar={mockOnAddCar}
        onInputChange={mockOnInputChange}
        formData={mockFormData}
      />
    );

    await user.type(screen.getByLabelText(/make/i), validCarData.make);
    await user.type(screen.getByLabelText(/model/i), validCarData.model);
    await user.type(screen.getByLabelText(/year/i), validCarData.year);
    await user.type(screen.getByLabelText(/color/i), validCarData.color);
    await user.type(screen.getByLabelText(/image url/i), validCarData.image);

    await user.click(screen.getByRole("button", { name: /add car/i }));

    await waitFor(() => {
      expect(mockOnAddCar).toHaveBeenCalledTimes(1);
      expect(mockOnAddCar).toHaveBeenCalledWith(validCarData);
    });

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent("Form submitted successfully!");
  });

  it("should display validation errors when submitting empty form", async () => {
    render(
      <AddCarFormView
        onAddCar={mockOnAddCar}
        onInputChange={mockOnInputChange}
        formData={mockFormData}
      />
    );

    await user.click(screen.getByRole("button", { name: /add car/i }));

    await waitFor(() => {
      expect(screen.getByText("Make is required")).toBeInTheDocument();
      expect(screen.getByText("Model is required")).toBeInTheDocument();
      expect(screen.getByText("Year is required")).toBeInTheDocument();
      expect(screen.getByText("Color is required")).toBeInTheDocument();
      expect(screen.getByText("Image URL is required")).toBeInTheDocument();
    });

    expect(mockOnAddCar).not.toHaveBeenCalled();
  });

  it("should show validation error for invalid year format", async () => {
    render(
      <AddCarFormView
        onAddCar={mockOnAddCar}
        onInputChange={mockOnInputChange}
        formData={mockFormData}
      />
    );

    await user.type(screen.getByLabelText(/make/i), validCarData.make);
    await user.type(screen.getByLabelText(/model/i), validCarData.model);
    await user.type(screen.getByLabelText(/year/i), "202");
    await user.type(screen.getByLabelText(/color/i), validCarData.color);
    await user.type(screen.getByLabelText(/image url/i), validCarData.image);

    await user.click(screen.getByRole("button", { name: /add car/i }));

    await waitFor(() => {
      expect(screen.getByText("Enter a valid year")).toBeInTheDocument();
    });

    expect(mockOnAddCar).not.toHaveBeenCalled();
  });

  it("should show validation error for invalid image URL", async () => {
    render(
      <AddCarFormView
        onAddCar={mockOnAddCar}
        onInputChange={mockOnInputChange}
        formData={mockFormData}
      />
    );

    await user.type(screen.getByLabelText(/make/i), validCarData.make);
    await user.type(screen.getByLabelText(/model/i), validCarData.model);
    await user.type(screen.getByLabelText(/year/i), validCarData.year);
    await user.type(screen.getByLabelText(/color/i), validCarData.color);
    await user.type(screen.getByLabelText(/image url/i), "not-a-url");

    await user.click(screen.getByRole("button", { name: /add car/i }));

    await waitFor(() => {
      expect(screen.getByText("Enter a valid URL")).toBeInTheDocument();
    });

    expect(mockOnAddCar).not.toHaveBeenCalled();
  });
});
