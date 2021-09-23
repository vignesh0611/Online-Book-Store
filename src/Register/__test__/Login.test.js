import { render, screen, fireEvent } from '@testing-library/react';
import TestComponent from '../../AdditionalComponents/TestComponents';
import Login from '../Login';

it('renders login page', () => {
    render(
        <TestComponent>
            <Login />
        </TestComponent>
    );
    const loginComponents = screen.getAllByText("Login")
    expect(loginComponents.length).toBeTruthy();
});
it("should check input field is working properly", () => {
    render(
        <TestComponent>
            <Login />
        </TestComponent>
    )
    // Finding username field and firing change event
    const usernameInput = screen.getByLabelText("E-mail")
    fireEvent.change(usernameInput, { target: { value: "testuser" } })
    // The change should be reflected in the input field
    expect(usernameInput.value).toBe("testuser")
})

it("should check proper error message is displayed when fields are empty", async () => {
    // Rendering login component
    render(
        <TestComponent>
            <Login />
        </TestComponent>
    )
    // Finding and clicking on login button
    const loginButton = screen.getByRole("button", { name: /login/i })
    fireEvent.click(loginButton)
    // Finding alert msg with required text
    const reqAlert = await screen.findAllByText(/required/i)
    // Two alert messages must be there for username and password
    expect(reqAlert.length).toBe(2)
})


