import React, { Component } from "react";
class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    console.log(currentPage);

    if (pagesCount === 1) return null;

    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={
                page === currentPage ? "active page-item" : "page-item"
              }
              key={page}
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
