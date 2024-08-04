"use client";
import { DropdownItem } from "flowbite-react";
import { logout } from "../actions/logout";

export default function LogoutButton() {
  return (
    <DropdownItem onClick={async () => await logout()}>Sign out</DropdownItem>
  );
}
