import { useShopRooms } from "../../api/shopRoomApiHooks";
import Table from "../../components/UI/Table";

const List = () => {
  const { data } = useShopRooms();
  const shopRooms = data?.data?.data

  const columns = [
    { key: 'name', header: 'Name', width: '30%', align: 'left', sortable: true },
    { key: 'slug', header: 'Slug', width: '30%', align: 'right', sortable: true },
    { key: 'description', header: 'Description', width: '30%', align: 'right', sortable: true },
  ];

  if (!shopRooms) return <div>No data available.</div>;

  return (
    <div>
      <Table data={shopRooms} columns={columns} />
    </div>
  );
};

export default List;
