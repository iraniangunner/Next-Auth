"use client";
import { DropdownItem } from "flowbite-react";
import { logout } from "../lib/actions/logout";

export default function LogoutButton() {
  return (
    <DropdownItem onClick={async () => await logout()}>Sign out</DropdownItem>
  );
}
