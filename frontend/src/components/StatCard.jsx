function StatCard({ icon, title, value, growth }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
        <small>{growth}</small>
      </div>
    </div>
  );
}

export default StatCard;