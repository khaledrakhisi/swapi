import { BrowserRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";

import App from "../App";

const MockApp = () => {
  window.scrollTo = jest.fn();
  return (
    <BrowserRouter>
      <App />
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

test("the App responsivness as expected", async () => {
  // Change the viewport to 500px.
  global.innerWidth = 500;
  // Trigger the window resize event.
  global.dispatchEvent(new Event("resize"));
  const { getByText } = renderComponent();
  await waitFor(() => getByText(/with caching/i));

  expect(getByText(/with caching/i)).toBeInTheDocument();
});
