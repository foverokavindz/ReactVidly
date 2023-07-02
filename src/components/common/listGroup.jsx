const ListGroup = ({
  items,
  textProp /**/,
  valueProp /* _id */,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul class="list-group">
      {items.map((item) => (
        <li
          key={item[valueProp]}
          onClick={() => onItemSelect(item)}
          class={
            item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
        >
          {item[textProp]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProp: 'name',
  valueProp: '_id',
};

export default ListGroup;
