export default function Pagination({ page, setPage }) {
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
        Prev
      </button>
      <span>Page {page}</span>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}
