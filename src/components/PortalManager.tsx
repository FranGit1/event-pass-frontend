import { IComponentBaseProps } from "../types";
import { Portal } from "react-portal";
import { PropsWithChildren } from "react";

export interface IPortalManagerProps extends IComponentBaseProps {}

function getNode(id: string) {
  let node = document.getElementById(id);

  if (!node) {
    const container = document.createElement("div");
    container.id = id;
    container.style.position = "relative";
    node = document.body.appendChild(container);
  }

  node.style.zIndex = "39";
  return node;
}

export const PortalManager = (
  props: PropsWithChildren<IPortalManagerProps>
) => {
  return <Portal node={getNode("portal-manager")}>{props.children}</Portal>;
};
