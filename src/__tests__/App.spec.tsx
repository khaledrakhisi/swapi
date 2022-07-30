import { BrowserRouter } from "react-router-dom";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import App from "../App";
import { CharactersContextProvider } from "../context/character-context";

const MockApp = () => {
  window.scrollTo = jest.fn();
  return (
    <BrowserRouter>
      <CharactersContextProvider>
        <App />
      </CharactersContextProvider>
    </BrowserRouter>
  );
};

const renderComponent = () => render(<MockApp />);
test("if it renders without crashing", async () => {
  const { getByText } = renderComponent();
  await waitFor(() => getByText(/swapi consumer!/i));

  expect(getByText(/swapi consumer!/i)).toBeInTheDocument();
});

afterEach(() => {
  global.innerWidth = 1024;
  global.dispatchEvent(new Event("resize"));
});

describe("App responsivness tests", () => {
  test("the App responsivness as expected", async () => {
    // Change the viewport to 500px.
    global.innerWidth = 500;
    // Trigger the window resize event.
    global.dispatchEvent(new Event("resize"));
    const { getByText } = renderComponent();
    await waitFor(() => getByText(/with caching/i));

    expect(getByText(/with caching/i)).toBeInTheDocument();
  });
});

describe("App e2e tests", () => {
  let search: HTMLElement | undefined;
  beforeEach(() => {
    const { getByRole } = render(<MockApp />);
    search = getByRole("searchbox");
  });
  afterEach(cleanup);

  it("Should render a searchbox as expected", () => {
    expect(search).toBeInTheDocument();
  });

  it("Should fetch real data as expected", async () => {
    await waitFor(
      () => {
        const divs = screen.getAllByTestId("cell_name");
        expect(divs.length).toBe(10);
      },
      {
        timeout: 8000,
      }
    );
  }, 10000);
});
