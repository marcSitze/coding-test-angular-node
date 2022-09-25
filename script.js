const perimeter = (l, w) => {
  if(typeof l !== 'number' || typeof w !== 'number') {
    return {msg: 'Please enter numbers'};
  }

  return (l + w) * 2;
}
console.log(perimeter('eert',2))