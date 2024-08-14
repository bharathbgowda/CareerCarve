import React, { useState } from 'react';
import "../style.css";
import Select from "react-select";
import userData from '../../users.json';  // Import the JSON data

const BookASlot = () => {
    // State variables
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [mentor, setMentor] = useState('');
    const [duration, setDuration] = useState(30);
    const [timeSlot, setTimeSlot] = useState('');
    const [availableMentors, setAvailableMentors] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);

    // Get data from JSON
    const students = userData.students;
    const mentors = userData.mentors;

    // Handle changes in Area of Interest
    const handleAreaOfInterestChange = (e) => {
        const selectedArea = e.target.value;
        setAreaOfInterest(selectedArea);

        // Filter available mentors based on the selected area
        const filteredMentors = mentors.filter(mentor => mentor.expertise.includes(selectedArea));
        setAvailableMentors(filteredMentors);
    };

    // Handle selection of a mentor
    const handleMentorSelection = (e) => {
        const selectedMentorId = e.target.value;
        setMentor(selectedMentorId);

        // Mock available time slots for selected mentor
        setAvailableSlots(['2024-08-20T19:00:00', '2024-08-20T19:45:00']);
    };

    // Handle booking
    const handleBooking = () => {
        const bookingData = {
            areaOfInterest,
            mentor,
            duration,
            timeSlot,
            paymentStatus: "Pending",
        };

        // Store booking data in local storage (as JSON)
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        alert('Booking Successful!');
    };

    return (
        <div style={styles.app}>
            <div style={styles.form}>
                <h2 style={styles.header}>Book a 1x1 Session</h2>
                <label style={styles.input}>
                    Select Area of Interest:
                    <select value={areaOfInterest} onChange={handleAreaOfInterestChange} style={styles.input}>
                        <option value="">Select...</option>
                        {Array.from(new Set(mentors.flatMap(mentor => mentor.expertise))).map((area, index) => (
                            <option key={index} value={area}>{area}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label style={styles.input}>
                    Select Mentor:
                    <select value={mentor} onChange={handleMentorSelection} style={styles.input}>
                        <option value="">Any Available Mentor</option>
                        {availableMentors.map((mentor) => (
                            <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label style={styles.input}>
                    Select Duration:
                    <select value={duration} onChange={(e) => setDuration(e.target.value)} style={styles.input}>
            <div style={styles.form}>
                <h1 style={styles.header}>Book an Interview</h1>
                <h3>30 Minutes - ₹2000 <br /> 45 Minutes - ₹3000 <br />60 Minutes - ₹4000 <br /> Additional Premium Charges - ₹1000</h3>
</div>
                        <option value={30}>30 Minutes</option>
                        <option value={45}>45 Minutes</option>
                        <option value={60}>60 Minutes</option>
                    </select>
                </label>
                <br />
                <label style={styles.input}>
                    Select Time Slot:
                    <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} style={styles.input}>
                        <option value="">Select a Time Slot</option>
                        {availableSlots.map((slot, index) => (
                            <option key={index} value={slot}>{new Date(slot).toLocaleString()}</option>
                        ))}
                    </select>
                </label>
                <br />
                <button onClick={handleBooking} style={styles.button}>Book Now</button>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    app: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(37, 35, 35, 0.932)',
    },
    form: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '500px',
      },
    header: {
        margin: '0 0 20px',
        color: '#333',
    },
    input: {
        marginBottom: '10px',
        padding: '8px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
    },
    button: {
        marginTop: '10px',
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        width: '100%',
    },
};

export default BookASlot;
