export default function SearchBar({ value, onChange, mode, setMode }) {
  return (
    <div className="search">
      <input
        placeholder="Search posts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="title">Title only</option>
        <option value="full">Full text</option>
        <option value="fuzzy">Fuzzy</option>
      </select>
    </div>
  );
}
