interface AddEventButtonProps {
  onClick: () => void;
}

export function AddEventButton({ onClick }: AddEventButtonProps) {
  return (
    // TODO: Implement a clickable button with label
    <div
      style={{
        cursor: "pointer",
        paddingTop: "7rem",
        paddingBottom: "7rem",
        textAlign: "center",
      }}
      onClick={onClick}
    >
      <div style={{ fontSize: "8rem" }}>+</div>
      <div className="button-label">Add Event</div>
    </div>
  );
}
