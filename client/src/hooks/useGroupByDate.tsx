import { useState, useEffect } from "react";
import IShoppingList from "types/ShoppingList";

interface IDates {
  date: Date;
  shoppingLists: IShoppingList[];
}

export default function useGroupByDate<T>(
  shoppingLists: IShoppingList[],
  dependency?: Array<any>
) {
  const [dates, setDates] = useState<IDates[]>([]);

  if (!dependency) dependency = shoppingLists;

  useEffect(() => {
    let tmp: IDates[] = [];

    shoppingLists.forEach((shoppingList: IShoppingList) => {
      let date = tmp.find(
        (item) =>
          item?.date?.getMonth() ==
            new Date(shoppingList.createdAt).getMonth() &&
          item?.date?.getFullYear() ==
            new Date(shoppingList.createdAt).getFullYear()
      );
      date && date.shoppingLists.push(shoppingList);
      !date &&
        tmp.push({
          date: new Date(shoppingList.createdAt),
          shoppingLists: [shoppingList],
        });
    });

    setDates([...tmp]);
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]);

  return dates;
}
