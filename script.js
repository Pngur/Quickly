const form = document.getElementById("form");
const submitBtn = document.getElementById("submitBtn");
const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("output");
let loader;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formDataObj = handleFormState();
  handleLoader();
  const responseStatus = await sendRequest(formDataObj);
  await handleButtonState(responseStatus);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(output.value)
    .then(() => {
      alert("Логин скопирован в буфер обмена!");
    })
    .catch((err) => {
      console.error("Ошибка копирования текста: ", err);
    });
});

sendRequest = async (dataObj) => {
  console.log(dataObj);
  switch (dataObj.project) {
    case "RLS":
      await requestRolligSlots(dataObj);
      break;
    case "NFS":
      await requestRolligSlots(dataObj);
      break;
    case "WLD":
      await requestRolligSlots(dataObj);
      break;
    default:
      await requestRolligSlots(dataObj);
      break;
  }
};

// Collect data from from`s fields
handleFormState = () => {
  const formData = new FormData(form);
  let jsonObject = {};
  console.log(formData);
  for (const [key, value] of formData.entries()) {
    jsonObject[key] = value;
  }
  return jsonObject;
};

handleLoader = () => {
  submitBtn.classList.add("loading");
  submitBtn.textContent = "";
  let loader = document.createElement("div");
  loader.classList.add("loader");
  submitBtn.appendChild(loader);
};

// Change button state after submitting form
handleButtonState = (responseStatus) => {
  if (responseStatus === 200) {
    submitBtn.classList.remove("loading");
    submitBtn.classList.add("success");
    submitBtn.textContent = "READY";
  } else {
    submitBtn.classList.remove("loading");
    submitBtn.classList.add("error");
    submitBtn.textContent = "ERROR";
  }
};

requestRolligSlots = (body) => {
  let url;
  let requestBody = {
    profile: {
      name: "",
      surname: "",
      birthday: "2005-08-08",
      gender: "M",
      city: "vervevr",
      address: "rvervqer",
      postcode: "qvrevqerv",
      region: "",
    },
    country: "",
    currency: "",
    phone: "",
    email: "",
    login: "",
    password: "123123123",
    gdpr_data: true,
    code: "",
    accept: true,
    activate: true,
    autologin: true,
    language: "en",
  };
  requestBody.email = generateRandomEmail();
  requestBody.login = generateLogin(body.country, body.currency);
  requestBody.name = generateRandonString(10);
  requestBody.surname = generateRandonString(10);
  requestBody.phone = generatePhone();
  requestBody.country = body.country;
  requestBody.currency = body.currency;

  switch (body.env) {
    case "dev":
      url = "https://dev.rollingslots.com";
      break;
    case "stage":
      url = "https://stage.rollingslots.com";
      break;
    case "prod":
      url = "https://rollingslots.com";
      break;
    default:
      url = "https://rollingslots.com";
      break;
  }

  const URL = `${url}/api/v1/en/account/registration`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Host': 'https://rollingslots.com',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "Content-Type",
      "Cross-Origin-Resource-Policy": "same-site",
    },
    mode: "no-cors"
  };

  const headers = new Headers({
    "Content-Type": "application/json",  
    "Access-Control-Allow-Origin": "https://rollingslots.com",
    "Content-Length": String(body.length),
    "Origin":"https://rollingslots.com"
  });


console.log("fwefwefwefwef");

axios.post(URL, requestBody, headers)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log('Error posting the data', error);
  });

  // fetch(`${url}/api/v1/en/account/registration`, {
  //   method: "POST",
  //   mode: "no-cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Request-Method": "POST",
  //     "Access-Control-Request-Headers": "Content-Type",
  //     "Cross-Origin-Resource-Policy": "same-site",
  //   },

  //   body: JSON.stringify(requestBody),
  // })
  //   .then((response) => {
  //     console.log();
  //     if (!response.ok) {
  //       throw new Error(`ERROR: ${response.status} ${response.statusText}`);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error("ERROR:", error));
};

generatePhone = (countryCode = "373") => {
  const max = 99999999;
  const min = 10000000;
  const number = Math.floor(Math.random() * (max - min + 1) + min);

  return `+${countryCode}${number}`;
};

generateLogin = (coutnry, currency) => {
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${coutnry}${currency}${month}${day}${hours}${minutes}${seconds}`;
};

generateRandomEmail = (domain = "mail.md", length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return `${result}@${domain}`;
};

generateRandonString = (size) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};
