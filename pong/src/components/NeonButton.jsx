const NeonButton = ({ children, ...props }) => {
    return (
        <button className="neon-button" {...props}>
            {children}
        </button>
    );
};

export default NeonButton;
