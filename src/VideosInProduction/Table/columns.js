export const COLUMNS = [
  {
    Header: 'Id',
    // Footer: 'Id',
    accessor: 'clientCampaignNumber',
    disableFilters: true,
    sticky: 'left'
  },
  {
    Header: 'Title/Details',
    // Footer: 'First Name',
    accessor: 'title',
    sticky: 'left'
  },
  {
    Header: 'Advertiser',
    // Footer: 'Last Name',
    accessor: 'id',
    sticky: 'left'
  },
  {
    Header: 'Action Required By',
    // Footer: 'Date of Birth',
    accessor: 'date_of_birth',
  },
  {
    Header: 'Next Action Due By',
    // Footer: 'Country',
    accessor: 'country'
  },
  {
    Header: 'Progress',
    // Footer: 'Phone',
    accessor: 'phone'
  },
  {
    Header: 'Start',
    // Footer: 'Email',
    accessor: 'startDate'
  },
  {
    Header: 'Finish',
    // Footer: 'Age',
    accessor: 'endDate'
  },
]

// export const GROUPED_COLUMNS = [
//   {
//     Header: 'Id',
//     Footer: 'Id',
//     accessor: 'id'
//   },
//   {
//     Header: 'Name',
//     Footer: 'Name',
//     columns: [
//       {
//         Header: 'First Name',
//         Footer: 'First Name',
//         accessor: 'first_name'
//       },
//       {
//         Header: 'Last Name',
//         Footer: 'Last Name',
//         accessor: 'last_name'
//       }
//     ]
//   },
//   {
//     Header: 'Info',
//     Footer: 'Info',
//     columns: [
//       {
//         Header: 'Date of Birth',
//         Footer: 'Date of Birth',
//         accessor: 'date_of_birth'
//       },
//       {
//         Header: 'Country',
//         Footer: 'Country',
//         accessor: 'country'
//       },
//       {
//         Header: 'Phone',
//         Footer: 'Phone',
//         accessor: 'phone'
//       }
//     ]
//   }
// ]