import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useCommonAPIStore = defineStore("common_api", () => {
  const authStore = useAuthStore();
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

  const getAPIRequest = async (requestData, url, token = "") => {
    // try {
    let headers = {};
    headers["UserType"] = "staff_vip";
    headers["DeviceId"] = "web1689039390946";
    if (typeof window !== "undefined" && token === "") {
      token = localStorage.getItem("my-custom-token");
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    requestData = objectToQueryString(requestData);
    console.log("request data received ", url);

    // const response = await fetch(url +'?'+ requestData);
    let response = await fetch(url + "?" + requestData, {
      method: "GET",
      headers: headers,
    });

    const status = parseInt(response.status);

    console.log("HTTP status: " + status)

    if (status === 401) {
      navigateTo("/login");
    }

    const result = await response.json();

    responseData.value = result;

    return {
      data: result,
      status: status,
    };
  };

  const getResponseData = computed(() => responseData.value);

  const postAPIRequest = async (
    requestData,
    url,
    isFormData = false,
    token = ""
  ) => {
    let headers = {};
    if (isFormData) {
      requestData = jsonToFormData(requestData);
    } else {
      requestData = JSON.stringify(requestData);
      headers["Content-Type"] = "application/json";
    }
    if (typeof window !== "undefined" && token === "") {
      token = localStorage.getItem("my-custom-token");
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("token: " + token);
    let res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: requestData,
    });

    const status = parseInt(res.status);

    if (status === 401) {
      navigateTo("/login");
    }

    const result = await res.json();

    responseData.value = result;

    return {
      data: result,
      status: status,
    };
  };

  return {
    getAPIRequest,
    postAPIRequest,
    getResponseData,
  };
},

{
  persist: {
    storage: persistedState.localStorage,
  },
});
