import { Link } from 'react-router-dom';
import './table.css'

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Title/Details',
    accessor: d => d.title,
    Cell: (e) => (<Link className='campaignDetailLink' to={{ pathname: `/campaigndetail/${e.data[e.row.id].campaignID}`}}>{e.value}</Link>)
  },
  {
    Header: 'Advertiser',
    accessor: 'advertiser',
  },
  {
    Header: 'Action Required By',
    accessor: 'actionRequiredBy',
  },
  {
    Header: 'Next Action Due By',
    accessor: 'nextActionDueBy'
  },
  {
    Header: 'Start',
    accessor: 'start'
  },
  {
    Header: 'Finish',
    accessor: 'end'
  },
]