import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { DataPesertaHasilAssesment } from "./type";
import { IconButton, Menu, MenuItem } from '@mui/material';

// Component untuk Action Menu
const ActionMenu = ({ row }: { row: DataPesertaHasilAssesment }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        console.log("View - No Akun:", row.no_akun);
        navigate(`/admin/data-hasil-asesmen/view/${row.no_akun}`);
        handleClose();
    };

    return (
        <>
            <IconButton
                aria-label="more"
                aria-controls={open ? 'action-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="action-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleView}>View</MenuItem>
            </Menu>
        </>
    );
};

export default ActionMenu;