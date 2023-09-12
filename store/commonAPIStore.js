import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";

export const useCommonAPIStore = defineStore("common_api", () => {
  const authStore = useAuthStore()
  const headerValues = ref();
  const responseData = ref();

  const setResponseData = (data) => {
    responseData.value = data;
  };

  function objectToQueryString(obj) {
    return Object.keys(obj)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
      )
      .join("&");
  }

  function jsonToFormData(json) {
    const formData = new FormData();

    Object.keys(json).forEach((key) => {
      const value = json[key];
      if (Array.isArray(value)) {
        value.forEach((v, index) => {
          formData.append(`${key}[${index}]`, v);
        });
      } else if (value !== null && typeof value === "object") {
        Object.keys(value).forEach((subKey) => {
          formData.append(`${key}[${subKey}]`, value[subKey]);
        });
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }

  const getAPIRequest = async (requestData, url) => {
    // try {
      let headers = {};
      headers["UserType"] = "staff_vip";
      headers["DeviceId"] = "web1689039390946";
      if (typeof window !== "undefined") {
        /* token = localstorage.getItem("my-custom-token"); */
      }
      
      
      requestData = objectToQueryString(requestData);
      console.log("request data received ",url)

      const response = await fetch(url +'?'+ requestData);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Example: Assuming the API returns the new count value
      
      responseData.value = data.data;
      return data;
    // } catch (error) {
    //   console.error("Fetch error:", error);
    // }
  };

  const getResponseData = computed(() => responseData.value);

  const postAPIRequest = async (requestData, url, isFormData = false, token = "") => {
    let headers = {};
    if (isFormData) {
      requestData = jsonToFormData(requestData);
    } else {
      requestData = JSON.stringify(requestData);
      headers['Content-Type'] = 'application/json'
    }
    headers["UserType"] = "staff_vip";
    headers["DeviceId"] = "web1689039390946";
    if (typeof window !== "undefined" && token === "") {
      token = localStorage.getItem("my-custom-token");
      headers["Authorization"] = `Bearer ${token}`;
    }

    if(token){
      headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("token: " + token)
    let res;

    await fetch(url, {
      method: "POST",
      headers: headers,
      body: requestData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        res = data;
      })
      .catch((error) => console.error("Error:", error));

    return res;
  };

  return {
    getAPIRequest,
    postAPIRequest,
    getResponseData,
  };
});
