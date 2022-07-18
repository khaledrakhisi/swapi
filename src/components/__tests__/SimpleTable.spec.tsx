import { cleanup, render, screen } from "@testing-library/react";

import CharactersContextProvider from "../../context/character-context";
import { MOCK_DATA } from "../../data/mock-data";
import { SimpleTable } from "../SimpleTable";

const MockComponent = () => {
  window.scrollTo = jest.fn();
  return (
    <CharactersContextProvider>
      <SimpleTable data={MOCK_DATA} />
    </CharactersContextProvider>
  );
};

describe("SimpleTable tests", () => {
  beforeEach(() => {
    render(<MockComponent />);
  });
  afterEach(cleanup);
  it("Should render table as expected", () => {
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/height/i)).toBeInTheDocument();
    expect(screen.getByText(/mass/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByText(/hair color/i)).toBeInTheDocument();
    expect(screen.getByText(/skin color/i)).toBeInTheDocument();
    expect(screen.getByText(/eye color/i)).toBeInTheDocument();
    expect(screen.getByText(/homeworld/i)).toBeInTheDocument();
    expect(screen.getByText("Films")).toBeInTheDocument();
  });
  it("Should display sorted data as expected", () => {
    /**
     *
     * The unsorted order is: D, A, C
     */
    const divs = screen.getAllByTestId("cell_name");

    /**
     *
     * The Sorted order should be: A, C, D
     */
    expect(divs[0].textContent).toBe("A");
    expect(divs[1].textContent).toBe("C");
    expect(divs[2].textContent).toBe("D");
  });
});
