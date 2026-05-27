import { render, screen } from "@testing-library/react";

import Login from "./Login";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../app/store";

describe("Login Component", () => {
  test("renders login button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    const button = screen.getByRole("button", { name: /login/i });

    expect(button).toBeInTheDocument();
  });
});
