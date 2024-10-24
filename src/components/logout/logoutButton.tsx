/**
 * Author:
 * - Raihanullah Mehran
 *
 * Description:
 * This component do the logout functionality.
 */

import { Box } from "@mui/material";
import { useAuth } from "../../auth/authProvider";
import LogoutIcon from "@mui/icons-material/Logout";

export const LogoutButton = () => {
  const auth = useAuth();
  return (
    <Box sx={{ mt: "auto", padding: "1rem" }} onClick={() => auth?.logOut()}>
      <div className="bg-gray-950 cursor-pointer logout-button-text text-gray-500 hover:text-white mx-3 my-3 p-2 rounded-md flex items-center justify-center gap-3 hover:bg-red-900">
        <div className="text-gray-500 font-bold">Logout</div>
        <div>
          <LogoutIcon></LogoutIcon>
        </div>
      </div>
    </Box>
  );
};
