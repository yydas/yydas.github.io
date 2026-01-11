"use client";

import React from "react";
import Drawer from "./Drawer";

/**
 * 通用移动端抽屉组件
 * 用于在移动端显示任意内容
 */
export default function MobileDrawer({
	isOpen,
	onClose,
	title = "抽屉",
	children,
}) {
	return (
		<Drawer isOpen={isOpen} onClose={onClose} title={title} position="left">
			{children}
		</Drawer>
	);
}
