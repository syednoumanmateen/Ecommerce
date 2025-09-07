import { toast } from "react-toastify";
import { useBrands } from "../../api/brandApiHooks";
import Table from "../../components/UI/Table";

const List = () => {
  const { data: apiData, error } = useBrands();

  const columns = [
    { key: 'name', header: 'Name', width: '30%', align: 'left', sortable: true },
    { key: 'age', header: 'Age', width: '15%', align: 'right', sortable: true },
    { key: 'country', header: 'Country', width: '30%', align: 'center', sortable: false }
  ];

  const data = apiData && apiData.length && apiData;

  if (error) toast.error(error.message);

  if (!data.length) return <div>No data available.</div>;

  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default List;
