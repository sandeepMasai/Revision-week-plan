export default function Step2Account({ data, update, next, back }) {
  return (
    <>
      <h3>Account Details</h3>
      <input
        placeholder="Email"
        value={data.email}
        onChange={(e) => update("email", e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => update("password", e.target.value)}
      />
      <br />
      <button onClick={back}>Back</button>
      <button onClick={next}>Next</button>
    </>
  );
}
