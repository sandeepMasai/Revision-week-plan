export default function ReviewSubmit({ data, back }) {
  const handleSubmit = () => {
    console.log("Final Data:", data);
    alert("Registration Successful!");
  };

  return (
    <>
      <h3>Review Details</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <button onClick={back}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
