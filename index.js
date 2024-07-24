//? tạo data
var listItem = [
  {
    id: 0,
    name: "Bầu",
    img: "./img/bau.png",
    count: 0,
  },
  {
    id: 1,
    name: "Cua",
    img: "./img/cua.png",
    count: 0,
  },
  {
    id: 2,
    name: "Tôm",
    img: "./img/tom.png",
    count: 0,
  },
  {
    id: 3,
    name: "Cá",
    img: "./img/ca.png",
    count: 0,
  },
  {
    id: 4,
    name: "Hươu",
    img: "./img/huou.png",
    count: 0,
  },
  {
    id: 5,
    name: "Gà",
    img: "./img/ga.png",
    count: 0,
  },
];

//? khởi tạo biến
// lấy nodeList item và kết quả
let domListItems = document.querySelectorAll(".item");
let domListResult = document.querySelectorAll(".result");
//check số lần user đc phép bet
let checkCount = 0;
//check vòng quay có đang roll
let rolling = false;

//? đổ dữ liệu
function fillData() {
  domListItems.forEach((item, index) => {
    item.querySelector(".image-item").setAttribute("src", listItem[index].img);
    item.querySelector(".count").innerText = listItem[index].count;
  });
}
fillData();

//? người dùng thêm điểm
domListItems.forEach((item, index) => {
  item.onclick = function () {
    if (!rolling) {
      //Tối đa 3 điểm -> nếu lớn hơn thông báo cho người dùng, không thêm nữa
      if (checkCount >= 3) {
        console.log(
          "Bạn đã đặt tối đa số điểm bạn có (3), không thể đặt thêm!!!"
        );
      } else {
        checkCount++;
        listItem[index].count += 1;
        item.querySelector(".count").innerText = listItem[index].count;
      }
    } else {
      console.log("Đang thực hiện vòng quay không thể đặt cược thêm");
    }
  };
});

//? Reset lại điểm
document.querySelector("#btn-reset").onclick = function () {
  if (!rolling) {
    checkCount = 0;
    listItem.forEach((item) => {
      item.count = 0;
    });
    fillData();
  } else {
    console.log("Đang thực hiện vòng quay không thể đặt lại");
  }
};

//? Lắc bầu cua
document.querySelector("#btn-roll").onclick = function () {
  if (rolling) {
    return console.log("Vòng quay đang được thực hiện !!!");
  }
  rolling = true;
  addInActive();
  let checkRadom = 0;
  let listResult = [];
  let betList = JSON.parse(
    JSON.stringify(
      listItem.filter((item) => {
        return item.count > 0;
      })
    )
  );
  let rollInterval = setInterval(() => {
    if (checkRadom < 100) {
      checkRadom++;
      //!Check random
      listResult = [rollItem(), rollItem(), rollItem()];
      // listResult = [listItem[0], listItem[1], listItem[2]];
      fillResult(listResult);
    } else {
      rolling = false;
      clearInterval(rollInterval);
      removeInActive();
      let result = checkResult(listResult, betList);
      showResult(betList, result);
      //!Check result
      // console.log("-----------check------------");
      // console.log("betList :");
      // console.log(betList);
      // console.log("listItem :");
      // console.log(listItem);
      // console.log("listResult :");
      // console.log(listResult);
    }
  }, 30);
};

//? random ra item
function rollItem() {
  let id = Math.floor(Math.random() * listItem.length);
  let item = listItem[id];
  return item;
}

//? hiển thị kết quả
function fillResult(listResult) {
  domListResult.forEach((res, index) => {
    res.querySelector(".result-img").setAttribute("src", listResult[index].img);
  });
}

//? check kết quả
function checkResult(listResult, betList) {
  listResult.forEach((res) => {
    betList.forEach((betItem) => {
      if (res.id === betItem.id) {
        betItem.count--;
      }
    });
  });
  let result = betList.every((betItem) => {
    return betItem.count == 0;
  });
  return result;
}

//? Hiển thị kết quả ra console
function showResult(betList, result) {
  let stringBet = listItem
    .map((res) => {
      if (res.count > 0) {
        return `${res.count} ${res.name} `;
      }
    })
    .join("");
  if (betList.length != 0) {
    if (result) {
      console.log("--------------------- Kết Quả ---------------------");
      console.log(`Bạn đã đoán đúng với kết quả: ${stringBet}`);
    } else {
      console.log("--------------------- Kết Quả ---------------------");
      console.log(`Bạn đã đoán sai với kết quả: ${stringBet}`);
    }
  } else {
    console.log("--------------------- Kết Quả ---------------------");
    console.log(
      "Bạn chưa thực hiện dự đoán!!! Vui lòng thực hiên dự đoán (Tối đa 3 lần)"
    );
  }
}

//? add classlist inactive
function addInActive() {
  document.querySelector("#btn-reset").classList.add("inactive");
  document.querySelector("#btn-roll").classList.add("inactive");
}

//? remove classlist inactive
function removeInActive() {
  document.querySelector("#btn-reset").classList.remove("inactive");
  document.querySelector("#btn-roll").classList.remove("inactive");
}
