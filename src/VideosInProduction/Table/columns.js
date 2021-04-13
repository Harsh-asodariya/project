import { Link } from 'react-router-dom'

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Title/Details',
    accessor: d => d.title,
    Cell: (e) => (<Link to={{ pathname: `/campaigndetail/${e.data[e.row.id].campaignID}`}}>{e.value}</Link>)
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