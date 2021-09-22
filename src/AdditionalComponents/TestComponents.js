import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {Store} from '../store/Store';

const TestComponent = ({ children }) => {
    return (
        <Provider store={Store}>
            <Router>
                {children}
            </Router>
        </Provider>
    );
}

export default TestComponent;