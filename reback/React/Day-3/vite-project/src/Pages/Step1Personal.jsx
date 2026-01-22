export default function Step1Personal({ data, update, next }) {
  return (
    <>
      <h3>Personal Info</h3>
      <input
        placeholder="Name"
        value={data.name}
        onChange={(e) => update("name", e.target.value)}
      />
      <br />
      <button onClick={next}>Next</button>
    </>
  );
}
