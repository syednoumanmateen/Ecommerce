import { useBrands } from "../../api/brandApiHooks";
import Table from "../../components/UI/Table";

const List = () => {
  const { data } = useBrands();
  const brands = data?.data?.data

  const columns = [
    { key: 'name', header: 'Name', width: '40%', align: 'left', sortable: true },
    { key: 'description', header: 'Description', width: '50%', align: 'right', sortable: true },
  ];

  if (!brands) return <div>No data available.</div>;

  return (
    <div>
      <Table data={brands} columns={columns} />
    </div>
  );
};

export default List;
