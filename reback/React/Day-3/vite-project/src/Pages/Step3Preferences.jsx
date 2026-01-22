export default function Step3Preferences({ data, update, next, back }) {
  return (
    <>
      <h3>Preferences</h3>

      <select
        value={data.gender}
        onChange={(e) => update("gender", e.target.value)}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <br />

      <label>
        <input
          type="checkbox"
          checked={data.notifications}
          onChange={(e) => update("notifications", e.target.checked)}
        />
        Receive Notifications
      </label>

      <br />
      <button onClick={back}>Back</button>
      <button onClick={next}>Next</button>
    </>
  );
}
