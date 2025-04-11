import Papa from 'papaparse';

  Papa.parse(file, {
    header: true,
    delimiter: ';',
    skipEmptyLines: true,
    complete: function (results) {
      console.log('Parsed data:', results.data);
      // Use results.data to insert to DB
    },
    error: function (error) {
      console.error('Error parsing CSV:', error);
    }
  });
