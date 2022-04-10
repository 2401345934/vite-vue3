export const mapTest = (obj: any = {}) => {

  const { items } = obj
  const result: any = []

  if (items && items.length) {
    items.forEach(element => {
      const { checker, id } = element;
      result.push({
        checker: checker || '啊啊啊啊',
        id: id || '',
      })
    });

  }

  return result


}