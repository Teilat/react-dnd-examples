import { Tooltip } from 'antd';
import React from "react";
import {TooltipPropsWithOverlay} from "antd/lib/tooltip";

type BaseTooltipProps = TooltipPropsWithOverlay;

function BaseTooltip(props: BaseTooltipProps) {
  return <Tooltip mouseEnterDelay={1.5} {...props} />;
}

export default BaseTooltip;
