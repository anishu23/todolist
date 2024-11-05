import styles from "@/styles/Home.module.css";

interface PageProps {
    pagNumbers: number[];
    selectedPageSize: number;
    selectedPageNumber: number;
    handlePageNumberChange: (e:any) => void;
    handlePageSizeChange: (e:any) => void;
}


export default function Pagination({pagNumbers, selectedPageSize, selectedPageNumber, handlePageNumberChange, handlePageSizeChange}:PageProps) {

    function handleNext() {
        if(selectedPageNumber + 1 <= pagNumbers[pagNumbers.length-1]) { 
            const e = {target: {value: +selectedPageNumber+1}}
            handlePageNumberChange(e)
        }
    }

    function handlePrevious() {
        if(selectedPageNumber - 1 > 0) {
            const e = {target: {value: +selectedPageNumber-1}}
            handlePageNumberChange(e)
        }
    }


    return (
        <>
            <div className={styles.paginationContainer}>
                <div className={styles.pageNumber}>
                    <label>Rows per page:</label>
                    <select className={styles.pageSelector} name="pageSize" id="pageSize" value={selectedPageSize} onChange={handlePageSizeChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className={styles.npContainer} >
                    <button onClick={handlePrevious} className={styles.npButton} disabled={selectedPageNumber-1==0}>Prev</button>
                    <div>
                        {selectedPageNumber}
                    </div>
                    <button onClick={handleNext} className={styles.npButton} disabled={selectedPageNumber==pagNumbers[pagNumbers.length-1]}>Next</button>

                </div>
                <div className={styles.pageSize}>
                    <select className={styles.pageSelector} name="pageNumber" id="pageNumber" value={selectedPageNumber} onChange={handlePageNumberChange}>
                        {
                            pagNumbers.map(pageNumber => (
                                <option key={pageNumber} value={pageNumber}>{pageNumber}</option>
                            ))
                        }
                    </select>
                    <label>Go to Page:</label>
                </div>
            </div>
        </>
    )
}