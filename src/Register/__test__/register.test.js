import { render, screen } from '@testing-library/react';
import Test from '../../AdditionalComponents/TestComponents';
import Register from '../Register'

it('renders register page', () => {
    render(
        <Test>
            <Register />
        </Test>
    );
    const registerComponents = screen.getAllByText("Submit")
    expect(registerComponents.length).toBeTruthy()
});