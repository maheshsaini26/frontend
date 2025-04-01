import React from 'react';
import ReactDOM from 'react-dom';

class Profile extends React.Component {
    render() {
        return (
            <div className="container">
                <img src="profile.jpg" alt="Profile Picture" />
                <h1>John Doe</h1>
                <p>Location: Hyderabad, India</p>
                <p>Experience: 2+ Years</p>
                <p>Email: john.doe@example.com</p>
                <p>Mobile: 123-456-7890</p>
                <button>View Resume</button>
            </div>
        );
    }
}

ReactDOM.render(<Profile />, document.getElementById('root'));