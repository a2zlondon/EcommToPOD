const convertToCSV = (products) => {
  if (!products || !products.data || products.data.length === 0) {
    return ''; // Return an empty string if there are no products or data available
  }

  // Define the CSV column headers
  const headers = [
    'Product Name*',
    'Categories*',
    'Product Description',
    'Price*',
    'Discounted Price',
    'Variant SKU Code',
    'Variant Label 1',
    'Variant Value 1',
    'Variant Label 2',
    'Variant Value 2',
    'Tax Value (%)',
    'HSN',
    'Product Weight (kg)',
    'Image links (up to 24 for each product group)',
  ];

  // Map the product data to the CSV rows
  const rows = products.data.map((product) => {
    // Extract the required fields from the product object
    const {
      title,
      tags,
      description,
      price,
      // Add more fields as needed
      // variantSKUCode,
      // variantLabel1,
      // variantValue1,
      // variantLabel2,
      // variantValue2,
      // taxValue,
      // HSN,
      // productWeight,
      // imageLinks,
    } = product;

    // Format the row values as needed
    const rowValues = [
      title,
      tags.join(','),
      description,
      price,
      // Add more values as needed
      // variantSKUCode,
      // variantLabel1,
      // variantValue1,
      // variantLabel2,
      // variantValue2,
      // taxValue,
      // HSN,
      // productWeight,
      // imageLinks.join(','),
    ];

    return rowValues;
  });

  // Construct the CSV content
  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

  return csvContent;
};

const Upload = ({ products }) => {
  const csvout = convertToCSV(products);

  return (
    <div>
      <textarea name="products" value={csvout} />
    </div>
  );
};

export default Upload;
