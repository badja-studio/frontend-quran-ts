# DataTable Component dengan Filter

## Fitur

- **Sorting**: Klik header untuk sort ascending/descending
- **Pagination**: Navigasi data dengan pagination
- **Filtering**: Multiple filters dengan berbagai operator
- **Responsive**: Otomatis scroll horizontal untuk banyak kolom

## Filter System

### Filter Types

Filter mendukung 4 tipe input:

1. **Text** - Input text dengan operator: equals, notEquals, contains, notContains, startsWith, endsWith
2. **Number** - Input number dengan operator: equals, notEquals, greaterThan, lessThan, greaterThanOrEqual, lessThanOrEqual
3. **Date** - Input date dengan operator: equals, notEquals, greaterThan, lessThan, between
4. **Select** - Dropdown single/multiple dengan operator: equals, notEquals, in

### Filter Configuration

```typescript
const filterConfigs: FilterConfig<YourDataType>[] = [
  {
    key: 'nama',              // Column key (harus sama dengan column id)
    label: 'Nama Siswa',      // Label yang ditampilkan
    type: 'text',             // Type: 'text' | 'number' | 'date' | 'select'
    operators: ['contains', 'startsWith'], // Optional: custom operators
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [                // Required untuk type 'select'
      { label: 'Aktif', value: 'Aktif' },
      { label: 'Nonaktif', value: 'Nonaktif' },
    ],
  },
  {
    key: 'nilai',
    label: 'Nilai',
    type: 'number',
    operators: ['greaterThan', 'lessThan'], // Custom operators
  },
];
```

## Usage Example

```typescript
import DataTable, { Column, FilterConfig } from '../../components/Table/DataTable';

interface Student {
  id: number;
  nama: string;
  nilai: number;
  status: string;
}

function MyComponent() {
  const columns: Column<Student>[] = [
    { id: 'nama', label: 'Nama', minWidth: 150 },
    { id: 'nilai', label: 'Nilai', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Status', minWidth: 100 },
  ];

  const filterConfigs: FilterConfig<Student>[] = [
    {
      key: 'nama',
      label: 'Nama',
      type: 'text',
    },
    {
      key: 'nilai',
      label: 'Nilai',
      type: 'number',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Aktif', value: 'Aktif' },
        { label: 'Nonaktif', value: 'Nonaktif' },
      ],
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={students}
      enableFilter={true}
      filterConfigs={filterConfigs}
      initialRowsPerPage={10}
      onRowClick={(row) => console.log(row)}
    />
  );
}
```

## Filter Operators

### Text Operators
- **equals**: Sama persis dengan nilai
- **notEquals**: Tidak sama dengan nilai
- **contains**: Mengandung nilai (case insensitive)
- **notContains**: Tidak mengandung nilai
- **startsWith**: Dimulai dengan nilai
- **endsWith**: Diakhiri dengan nilai

### Number Operators
- **equals**: Sama dengan
- **notEquals**: Tidak sama dengan
- **greaterThan**: Lebih besar dari (>)
- **lessThan**: Lebih kecil dari (<)
- **greaterThanOrEqual**: Lebih besar atau sama dengan (≥)
- **lessThanOrEqual**: Lebih kecil atau sama dengan (≤)

### Date Operators
- **equals**: Tanggal sama dengan
- **notEquals**: Tanggal tidak sama dengan
- **greaterThan**: Setelah tanggal
- **lessThan**: Sebelum tanggal
- **between**: Diantara dua tanggal

### Select Operators
- **equals**: Sama dengan pilihan
- **notEquals**: Tidak sama dengan pilihan
- **in**: Termasuk dalam pilihan (multiple select)

## Multiple Filters

Filter dapat ditambah berkali-kali dan semua filter akan diterapkan dengan **AND logic**:
- Filter 1: Nama contains "Ahmad"
- Filter 2: Nilai > 80
- Filter 3: Status = "Aktif"

Hasil: Data yang memenuhi **SEMUA** kondisi di atas.

## Filter Data Structure

Filter disimpan sebagai array of objects:

```typescript
interface FilterItem {
  id: string;              // Unique ID (timestamp)
  key: string;             // Column key
  operator: FilterOperator; // Operator type
  value: string | number | Date | string[]; // Filter value
  type?: 'text' | 'number' | 'date' | 'select'; // Input type
}
```

## Tips

1. **Performance**: Filter diterapkan pada client-side. Untuk dataset besar (>1000 rows), pertimbangkan server-side filtering.

2. **Custom Operators**: Anda bisa membatasi operator yang tersedia untuk setiap field:
   ```typescript
   {
     key: 'email',
     label: 'Email',
     type: 'text',
     operators: ['equals', 'contains'], // Hanya 2 operator ini
   }
   ```

3. **Default Behavior**: Jika tidak ada `filterConfigs`, semua kolom akan tersedia dengan type `text`.

4. **Reset Pagination**: Saat filter diterapkan, halaman otomatis kembali ke halaman 1.
