import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { SnackbarState } from "../types";

interface IAuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuth: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  signIn: async () => {
    throw new Error("signIn function not implemented");
  },
  signOut: async () => {
    throw new Error("signOut function not implemented");
  },
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(() => {
    const token = localStorage.getItem("token_ol");
    return !!token;
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post("http://localhost:3000/user/sign-in", {
        email,
        password,
      });
      if (res?.data?.token) {
        localStorage.setItem("token_ol", res.data.token);
        setIsAuth(true);
        showSnackbar("Signed in successfully", "success");
        return true;
      }
      showSnackbar("Sign-in failed", "error");
      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 404) {
          showSnackbar("E-mail or password are incorrect", "error");
        }
      } else {
        console.log("Error while signing in", error);
      }
      return false;
    }
  };

  const signOut = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token_ol");

      const res = await axios.post(
        "http://localhost:3000/user/sign-out",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res?.data?.message === "Logged out successfully") {
        localStorage.removeItem("token_ol");
        setIsAuth(false);
        showSnackbar("Signed out successfully", "success");
        return true;
      }
      showSnackbar("Sign-in failed", "error");
      return false;
    } catch (error) {
      console.log("Error while signing out", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuth }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
