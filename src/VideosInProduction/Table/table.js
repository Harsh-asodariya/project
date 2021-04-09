import React, { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { Button, PaginationItem } from 'reactstrap'
import { tableData } from './data';
import { getAllCampaign } from '../../Api/Api';
import BackDrop from '../../Shared/Backdrop/Backdrop';
import Spinner from '../../Shared/Spinner/Spinner';

export const PaginationTable = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // tableData()
    useEffect(() => {
        setIsLoading(true)
        getAllCampaign()
            .then(res => {
                setIsLoading(false)
                setData(res.rows)
                console.log(res.rows)
            })
            .catch(err => {
                setIsLoading(false)
                alert(err)
            })
    }, [])
    // console.log(MOCK_DATA)
    const columns = useMemo(() => COLUMNS, [])
    // const data = useMemo(() => MOCK_DATA, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        state,
        setPageSize,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        usePagination
    )
    const { pageIndex, pageSize } = state

    return (
        <>
            <BackDrop show={isLoading}><Spinner /></BackDrop>
            <table {...getTableProps()} >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <div className="rowPerPage">
                    <span className='mr-2 fs-5'>Result per page:</span>
                    <PaginationItem onClick={() => setPageSize(10)} active={pageSize === 10}>10
                    </PaginationItem>|
                    <PaginationItem onClick={() => setPageSize(15)} active={pageSize === 15}>15
                    </PaginationItem>|
                    <PaginationItem onClick={() => setPageSize(20)} active={pageSize === 20}>20
                    </PaginationItem>


                </div>

                <div>
                    <Button className='paginationButton' onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Prev
                    </Button>
                    <Button className='pageIndex'>
                        {pageIndex + 1}
                    </Button>
                    <Button className='paginationButton' onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </Button>
                </div>

            </div>
        </>
    )
}