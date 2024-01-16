const buttonStyle = {
  padding: "10px",
  backgroundColor: "#2196F3",
  marginRight: "20px",
  borderRadius: "5px",
  border: "0px",
  color: "White",
};
const boxStyle = {
  width: "400px",
  height: "300px",
  backgroundColor: "#f8f8f8",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  margin: "20px",
};
export function Card(props) {
  return (
    <div style={boxStyle}>
      <h1>
        <b>{props.name}</b>
      </h1>
      <h4>{props.description}</h4>
      <h4>
        <h2>Interests</h2>
        <ul>
          {props.interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </h4>
      <a href={props.instagram}>
        <button style={buttonStyle}>Instagram</button>
      </a>

      <a href={props.twitter}>
        <button style={buttonStyle}>Twitter</button>
      </a>
    </div>
  );
}
