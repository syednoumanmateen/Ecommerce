import { usePatternTypes } from "../../api/patternTypeApiHooks";
import Table from "../../components/UI/Table";

const List = () => {
  const { data } = usePatternTypes();
  const patterns = data?.data?.data

  const columns = [
    { key: 'name', header: 'Name', width: '40%', align: 'left', sortable: true },
    { key: 'description', header: 'Description', width: '50%', align: 'right', sortable: true },
  ];

  if (!patterns) return <div>No data available.</div>;

  return (
    <div>
      <Table data={patterns} columns={columns} />
    </div>
  );
};

export default List;
