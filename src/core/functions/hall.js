const chooseCategoryPlaceName = (id) => {
  switch (id) {
    case 1:
      return {
        type: 'standard',
        name: 'Стандартный',
        places: 1,
      };
    case 2:
      return {
        type: 'love',
        name: 'Love Seats стандарт',
        places: 2,
      };
    case 3:
      return {
        type: 'recliner',
        name: 'Реклайнер',
        places: 1,
      };

    case 4:
      return {
        type: 'love-recliner',
        name: 'Love Seats реклайнер',
        places: 2,
      };
    case 5:
      return {
        type: 'premier',
        name: 'Premier Sofa',
        places: 1,
      };
    case 7:
      return {
        type: 'comfort',
        name: 'Comfort',
        places: 1,
      };
    case 8:
      return {
        type: 'love-comfort',
        name: 'Love Seats Comfort',
        places: 2,
      };
    default:
      return {
        type: 'standard',
        name: 'Стандартный',
        places: 1,
      };
  }
};

/* функция findCheckContent
  Ищет содержимое определенного чека (места, продукты)
  Корзина представляет из себя объект
  {
    6482b0169c53db6a9cb032394c60e1c8: {
      checkId: 6482b0169c53db6a9cb032394c60e1c8,
      showId: 54432,
      checkContent: [
        {id: 1, typeName: "3ряд/ 5 место"}
      ]
    } и т.д.
  }

  (1) Берем корзину из редакса(которую передаем первым параметром) и проходим по всему объекту состоящую из checkId
  (2) Сравниваем в каждой чеке showID с текущим showID(showtimeId - второй параметр), на котором мы сейчас находимся
  (3) Проверка на содержимое checkContent
  (4) Возвращаем checkContent (представляет из себя массив)
*/

const findCheckContent = (basket, showtimeId) => {
  let getCheckContent = [];
  Object.keys(basket).forEach((item) => { //(1)
    if (basket[item].showId.indexOf(showtimeId) !== -1) {   //(2)
      if (basket[item].checkContent && basket[item].checkContent.length !== 0) {   // (3)
        getCheckContent = basket[item].checkContent;          // (4)
      }
    }
  });
  return getCheckContent;    // (4)
};

/*По аналлогии с функцией findCheckContent только возвращаем checkId, для определенного showtimeId(id евента)*/
const findCheckId = (basket, showtimeId) => {
  let checkId;
  Object.keys(basket).forEach((item) => {
    if (basket[item].showId.indexOf(showtimeId) !== -1) {
      if (basket[item].checkContent && basket[item].checkContent.length !== 0) {
        checkId = basket[item].checkId;
      }
    }
  });
  return checkId;
};

const findCheck = (basket, showtimeId) => {
  let check;
  Object.keys(basket).forEach((item) => {
    if (basket[item].showId.indexOf(showtimeId) !== -1) {
      if (basket[item].checkContent && basket[item].checkContent.length !== 0) {
        check = basket[item];
      }
    }
  });
  return check;
};

export {
  findCheckContent,
  chooseCategoryPlaceName,
  findCheckId,
  findCheck,
};
