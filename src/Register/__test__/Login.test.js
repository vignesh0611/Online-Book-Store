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