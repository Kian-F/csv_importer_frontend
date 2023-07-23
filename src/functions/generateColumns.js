const generateColumns = () => [
  {
    Header: 'Name',
    accessor: 'first_name',
    Cell: ({ row }) => <span>{row.original.first_name} {row.original.last_name}</span>,
    sortType: 'basic',
  },
  {
    Header: 'Locations',
    accessor: 'locations',
    Cell: ({ row }) => <span>{row.original?.locations?.map((location) => location.name).join(', ')}</span>,
    sortType: 'basic',
  },
  {
    Header: 'Affiliations',
    accessor: 'affiliations',
    Cell: ({ row }) => <span>{row.original?.affiliations?.map((affiliation) => affiliation.name).join(', ')}</span>,
    sortType: 'basic',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
    sortType: 'basic',
  },
  {
    Header: 'Species',
    accessor: 'species',
    sortType: 'basic',
  },
  {
    Header: 'Weapon',
    accessor: 'weapon',
    sortType: 'basic',
  },
  {
    Header: 'Vehicle',
    accessor: 'vehicle',
    sortType: 'basic',
  },
]

export default generateColumns
