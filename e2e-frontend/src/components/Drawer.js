import { BrowserRouter } from "react-router-dom";
import * as React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';



const Drawer = ({setSelectedApp, setSelectedEnv, setSelectedServerIndex}) => {

  const handleClick = (app, env, serverIndex  = 0) => {
    console.log(`Selected ${app} - ${env} -  serverIndex: ${serverIndex}`);
    setSelectedApp(app);
    setSelectedEnv(env);
    setSelectedServerIndex(serverIndex);
  };
  
  return (
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
          <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("e2e-webstarter-service", "test")}> TEST </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("e2e-webstarter-service", "qs")}> QS </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("e2e-webstarter-service", "prod")}> PROD </MenuItem>
          </SubMenu>
          <SubMenu label="PROMPT" icon={<ArrowRightIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("prompt", "test",0)}> TEST </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("prompt", "qs",0)}> QS </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("prompt", "prod",0)}> PROD </MenuItem>
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
          <MenuItem icon={<ArrowRightIcon />} onClick={() => handleClick("jump-server", "")}> JUMP SERVER </MenuItem>
        </Menu>
      </Sidebar>
    );
  };
  export default Drawer;