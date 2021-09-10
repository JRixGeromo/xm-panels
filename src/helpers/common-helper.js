export function remove(el) {
  document.getElementById(el).style.display = 'none';
}

export function sortRawProducts(data, sortBy) {
  const sorted = data.sort((a, b) => {
    const atime = new Date(a.productCreatedDate).getTime();
    const btime = new Date(b.productCreatedDate).getTime();
    let val = 0;
    if (sortBy === 'newest') {
      val = atime - btime;
    } else {
      val = btime - atime;
    }
    return val;
  });
  return sorted;
}
