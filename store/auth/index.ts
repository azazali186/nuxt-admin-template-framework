export const useAuthStore = defineStore(
  "auth",
  () => {
    const auth = reactive({
      user: {},
      permissions: [],
      token: "123",
      verified: false,
      authenticated: false,
    });

    const getUser = computed(() => auth?.user);
    const getToken = computed(() => auth?.token);

    function setAuth(data: {
      user: { profile?: any };
      permissions: {
        map: (arg0: (p: any) => { name: any; path: any }) => never[];
      };
      token: string;
    }) {
      auth.user = data.user;
      auth.permissions = data.permissions.map((p) => {
        return {
          name: p.name,
          path: p.path,
        };
      });
      auth.token = data.token;
      auth.verified = data.user?.profile?.isVerify || false;
    }

    function isAuthenticated(p) {
      const permPath = auth.permissions.map((perm) => perm.path);
      console.log("p is authenticated ", p);
      if (permPath.includes(p)) {
        return true;
      }
      return true;
    }

    function logout() {
      auth.user = {};
      auth.permissions = [];
      auth.token = "123";
      auth.verified = false;
      auth.authenticated = false;
    }

    return { auth, getUser, setAuth, getToken, isAuthenticated, logout };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
