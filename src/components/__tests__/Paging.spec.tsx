import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { UiContextProvider } from "../../context/ui-context";
import { Paging } from "../Paging";

const MockComponent = () => {
  window.scrollTo = jest.fn();
  return (
    <UiContextProvider>
      <Paging pagesCount={3} />
    </UiContextProvider>
  );
};

describe("Paging tests", () => {
  let btn_next: HTMLElement | undefined;
  let btn_previous: HTMLElement | undefined;

  beforeEach(() => {
    const { getAllByRole } = render(<MockComponent />);

    // Step 1: Targeting buttons
    btn_next = getAllByRole("button").find((btn) => btn.id === "next");
    btn_previous = getAllByRole("button").find((btn) => btn.id === "previous");
  });
  afterEach(cleanup);

  it("should render paging compenent as expected", () => {
    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
  });
  it("Should increment when user click next button as expected", () => {
    fireEvent.click(btn_next!);

    expect(screen.getByText(/page 2 of 3/i)).toBeInTheDocument();
  });

  it("Should decrement when user click prevois button as expected", () => {
    fireEvent.click(btn_previous!);

    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
  });

  it("Should not decrement when current page is 1 as expected", () => {
    fireEvent.click(btn_previous!);

    expect(screen.queryByText(/page 0 of 3/i)).toBeNull();
  });

  it("Should not increment when current page is equal total pages as expected", () => {
    fireEvent.click(btn_next!); // increment to 2
    fireEvent.click(btn_next!); // increment to 3
    fireEvent.click(btn_next!); // increment to 4

    expect(screen.queryByText(/page 4 of 3/i)).toBeNull();
  });
});
