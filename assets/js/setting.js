// 14日簽到活動 ..................................................

document.addEventListener("DOMContentLoaded", function () {
  // 獎勵清單
  const rewards = [
    "超級傳送粉末",
    "孤獨戰鬥娃娃",
    "TURBO工作娃娃",
    "1日祝福卡",
    "SP寵物甜心糖",
    "孤獨經驗娃娃",
    "變身藥水",
    "SP屬性調整藥丸",
    "孤獨幻獸加油棒",
    "SP青銅軟糖",
    "75%消毒酒精(台灣製造)",
    "超級工作娃娃",
    "闇黑水晶*40",
    "7日祝福卡",
  ];

  const fetchSetting = async () => {
    try {
      const response = await fetch("setting.json"); // 讀取 json
      const jsonObject = await response.json();

      const rewardElements = document.querySelectorAll(".reward");

      rewardElements.forEach((rewardElement, index) => {
        const button = rewardElement.querySelector(".btn");
        const rewardStatus = rewardElement.classList[1];

        switch (rewardStatus) {
          case "not-started":
            button.textContent = "活動未開始";
            button.disabled = true;
            break;
          case "received":
            button.textContent = "已領取";
            button.disabled = true;
            break;
          case "event-ends":
            button.textContent = "活動結束";
            button.disabled = true;
            break;
          case "re-signing":
            button.textContent = "我要補簽";
            button.addEventListener("click", function () {
              if (jsonObject.memberStatus === true) {  // 如果有登入雷爵會員
                // 呼叫 sweetalert2.js 顯示得獎內容
                Swal.fire({
                  icon: "warning",
                  title: "注意!",
                  html: "補簽需扣除<span style='color: #f75050;'>5雷爵點數</span>",
                  confirmButtonText: "同意",
                  // 右上 close 按鈕
                  // showCloseButton: true,
                }).then((result) => {
                  console.log(result);
                  if (result.isConfirmed) {
                    Swal.fire({
                      icon: "success",
                      title: "成功補簽",
                      html: `得獎內容：<span style="color: #f75050;">${rewards[index]}</span>`,
                      confirmButtonText: "確認",
                    }).then(() => {
                      // 補簽成功後修改獎勵狀態
                      rewardElement.classList.remove("re-signing"); // 移除補簽
                      rewardElement.classList.add("received"); // 改成已領取
                      button.textContent = "已領取";
                      // button.disabled = true;
                    });
                  }
                });
              } else {  // 如果沒有登入雷爵會員
                // 呼叫 sweetalert2.js 顯示請登入雷爵會員的訊息
                Swal.fire({
                  icon: "info",
                  title: "請登入雷爵會員",
                  confirmButtonText: "確認",
                });
              }
            });
            break;
          case "receive":
            button.textContent = "領取獎勵";
            button.addEventListener("click", function () {
              if (jsonObject.memberStatus === true) {
                // 呼叫 sweetalert2.js 顯示得獎內容
                Swal.fire({
                  title: "成功領取",
                  html: `得獎內容：<span style="color: #f75050;">${rewards[index]}</span>`,
                  icon: "success",
                  confirmButtonText: "確認",
                }).then(() => {  // 補簽成功後修改獎勵的狀態
                  rewardElement.classList.remove("receive"); // 移除領取獎勵
                  rewardElement.classList.add("received"); // 改成已領取
                  button.textContent = "已領取";
                  // button.disabled = true;
                });
              } else {
                // 呼叫 sweetalert2.js 顯示請登入雷爵會員的訊息
                Swal.fire({
                  icon: "info",
                  title: "請登入雷爵會員",
                  confirmButtonText: "確認",
                });
              }
            });
            break;
        }
      });
    } catch (error) {
      console.error("Error fetching setting.json:", error); // 讀不到 json
      Swal.fire({
        icon: "info",
        title: "JSON 錯誤",
        confirmButtonText: "確認",
      });
    }
  };

  fetchSetting();
});

// 14日簽到活動結束 ..............................................



