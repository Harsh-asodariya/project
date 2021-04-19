import React, { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { COLUMNS } from './columns'
import './table.css'
import { Button, PaginationItem } from 'reactstrap'
import { getAllCampaign } from '../../Api/Api';
import BackDrop from '../../Shared/Backdrop/Backdrop';
import Spinner from '../../Shared/Spinner/Spinner';

export const PaginationTable = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getAllCampaign()
            .then(res => {
                setIsLoading(false)
                setData(res.rows.map(row => {
                    return {
                        'id' : row.clientCampaignNumber,
                        'title' : row.title,
                        'advertiser' : row.clientCompany.companyName,
                        'actionRequiredBy' : row.statusWithPerson.firstName + ' ' + row.statusWithPerson.lastName,
                        'nextActionDueBy' : 'Not Selected',
                        'start' : 'Not Selected',
                        'end' : 'Not Selected',
                        'campaignID' : row.id,
                    }
                }))
            })
            .catch(err => {
                setIsLoading(false)
                alert(err)
            })
    }, [])
    const columns = useMemo(() => COLUMNS, [])
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
            <div className='videosInProductionTable'>
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
            </div>
            <div className="pagination">
                <div className="rowPerPage p-2">
                    <span className='mr-2 fs-5'>Result per page:</span>
                    <PaginationItem onClick={() => setPageSize(10)} active={pageSize === 10}>10
                    </PaginationItem>|
                    <PaginationItem onClick={() => setPageSize(15)} active={pageSize === 15}>15
                    </PaginationItem>|
                    <PaginationItem onClick={() => setPageSize(20)} active={pageSize === 20}>20
                    </PaginationItem>


                </div>

                <div className="p-2">
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