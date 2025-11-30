const EventLog = ({ log }) => {
    return (
        <div className="event-log neon-border">
            <h2>Eventos</h2>

            <ul>
                {log.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </div>
    );
};

export default EventLog;
