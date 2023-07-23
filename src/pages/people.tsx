import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Input } from '@chakra-ui/react'
import Papa from 'papaparse'

import Pagination from '@/src/components/Pagination'
import UploadCSV from '@/src/components/UploadCSV'
import sortData from '@/src/functions/sortData'

export default function People() {
  const [people, setPeople] = useState([])
  const [sortedPeople, setSortedPeople] = useState([])
  const [sortKey, setSortKey] = useState('first_name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationsFilter, setLocationsFilter] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState('')
  const [weaponFilter, setWeaponFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [vehicleFilter, setVehicleFilter] = useState('')
  const [affiliationsFilter, setAffiliationsFilter] = useState('')
  const resultsPerPage = 10

  useEffect(() => {
    fetchData()
  }, [searchTerm, locationsFilter, speciesFilter, weaponFilter, genderFilter, vehicleFilter, affiliationsFilter])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/people', {
        params: {
          string: searchTerm,
          locations: locationsFilter,
          species: speciesFilter,
          weapon: weaponFilter,
          gender: genderFilter,
          vehicle: vehicleFilter,
          affiliations: affiliationsFilter,
        },
      })

      setSortedPeople(response.data)
    } catch (error) {
      console.error(error)
    }
  }


  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleLocationFilter = (event) => {
    setLocationsFilter(event.target.value)
  }

  const handleSpeciesFilter = (event) => {
    setSpeciesFilter(event.target.value)
  }

  const handleWeaponFilter = (event) => {
    setWeaponFilter(event.target.value)
  }

  const handleGenderFilter = (event) => {
    setGenderFilter(event.target.value)
  }

  const handleVehicleFilter = (event) => {
    setVehicleFilter(event.target.value)
  }

  const handleAffiliationsFilter = (event) => {
    setAffiliationsFilter(event.target.value)
  }

  const handleSortToggle = (key) => {
    if (sortKey === key) {
      setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  }


  const handleUploadCSV = (file) => {
    const reader = new FileReader()

    reader.onload = async function (event) {
      const csvData = event.target.result

      const parsedData = Papa.parse(csvData, { header: true })
      console.log('parsedData::: ', parsedData.data);

      if (parsedData && parsedData.data) {
        const newPeople = parsedData.data.map((item) => ({
          first_name: item.Name,
          last_name: '',
          species: item.Species || '',
          gender: item.Gender || '',
          locations: item.Location.split(',').map((location) => location.trim()),
          affiliations: item.Affiliations.split(',').map((affiliation) => affiliation.trim()),
          weapon: item.Weapon,
          vehicle: item.Vehicle,
        }))

        try {
          await axios.post('http://localhost:3001/people', { person: newPeople })
          setPeople((prevPeople) => [...prevPeople, ...newPeople])
        } catch (error) {
          console.error(error)
        }
      }
    }

    reader.readAsText(file)
  }

  const sortPeople = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      const keyA = a[sortKey] && typeof a[sortKey] === 'string' ? a[sortKey].toLowerCase() : '';
      const keyB = b[sortKey] && typeof b[sortKey] === 'string' ? b[sortKey].toLowerCase() : '';

      if (keyA < keyB) return sortOrder === 'asc' ? -1 : 1;
      if (keyA > keyB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedData;
  }

  const filteredPeople = sortedPeople.filter((person) => {
    const fullName = `${person.first_name} ${person.last_name}`.toLowerCase();
    const searchTermLowerCase = searchTerm.toLowerCase();
    const isFullNameMatch = fullName.includes(searchTermLowerCase);

    const isLocationsMatch =
      locationsFilter === '' ||
      person?.locations.some((location) =>
        location.name?.toLowerCase().includes(locationsFilter?.toLowerCase())
      );

    const isSpeciesMatch =
      speciesFilter === '' ||
      person?.species?.toLowerCase().includes(speciesFilter?.toLowerCase());

    const isWeaponMatch =
      weaponFilter === '' || person?.weapon?.toLowerCase().includes(weaponFilter.toLowerCase());

    const isGenderMatch =
      genderFilter === '' || person?.gender?.toLowerCase().includes(genderFilter?.toLowerCase());

    const isVehicleMatch =
      vehicleFilter === '' || person?.vehicle?.toLowerCase().includes(vehicleFilter?.toLowerCase());

    const isAffiliationsMatch =
      affiliationsFilter === '' ||
      person?.affiliations.some((affiliation) =>
        affiliation?.name?.toLowerCase()?.includes(affiliationsFilter?.toLowerCase())
      );

    return (
      isFullNameMatch &&
      isLocationsMatch &&
      isSpeciesMatch &&
      isWeaponMatch &&
      isGenderMatch &&
      isVehicleMatch &&
      isAffiliationsMatch
    );
  })

  const offset = currentPage * resultsPerPage;
  const paginatedPeople = sortPeople(filteredPeople).slice(offset, offset + resultsPerPage);
  const pageCount = Math.ceil(filteredPeople.length / resultsPerPage)

  const hasPeople = paginatedPeople.length > 0

  return (
    <Box p={1}>
      <Box display='flex' mt='1' alignItems='center'>
        <UploadCSV onUpload={handleUploadCSV} />
      </Box>

      <Box display='flex' mt='1' alignItems='center' mr='5px'>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          mb={2}
          mr={2}
        />
        <Input
          placeholder="Locations (comma-separated)"
          value={locationsFilter}
          onChange={handleLocationFilter}
          mb={2}
          mr={2}
        />
        <Input
          placeholder="Affiliations (comma-separated)"
          value={affiliationsFilter}
          onChange={handleAffiliationsFilter}
          mb={2}
          mr={2}
        />
        <Input
          placeholder="Gender (comma-separated)"
          value={genderFilter}
          onChange={handleGenderFilter}
          mb={2}
          mr={2}
        />
        <Input
          placeholder="Species (comma-separated)"
          value={speciesFilter}
          onChange={handleSpeciesFilter}
          mb={2}
          mr={2}
        />
        <Input
          placeholder="Weapon (comma-separated)"
          value={weaponFilter}
          onChange={handleWeaponFilter}
          mb={2}
          mr={2}
        />
        <Input
          placeholder="Vehicle (comma-separated)"
          value={vehicleFilter}
          onChange={handleVehicleFilter}
          mb={2}
          mr={2}
        />
      </Box>

      <Table variant="simple">
        <TableCaption>People</TableCaption>
        <Thead>
          <Tr>
            <Th onClick={() => handleSortToggle('first_name')}>
              Name {sortKey === 'first_name' && (sortOrder === 'asc' ? '▲' : '▼')}
            </Th>
            <Th onClick={() => handleSortToggle('locations')}>
              Locations {sortKey === 'locations' && (sortOrder === 'asc' ? '▲' : '▼')}
            </Th>
            <Th onClick={() => handleSortToggle('affiliations')}>
              Affiliations {sortKey === 'affiliations' && (sortOrder === 'asc' ? '▲' : '▼')}
            </Th>
            <Th onClick={() => handleSortToggle('gender')}>
              Gender {sortKey === 'gender' && (sortOrder === 'asc' ? '▲' : '▼')}
            </Th>
            <Th onClick={() => handleSortToggle('species')}>
              Species {sortKey === 'species' && (sortOrder === 'asc' ? '▲' : '▼')}
            </Th>
            <Th onClick={() => handleSortToggle('weapon')}>
              Weapon {sortKey === 'weapon' && (sortOrder === 'asc' ? '▲' : '▼')}
            </Th>
            <Th onClick={() => handleSortToggle('vehicle')}>
              Vehicle {sortKey === 'vehicle' && (sortOrder === 'asc' ? '▲' : '▼')}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedPeople && hasPeople ? (
            paginatedPeople.map((person) => (
              <Tr key={person.id}>
                <Td>{person.first_name} {person.last_name}</Td>
                <Td>{person?.locations?.map((location) => location.name).join(', ')}</Td>
                <Td>{person?.affiliations?.map((affiliation) => affiliation.name).join(', ')}</Td>
                <Td>{person.gender}</Td>
                <Td>{person.species}</Td>
                <Td>{person.weapon}</Td>
                <Td>{person.vehicle}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={7}>No matching people found.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <Box display='flex' alignItems='center'>
          <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
      </Box>
    </Box>
  );
}