import { useCategories } from "../../api/categoriesApiHooks";
import Table from "../../components/UI/Table";

const List = () => {
  const { data } = useCategories();
  const categories = data?.data?.data

  const columns = [
    { key: 'name', header: 'Name', width: '40%', align: 'left', sortable: true },
    { key: 'slug', header: 'Slug', width: '50%', align: 'right', sortable: true },
  ];

  if (!categories) return <div>No data available.</div>;

  return (
    <div>
      <Table data={categories} columns={columns} />
    </div>
  );
};

export default List;
