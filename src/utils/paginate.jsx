export default function Paginate(items, pageSize, currentPage) {
  const startIndex = (currentPage - 1) * pageSize; //0 -5
  const endIndex = startIndex + pageSize; //5 -10
  return items.slice(startIndex, endIndex);
}
