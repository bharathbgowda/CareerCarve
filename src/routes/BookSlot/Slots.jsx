import React, { useEffect, useState } from "react";

const Slots = () => {
  // LOADER
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 5000);
  }, []);

  // Slot Management
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState('');

  const handleAddSlot = () => {
    setSlots([...slots, newSlot]);
    setNewSlot('');
  };

  const handleRemoveSlot = (slotToRemove) => {
    setSlots(slots.filter(slot => slot !== slotToRemove));
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
      width: '300px',
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
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#333',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      width: '100%',
    },
    ul: {
      listStyle: 'none',
      padding: '0',
      marginTop: '20px',
      width: '100%',
    },
    li: {
      margin: '10px 0',
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    scheduler: {
      textAlign: 'center',
      fontSize: '18px',
      color: 'white',
    },
  };

  return (
    <div style={styles.app}>
      {loading ? (
        <form style={styles.form}>
          <h1 style={styles.header}>Your Slots</h1>
          <h3 style={styles.header}>For {new Date().toDateString()}</h3>

          <div>
            <input
              type="datetime-local"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              style={styles.input}
            />
            <button type="button" onClick={handleAddSlot} style={styles.button}>Add Slot</button>
          </div>

          <ul style={styles.ul}>
            {slots.map((slot, index) => (
              <li key={index} style={styles.li}>
                {new Date(slot).toLocaleString()}
                <button type="button" onClick={() => handleRemoveSlot(slot)} style={styles.button}>Remove</button>
              </li>
            ))}
          </ul>
        </form>
      ) : (
        <div style={styles.scheduler}>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Slots;
