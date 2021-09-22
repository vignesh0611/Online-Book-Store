import React from 'react';

function Loader({message}) {
    return (
        <div>
            <div class="d-flex justify-content-center">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden"></span>
                </div>
                <span className="text-danger"> {message}</span>
            </div>
        </div>
    );
}

export default Loader;