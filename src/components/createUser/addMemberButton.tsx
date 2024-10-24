/**
 * Author:
 * - Mahdi El Dirani
 * 
 * Description:
 * Button to open Add Member Dialog
 */
import { Button } from "@mui/material";
import { useState } from "react";
import AddMemberPopup from "./addMemberPopup";

export default function AddMemberButton() {
    // const auth=useAuth();
    const [openAddMemberPopup, setOpenAddMemberPopup] = useState(false);

    return (
        <>
            <Button onClick={()=>{setOpenAddMemberPopup(true)}} sx={{ backgroundColor: "gray", padding: "1px", color: "black" }} >+</Button>
            <AddMemberPopup openAddMemberPopup={openAddMemberPopup} setOpenAddMemberPopup={setOpenAddMemberPopup}/>
        </>
    )
}