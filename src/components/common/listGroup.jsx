import React, { Component } from "react";
class ListGroup extends Component {
  state = {};
  render() {
    const items = this.props.items;
    const { onItemSelect, selectedItems } = this.props;
    return (
      <div className="list-group">
       
        {items.map((item) => (
          <a
            key={item}
            className={
              item === selectedItems
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
            onClick={() => onItemSelect(item)}
          >
            {item}
          </a>
        ))}
      </div>
    );
  }
}

export default ListGroup;
