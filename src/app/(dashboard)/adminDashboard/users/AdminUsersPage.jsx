"use client";

import React from "react";
import { Button, Table, toast } from "@heroui/react";
import { blockUser } from "@/lib/action/blockUser";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const AdminUsersPage = ({ users, searchParams }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session?.user;

  const handleBlock = async (user) => {
    
    if (user.role === "admin") {
      toast.danger("Administrators cannot be blocked");
      return;
    }

    
    if (currentUser && user.id === currentUser.id) {
      toast.danger("You cannot block your own account");
      return;
    }

    
    const isCurrentlyBlocked = user.blocked === true || user.blocked === "true";
    const newBlockedStatus = isCurrentlyBlocked ? "false" : "true";

    const updatedUser = {
      id: user.id,
      blocked: newBlockedStatus,
    };

    try {
      const data = await blockUser(
        `/api/admin/user-status`,
        updatedUser,
        "PATCH",
      );

      if (data.success) {
        toast.success(data.message);
        router.refresh();
      } else {
        toast.danger("Failed to update status: " + data.message);
      }
    } catch (error) {
      console.error("Error updating block status:", error);
      toast.danger("Something went wrong!");
    }
  };

  const isSelf = (user) => currentUser && user.id === currentUser.id;
  const isAdmin = (user) => user.role === "admin";
  const isBlockActionDisabled = (user) => isSelf(user) || isAdmin(user);

  const getBlockButtonTooltip = (user) => {
    if (isSelf(user)) return "You cannot block your own account";
    if (isAdmin(user)) return "Administrators cannot be blocked";
    return user.blocked ? "Unblock this user" : "Block this user";
  };

  const getBlockButtonLabel = (user) => {
    return user.blocked ? "Unblock" : "Block";
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="mb-6 mt-4 space-y-1">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-primary font-extralight">
          My Users
        </h1>
        <p className="text-sm font-bold text-secondary">
          User Management Table
        </p>
      </div>

      {}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="User management table">
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Plan</Table.Column>
              <Table.Column>Joined Date</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {users &&
                users.map((user) => (
                  <Table.Row key={user.id}>
                    {}
                    <Table.Cell className="capitalize font-medium text-slate-700">
                      {user.name}
                    </Table.Cell>

                    {}
                    <Table.Cell className="text-slate-600">
                      {user.email}
                    </Table.Cell>

                    {}
                    <Table.Cell>
                      <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded font-semibold uppercase">
                        {user.plan || "Free"}
                      </span>
                    </Table.Cell>

                    {}
                    <Table.Cell className="text-slate-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </Table.Cell>

                    {}
                    <Table.Cell>
                      {user.role === "admin" ? (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-semibold">
                          Admin
                        </span>
                      ) : (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">
                          User
                        </span>
                      )}
                    </Table.Cell>

                    {}
                    <Table.Cell>
                      <Button
                        isDisabled={isBlockActionDisabled(user)}
                        title={getBlockButtonTooltip(user)}
                        onClick={() => handleBlock(user)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors shadow-sm ${
                          isBlockActionDisabled(user)
                            ? "bg-slate-100 text-slate-800 cursor-not-allowed border-red-500 border-2"
                            : "bg-danger text-white hover:bg-danger/90"
                        }`}
                      >
                        {getBlockButtonLabel(user)}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>{}</Table.Footer>
      </Table>
    </div>
  );
};

export default AdminUsersPage;
