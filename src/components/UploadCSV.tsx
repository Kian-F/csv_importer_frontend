import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const UploadCSV = ({ onUpload }) => {
  const [file, setFile] = useState(null)

  const handleFileChange = (event: { target: { files: any[] } }) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file)
      setFile(null)
    }
  }

  return (
    <Box mt={4}>
      <FormControl>
        <FormLabel htmlFor="csv-file">Upload CSV</FormLabel>
        <Input type="file" id="csv-file" accept=".csv" onChange={handleFileChange} />
      </FormControl>
      <Button mt={2} onClick={handleUpload} disabled={!file}>
        Upload
      </Button>
    </Box>
  )
}

export default UploadCSV