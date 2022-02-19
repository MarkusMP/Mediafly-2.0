import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { rootReducer } from "../app/store";

interface WrapperProps {
  children?: React.ReactNode;
}

function render(ui: any, { route = "/", initialState = {} } = {}) {
  window.history.pushState({}, "Test page", route);
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper });
}

export * from "@testing-library/react";

export { render };
