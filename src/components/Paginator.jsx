function Paginator({ currentPage, lastPage, onPageChange }) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="join flex items-center justify-center">
      <button
        className="join-item btn bg-blue-500 hover:bg-blue-700 text-white"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        «
      </button>
      <button className="join-item btn bg-blue-500 hover:bg-blue-700 text-white">
        {currentPage}
      </button>
      <button
        className="join-item btn bg-blue-500 hover:bg-blue-700 text-white"
        onClick={handleNextPage}
        disabled={currentPage === lastPage}
      >
        »
      </button>
    </div>
  );
}

export default Paginator;
