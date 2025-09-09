'use client'

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@heroui/react'
import type { Key } from 'react'
import { signOut } from '@/lib/actions/user'
import type { User as UserInfo } from '@/types/user'

interface CurrentUserProps {
  user: UserInfo
}

export function CurrentUser({ user }: CurrentUserProps) {
  const handleAction = async (key: Key) => {
    switch (key) {
      case 'logout': {
        await signOut()
        break
      }
      default:
        break
    }
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar size="sm" src={user.avatar ?? ''} name={user.name} />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        onAction={handleAction}
      >
        <DropdownItem
          key="profile"
          textValue="My Profile"
          className="cursor-default"
        >
          <User
            className="flex h-11 items-center"
            name={user.name}
            description={user.email}
            avatarProps={{ src: user.avatar ?? '', size: 'md' }}
          />
        </DropdownItem>
        <DropdownItem
          key="dashboard"
          textValue="Dashboard"
          startContent={<span className="iconify lucide--layout-dashboard" />}
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="settings"
          textValue="Settings"
          startContent={<span className="iconify lucide--settings" />}
        >
          Settings
        </DropdownItem>
        <DropdownItem
          key="analytics"
          textValue="Analytics"
          startContent={<span className="iconify lucide--chart-column-big" />}
        >
          Analytics
        </DropdownItem>
        <DropdownItem
          key="logout"
          textValue="Logout"
          color="danger"
          startContent={<span className="iconify lucide--log-out" />}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
