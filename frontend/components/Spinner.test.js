// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from "react"
import Spinner from "./Spinner"
import { render, screen } from "@testing-library/react"


test('sanity', () => {
  expect(true).toBe(true)
})

test("renders component without errors", () => {
  render(<Spinner />)
})

test("renders correctly depending on props", () => {
  const { rerender } = render(<Spinner on={true}/>)

  const spinner = screen.queryByText(/please wait.../i)

  expect(spinner).not.toBeNull();
  expect(spinner).toBeVisible();
  
})
