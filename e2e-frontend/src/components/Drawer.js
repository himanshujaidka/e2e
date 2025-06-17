import { BrowserRouter } from "react-router-dom";
import * as React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';



const Drawer = ({setSelectedApp, setSelectedEnv}) => {

  const handleClick = (app, env) => {
    console.log(`Selected ${app} - ${env}`);
    setSelectedApp(app);
    setSelectedEnv(env);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          <MenuItem className="menu1">
            <h2> OneDashboard</h2>
          </MenuItem>
          <SubMenu label="DPS" icon={<ArrowRightIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />}> TEST </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> QS </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> PROD </MenuItem>
          </SubMenu>
          <SubMenu label="E2E-Webstarter-Service" icon={<ArrowRightIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />}> TEST </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> QS </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> PROD </MenuItem>
          </SubMenu>
          <SubMenu label="PROMPT" icon={<ArrowRightIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("e2e-webstarter-service", "test")}> TEST </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("e2e-webstarter-service", "qs")}> QS </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("e2e-webstarter-service", "prod")}> PROD </MenuItem>
          </SubMenu>
          <SubMenu label="PLUTO" icon={<ArrowRightIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />}> TEST </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> QS </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> PROD </MenuItem>
          </SubMenu>
          <SubMenu label="PKONLINE" icon={<ArrowRightIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />}> TEST </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> QS </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> PROD </MenuItem>
          </SubMenu>
          <SubMenu label="STAGES" icon={<ArrowRightIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />}> TEST </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> QS </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> PROD </MenuItem>
          </SubMenu>
          <SubMenu label="KONG" icon={<ArrowRightIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />}> TEST </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> QS </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> PROD </MenuItem>
          </SubMenu>
          <SubMenu label="PROBENCH NG" icon={<ArrowRightIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />}> TEST </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> QS </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}> PROD </MenuItem>
          </SubMenu>
          <MenuItem icon={<ArrowRightIcon />}> JUMP SERVER </MenuItem>
        </Menu>
      </Sidebar>
      <h1>WELCOME TO E2E OneDashboard</h1>
    </div>
    );
  };
  export default Drawer;