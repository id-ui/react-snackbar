import * as React from 'react';
import {StyledComponent} from "styled-components";
import PropTypes from "prop-types";

type VoidFunction = (...args: any[]) => void;

export interface SnackbarProps {
    /**
     * Snackbar content
     */
    children?: React.ReactChildren | (({ close: VoidFunction }) => React.ReactChildren);
     /**
     * Function, that should return snackbar container
     * @default () => document.body
     */
     getContainer?: () => Node;
     /**
     * render snackbar on place (do not use portal). Placement setting not applied in this case.
     * @default false
     */
     renderOnPlace?: boolean;
     /**
     * framer-motion animation props for snackbar opening/closing
     */
     animation?: object;
     /**
     * Snackbar placement
     * @default topRight
     */
     placement?: 'top' | 'topRight' | 'rightTop' | 'topLeft' | 'leftTop' | 'bottom' | 'bottomRight' | 'rightBottom' | 'bottomLeft' | 'leftBottom' | 'left' | 'right';
     /**
     * Timeout (ms) in which snackbar should disappear
     * @default 3000
     */
     timeout?: number;
     /**
     * Snackbar className
     */
     className?: string;
     /**
      * Distance from Snackbar to container bounds
      * @default 20px
     */
     distanceToContainer?: string;
     /**
     * Snackbar z-index
     * @default 1000
     */
     zIndex?: number;
     /**
     * Handler, called on snackbar close
     */
     onClose?: () => void;
}

export class Snackbar extends React.Component<SnackbarProps> {}

export interface SnackbarGroupProps {
    /**
     * SnackbarGroup children config. Each item should have prop with key="idKey" from props, idKey="id" by default. Item can have prop "render", which accepts { close, data }, where data is item itself and close is function for closing snackbar
     */
    items?: object[];
    /**
     * Function, that should return SnackbarGroup container
     * @default () => document.body
     */
    getContainer?: () => Node;
    /**
     * Function for rendering item, accepts { data, close }, where data is item from items and close is function for closing snackbar
     * @default ({ data }) => data.id
     * @param VoidFunction
     * @param object
     */
    renderItem?: ({ close: VoidFunction, data: object }) => React.ReactChildren;
    /**
     * render SnackbarGroup on place (do not use portal). Placement setting not applied in this case.
     * @default false
     */
    renderOnPlace?: boolean;
    /**
     * framer-motion animation props for SnackbarGroup item opening/closing
     */
    animation?: object;
    /**
     * SnackbarGroup placement
     * @default topRight
     */
    placement?: 'top' | 'topRight' | 'rightTop' | 'topLeft' | 'leftTop' | 'bottom' | 'bottomRight' | 'rightBottom' | 'bottomLeft' | 'leftBottom' | 'left' | 'right';
    /**
     * Timeout (ms) in which SnackbarGroup item should disappear
     * @default 3000
     */
    timeout?: number;
    /**
     * SnackbarGroup className
     */
    className?: string;
    /**
     * Distance from SnackbarGroup to container bounds
     * @default 20px
     */
    distanceToContainer?: string;
    /**
     * SnackbarGroup z-index
     * @default 1000
     */
    zIndex?: number;
    /**
     * Handler, called on snackbarGroup item close
     */
    onClose?: (id: string | number) => void;
    /**
     * property of item from items with unique value
     * @default id
     */
    idKey?: string;
}

export class SnackbarGroup extends React.Component<SnackbarGroupProps> {}