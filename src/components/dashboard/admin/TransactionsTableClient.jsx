"use client";

import React from "react";
import { Button, Table } from "@heroui/react";
import Link from "next/link";
import { MdInsertLink } from "react-icons/md";

const TransactionsTableClient = ({ initialTransactions }) => {
  const transactions = initialTransactions || [];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 p-2">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="w-full">
            <Table.Header>
              <Table.Column isRowHeader>User Email</Table.Column>
              <Table.Column>Amount</Table.Column>
              <Table.Column>Payment Date</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Transaction ID</Table.Column>
              <Table.Column>Invoice</Table.Column>
            </Table.Header>
            <Table.Body>
              {transactions.map((transaction) => (
                <Table.Row key={transaction._id}>
                  <Table.Cell>{transaction.customerEmail}</Table.Cell>
                  <Table.Cell>${transaction.classPrice}</Table.Cell>
                  <Table.Cell>
                    {new Date(transaction.paymentDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === "complete"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </Table.Cell>
                  <Table.Cell className="font-mono text-xs">
                    {transaction.transactionId}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      href={transaction.invoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary" size="sm" className="">
                        <MdInsertLink />
                        View Invoice
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default TransactionsTableClient;
