// components/Drawer.js
import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';

const Drawer = ({ setSelectedApp, setSelectedEnv, setSelectedServerIndex }) => {
  const handleClick = (app, env, serverIndex = 0) => {
    console.log(`Selected ${app} - ${env} - serverIndex: ${serverIndex}`);
    setSelectedApp(app);
    setSelectedEnv(env);
    setSelectedServerIndex(serverIndex);
  };

  return (
    <Sidebar className="app">
      <Menu>
        <MenuItem className="menu1">
          <h2>OneDashboard</h2>
        </MenuItem>

        <SubMenu label="DPS" icon={<ArrowRightIcon />}>
          <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("dps", "test")}>TEST</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("dps", "qs")}>QS</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("dps", "prod")}>PROD</MenuItem>
        </SubMenu>

        <SubMenu label="E2E-Webstarter-Service" icon={<ArrowRightIcon />}>
          <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("e2e-webstarter-service", "test")}>TEST</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("e2e-webstarter-service", "qs")}>QS</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("e2e-webstarter-service", "prod")}>PROD</MenuItem>
        </SubMenu>

        <SubMenu label="PROMPT" icon={<ArrowRightIcon />}>
          <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("prompt", "test")}>TEST</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("prompt", "qs")}>QS</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("prompt", "prod")}>PROD</MenuItem>
        </SubMenu>

        <SubMenu label="PLUTO" icon={<ArrowRightIcon />}>
          <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("pluto", "test")}>TEST</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("pluto", "qs")}>QS</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("pluto", "prod")}>PROD</MenuItem>
        </SubMenu>

        <SubMenu label="PKONLINE" icon={<ArrowRightIcon />}>
          <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("pkonline", "test")}>TEST</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("pkonline", "qs")}>QS</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("pkonline", "prod")}>PROD</MenuItem>
        </SubMenu>

        <SubMenu label="STAGES" icon={<ArrowRightIcon />}>
          <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("stages", "test")}>TEST</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("stages", "qs")}>QS</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("stages", "prod")}>PROD</MenuItem>
        </SubMenu>

        <SubMenu label="KONG" icon={<ArrowRightIcon />}>
          <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("kong", "test")}>TEST</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("kong", "qs")}>QS</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("kong", "prod")}>PROD</MenuItem>
        </SubMenu>

        <SubMenu label="PROBENCH NG" icon={<ArrowRightIcon />}>
          <MenuItem icon={<TimelineRoundedIcon />} onClick={() => handleClick("probench-ng", "test")}>TEST</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("probench-ng", "qs")}>QS</MenuItem>
          <MenuItem icon={<BubbleChartRoundedIcon />} onClick={() => handleClick("probench-ng", "prod")}>PROD</MenuItem>
        </SubMenu>

        <MenuItem icon={<ArrowRightIcon />} onClick={() => handleClick("jump-server", "")}>JUMP SERVER</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Drawer;
