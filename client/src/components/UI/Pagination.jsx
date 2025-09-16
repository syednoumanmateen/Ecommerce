import RoundButton from "./RoundButton";
import Button from "./Button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButton = (page) => (
    <RoundButton
      key={page}
      onClick={() => onPageChange(page)}
      className={`px-2 py-1 ${currentPage === page ? "button-round-active" : ""}`}
    >
      {page}
    </RoundButton>
  );

  const renderPages = () => {
    const pages = [renderPageButton(1)];

    if (currentPage > 3 && totalPages > 4) {
      pages.push(<span key="start-ellipsis" className="px-2">…</span>);
    }

    Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((p) => p !== 1 && p !== totalPages && Math.abs(p - currentPage) <= 1)
      .forEach((p) => pages.push(renderPageButton(p)));

    if (currentPage < totalPages - 2 && totalPages > 4) {
      pages.push(<span key="end-ellipsis" className="px-2">…</span>);
    }

    if (totalPages > 1) {
      pages.push(renderPageButton(totalPages));
    }

    return pages;
  };

  return (
    <div className="p-4 flex flex-wrap justify-center items-center bg-white gap-2">
      {currentPage > 1 && (
        <Button className="p-2" onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </Button>
      )}

      {renderPages()}

      {currentPage < totalPages && (
        <Button className="p-2" onClick={() => onPageChange(currentPage + 1)}>
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
