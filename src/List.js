const List = (props) => {
  return (
    <li>
      <h3>{props.tryInfo.try} inning</h3>
      <p>{props.tryInfo.userInput}</p>
      <p>{props.tryInfo.resultState}</p>
    </li>
  );
};

export default List;
