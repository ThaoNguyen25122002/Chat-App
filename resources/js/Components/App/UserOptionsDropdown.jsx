import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
    EllipsisVerticalIcon,
    LockOpenIcon,
    LockClosedIcon,
    UserIcon,
    ShieldCheckIcon,
} from "@heroicons/react/16/solid";
const UserOptionsDropdown = ({ conversation }) => {
    const changUserRole = () => {
        console.log("Change user role");
        if (!conversation.is_user) {
            return;
        }
        axios
            .post("user.changeRole", conversation.id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const onBlockUser = () => {
        console.log("Block user");
        if (!conversation.is_user) {
            return;
        }
        axios
            .post("user.blockUnblock", conversation.id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <>
            <div>
                <Menu>
                    <MenuButton className="flex justify-center items-center size-8 rounded-full hover:bg-black/40">
                        <EllipsisVerticalIcon className="size-5" />
                    </MenuButton>
                    <MenuItems
                        transition
                        anchor="bottom end"
                        className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        <div className="px-1 py-1">
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={onBlockUser}
                                        className={`${
                                            active
                                                ? "bg-black/30 text-white"
                                                : "text-gray-100"
                                        }  group flex w-full items-center rounded-lg py-2 px-2 text-sm`}
                                    >
                                        {conversation.blocked_at && (
                                            <>
                                                <LockOpenIcon className="size-4 mr-2" />
                                                Unblock User
                                            </>
                                        )}
                                        {!conversation.blocked_at && (
                                            <>
                                                <LockClosedIcon className="size-4 mr-2" />
                                                Block User
                                            </>
                                        )}
                                    </button>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={changUserRole}
                                        className={`${
                                            active
                                                ? "bg-black/30 text-white"
                                                : "text-gray-100"
                                        }  group flex w-full items-center rounded-lg py-2 px-2 text-sm`}
                                    >
                                        {conversation.is_admin && (
                                            <>
                                                <UserIcon className="size-4 mr-2" />
                                                Make Regular User
                                            </>
                                        )}
                                        {!conversation.is_admin && (
                                            <>
                                                <ShieldCheckIcon className="size-4 mr-2" />
                                                Make Admin
                                            </>
                                        )}
                                    </button>
                                )}
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
            </div>
        </>
    );
};
export default UserOptionsDropdown;
