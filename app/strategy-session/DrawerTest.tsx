"use client"
import { useState } from "react";
import { Drawer } from "@heroui/drawer";

export default function DrawerTest() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="p-4 bg-red-500 text-white">Open Drawer</button>
      <Drawer open={open} onOpenChange={setOpen} placement="top" backdrop="blur" z-50>
        <Drawer.Content className="bg-white p-8 text-center">
          <h2>Drawer Test</h2>
          <button onClick={() => setOpen(false)}>Close</button>
        </Drawer.Content>
      </Drawer>
    </>
  );
}
