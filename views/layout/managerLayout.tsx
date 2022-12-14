import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CustomListItemButton from "./CustomListItemButton/CustomListItemButton";
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";

interface ManagerLayoutProps extends React.PropsWithChildren{
}


const drawerWidth = 280;

export const ManagerLayout: React.FC<ManagerLayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline></CssBaseline>
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>GoldenTime</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    }
                }}

            >
                <List sx={{ width: "100%" }}>
                    <ListItem disablePadding>
                        <Accordion
                            defaultExpanded
                            sx={{
                                boxShadow: "none",
                                width: "100%"
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMore></ExpandMore>}
                            >
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>
                                    <Inventory2OutlinedIcon></Inventory2OutlinedIcon>
                                    <Typography>
                                        Qu???n l?? danh m???c
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <CustomListItemButton href="/admin/watch">?????ng h???</CustomListItemButton>
                                    <CustomListItemButton href="/admin/thuong-hieu">Th????ng hi???u</CustomListItemButton>
                                    <CustomListItemButton href="/admin/the-loai">Th??? lo???i</CustomListItemButton>
                                    <CustomListItemButton href="/admin/nguoi-dung">Ng?????i d??ng</CustomListItemButton>
                                    
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <ListItem disablePadding>
                        <Accordion
                            defaultExpanded
                            sx={{
                                boxShadow: "none",
                                width: "100%"
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMore></ExpandMore>}
                            >
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>
                                    <LocalOfferOutlinedIcon></LocalOfferOutlinedIcon>
                                    <Typography>
                                        Qu???n l?? b??n h??ng
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <CustomListItemButton href="/admin/don-hang">????n h??ng</CustomListItemButton>
                                    <CustomListItemButton href="/admin/hoa-don-nhap">Ho?? ????n nh???p</CustomListItemButton>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <ListItem disablePadding>
                        <Accordion
                            defaultExpanded
                            sx={{
                                boxShadow: "none",
                                width: "100%"
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMore></ExpandMore>}
                            >
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>
                                    <SignalCellularAltOutlinedIcon></SignalCellularAltOutlinedIcon>
                                    <Typography>
                                        B??o c??o th???ng k??
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <CustomListItemButton href="/admin/thong-ke/doanh-thu">Th???ng k?? doanh thu</CustomListItemButton>
                                    <CustomListItemButton href="/admin/thong-ke/bao-cao-ton-kho">B??o c??o t???n kho</CustomListItemButton>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                </List>
            </Drawer>
            <Box component={"main"} sx={{ flexGrow: 1, p: 3}}>
                <Toolbar />
                <Container maxWidth="xl">
                    {children}
                </Container>
            </Box>
        </Box>
    )
}