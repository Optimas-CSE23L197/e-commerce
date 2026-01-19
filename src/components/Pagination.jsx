import React, { useMemo } from "react";

function Pagination({ itemsPerPage = 10, productsData, currentPage, setCurrentPage }) {
    const totalProducts = productsData?.total || 0;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const skip = (currentPage - 1) * itemsPerPage;

    const startItem = totalProducts === 0 ? 0 : skip + 1;
    const endItem = Math.min(skip + itemsPerPage, totalProducts);

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const pageNumbers = useMemo(() => {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [totalPages]);

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-200 bg-white">
            <p className="text-sm text-gray-500">
                Showing {startItem} to {endItem} of {totalProducts}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Prev
                </button>

                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 text-sm border border-gray-200 rounded-xl transition ${currentPage === page ? "bg-gray-900 text-white" : "hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Pagination;
